export const GreedyBestFirstSearch = (grid, rows, cols, addStop) => {
    let explored = [];
    let queue = [];
    let shortestTime = {};
    let heuristic = {};
    let startNode = grid.flat().find((node) => node.isStartNode);
    let endNode = grid.flat().find((node) => node.isEndNode);
    let currentNode = null;
    let stopNode = grid.flat().find(node => node.isStopNode);
    let firstExplored = null;
    let firstShortestPath = null;
    let secondExplored = null;
    let secondShortestPath = null;

    if(!startNode || !endNode || (!stopNode && addStop === "Remove")){return} //If start,stop or end nodes are dragged and the cursor is out of the grid

    const assignEdges = (node) => {
        const edges = {};
        const { rowIndex, colIndex } = node;

        if (rowIndex > 0 && !grid[rowIndex - 1][colIndex].isWall) {
            edges[`${rowIndex - 1} ${colIndex}`] = 1; // Top neighbor
        }
        if (rowIndex < rows - 1 && !grid[rowIndex + 1][colIndex].isWall) {
            edges[`${rowIndex + 1} ${colIndex}`] = 1; // Bottom neighbor
        }
        if (colIndex > 0 && !grid[rowIndex][colIndex - 1].isWall) {
            edges[`${rowIndex} ${colIndex - 1}`] = 1; // Left neighbor
        }
        if (colIndex < cols - 1 && !grid[rowIndex][colIndex + 1].isWall) {
            edges[`${rowIndex} ${colIndex + 1}`] = 1; // Right neighbor
        }

        return edges;
    };

    const calculateHeuristic = (sNode, endNode) => {
        const [sNodeRow, sNodeCol] = [sNode.rowIndex, sNode.colIndex];
        const [endNodeRow, endNodeCol] = [endNode.rowIndex, endNode.colIndex];
        return Math.abs(sNodeRow - endNodeRow) + Math.abs(sNodeCol - endNodeCol); // Manhattan distance
    };

    const initializeNodes = () => {
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const node = grid[row][col];
                heuristic[`${row} ${col}`] = calculateHeuristic(node, endNode);
                shortestTime[`${row} ${col}`] = Number.MAX_SAFE_INTEGER;
                if (!node.isWall) {
                    node.edges = assignEdges(node);
                }
            }
        }
    };

    const traverse = () => {
        queue.push([`${startNode.rowIndex} ${startNode.colIndex}`, heuristic[`${startNode.rowIndex} ${startNode.colIndex}`]]);
        
        while (queue.length > 0) {
            // Sort the queue by heuristic value
            queue.sort((a, b) => a[1] - b[1]);
            const [current, _] = queue.shift();
            const [currRow, currCol] = current.split(" ").map(Number);
            // Stop if we reach the end node
            if (current === `${endNode.rowIndex} ${endNode.colIndex}`) break;

            explored.push(current);

            // Process neighbors
            const edges = grid[currRow][currCol].edges;
            for (const [neighbor, _] of Object.entries(edges)) {
                if (!explored.includes(neighbor) && !queue.some(([n]) => n === neighbor)) {
                    queue.push([neighbor, heuristic[neighbor]]);
                    const [row,col] = neighbor.split(" ").map(Number)
                    grid[row][col].prevNode = current;
                }
            }
        }
    };

    const determineShortestPath = () => {
        let shortestPath = []
        currentNode = endNode;
        if(endNode.prevNode === null){
            currentNode = startNode;
            console.log("No path exists")
            return [];
        }
        
        while(currentNode !== startNode){
            shortestPath.push(`${currentNode.rowIndex} ${currentNode.colIndex}`);
            const [row,col] = currentNode.prevNode.split(" ");
            currentNode = grid[row][col];
        }
        return shortestPath.reverse();
    }

    if(stopNode){
        endNode = stopNode;
        initializeNodes();
        traverse();
        firstExplored = explored;
        firstShortestPath = determineShortestPath();

        explored =[]
        queue=[]
        startNode = stopNode
        endNode = grid.flat().find(node => node.isEndNode)
        initializeNodes();
        traverse();
        secondExplored = explored;
        secondShortestPath = determineShortestPath();
    }
    else{
        initializeNodes();
        traverse();
        firstExplored = explored;
        firstShortestPath = determineShortestPath();
    }

    return [firstShortestPath,firstExplored,secondShortestPath,secondExplored];
};