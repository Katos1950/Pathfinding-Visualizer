export const Djikstra = (grid,rows,cols,addStop) => {
    let explored = [];
    let unexplored = [];
    let shortestTime = {};
    let startNode = grid.flat().find(node => node.isStartNode);
    let endNode = grid.flat().find(node => node.isEndNode);
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

    function allotEdges(){
        //Get all the shortest times and assign edges to each node
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
            const node = grid[row][col];
                if (!node.isWall) {
                    shortestTime[`${row} ${col}`] = Number.MAX_SAFE_INTEGER;
                    unexplored.push(`${row} ${col}`);
                    node.edges = assignEdges(node);
                }  
            }
        }
    }
    

    //Traverse through the grid from start node
    function traverse(){
        
        while(currentNode !== endNode){
            explored.push(`${currentNode.rowIndex} ${currentNode.colIndex}`);
            unexplored = unexplored.filter((nodeId) => nodeId !== `${currentNode.rowIndex} ${currentNode.colIndex}`);
            
            const edges = currentNode.edges;
    
            //Looping through each edge
            Object.entries(edges).forEach(([key, value]) => {
                const [row, col] = key.split(" ").map(Number);
            
                if (!explored.includes(key)) {
                    const time = currentNode.shortestTime + value;//Time to get to the node from current node
                    
                    //updating the shortest time where applicable
                    if (time < shortestTime[`${row} ${col}`]) {
                        shortestTime[`${row} ${col}`] = time;
                        grid[row][col].shortestTime = time;
                        grid[row][col].prevNode = `${currentNode.rowIndex} ${currentNode.colIndex}`;
                    }
                }
            });
    
            //Finding the next node with the shortest time
            let nextNode = null;
            let minTime = Number.MAX_SAFE_INTEGER
            unexplored.forEach(node => {
                const [row, col] = node.split(" ").map(Number);
    
                if(shortestTime[`${row} ${col}`] < minTime){
                    minTime = shortestTime[`${row} ${col}`];
                    nextNode = grid[row][col];
                }
            })   
            
            if(nextNode === null){
                console.log("No path exists to the target node.");
                currentNode = startNode;
                return;
            }
            currentNode = nextNode;
        }
    }
    
    function determineShortestPath(){
        let shortestPath = []
        while(currentNode !== startNode){
            shortestPath.push(currentNode.prevNode);
            const [row,col] = currentNode.prevNode.split(" ").map(Number);
            currentNode = grid[row][col]
        }
        return shortestPath
    }
    let currentNode = null;
    if(stopNode){
        allotEdges();
        currentNode = startNode;
        endNode = stopNode
        traverse()
        firstShortestPath = determineShortestPath().reverse();
        firstExplored = explored;
        
        explored = []
        unexplored = []
        shortestTime = {}
        allotEdges();
        currentNode = stopNode;
        startNode = currentNode;
        endNode = grid.flat().find(node => node.isEndNode);
        traverse()
        secondShortestPath = determineShortestPath().reverse();
        secondExplored = explored;
    }
    else{
        allotEdges();
        currentNode = startNode;
        traverse()
        firstExplored = explored;
        firstShortestPath = determineShortestPath().reverse();
    }

  return (
    [firstShortestPath,firstExplored,secondShortestPath,secondExplored]
  )
}

