export const GreedyBestFirstSearch = (grid,rows,cols) => {
    let explored = [];
    let unexplored = [];
    let shortestTime = {};
    let startNode = grid.flat().find(node => node.isStartNode);
    let endNode = grid.flat().find(node => node.isEndNode);
    let heuristic = {}
    let queue = []
    

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

    function calculateHeuristic(sNode,endNode){
        const [sNodeRow,sNodeCol] = [sNode.rowIndex,sNode.colIndex]
        const [endNodeRow,endNodeCol] = [endNode.rowIndex,endNode.colIndex]
        const manhattanDist = Math.abs(sNodeRow-endNodeRow)+Math.abs(sNodeCol-endNodeCol);
        return manhattanDist;
    }

    function allotEdges(){
        //Get all the shortest times and assign edges to each node
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const node = grid[row][col];
               node.heuristic = calculateHeuristic(node,endNode);
                if (!node.isWall) {
                    shortestTime[`${row} ${col}`] = Number.MAX_SAFE_INTEGER;
                    //if(node.rowIndex == startNode.rowIndex && node.colIndex === startNode.colIndex){shortestTime[`${row} ${col}`] = 0}
                    unexplored.push(`${row} ${col}`);
                    node.edges = assignEdges(node);
                }  
            }
        }
    }
    
    const calculateShortestPath = ()=>{
        console.log(heuristic);
        queue.push(startNode)
        while(queue.length > 0){
            let currentNode = queue.shift();
            const edges = currentNode.edges;
            //Looping through each edge
            Object.entries(edges).forEach(([key, value]) => {
                const [row, col] = key.split(" ").map(Number);
                if(!explored.includes(key)) 
                    queue.push(grid[row][col])
            })
            queue =  Object.entries(queue).sort((a,b) => a.heuristic-b.heuristic);
        }

        //while(currentNode);
        //heuristic = Object.entries(heuristic).sort((a,b) => a[1]-b[1]);
        //console.log(heuristic);
    }
    allotEdges();
    calculateShortestPath();
    
  return (
    <div>GreedyBestFirstSearch</div>
  )
}

// export const GreedyBestFirstSearch = (grid, rows, cols) => {

//     let explored = [];
//     let shortestPath = [];
//     let startNode = grid.flat().find(node => node.isStartNode);
//     let endNode = grid.flat().find(node => node.isEndNode);

//     const calculateHeuristic = (node, goalNode) => {
//         // Using Manhattan distance as the heuristic
//         return Math.abs(node.rowIndex - goalNode.rowIndex) + Math.abs(node.colIndex - goalNode.colIndex);
//     };

//     const assignEdges = (node) => {
//         const edges = {};
//         const { rowIndex, colIndex } = node;

//         if (rowIndex > 0 && !grid[rowIndex - 1][colIndex].isWall) {
//             edges[`${rowIndex - 1} ${colIndex}`] = grid[rowIndex - 1][colIndex]; // Top neighbor
//         }
//         if (rowIndex < rows - 1 && !grid[rowIndex + 1][colIndex].isWall) {
//             edges[`${rowIndex + 1} ${colIndex}`] = grid[rowIndex + 1][colIndex]; // Bottom neighbor
//         }
//         if (colIndex > 0 && !grid[rowIndex][colIndex - 1].isWall) {
//             edges[`${rowIndex} ${colIndex - 1}`] = grid[rowIndex][colIndex - 1]; // Left neighbor
//         }
//         if (colIndex < cols - 1 && !grid[rowIndex][colIndex + 1].isWall) {
//             edges[`${rowIndex} ${colIndex + 1}`] = grid[rowIndex][colIndex + 1]; // Right neighbor
//         }

//         return edges;
//     };

//     // Initialize the grid with heuristics and edges
//     grid.flat().forEach(node => {
//         if (!node.isWall) {
//             node.heuristic = calculateHeuristic(node, endNode);
//             node.edges = assignEdges(node);
//         }
//     });

//     let priorityQueue = [startNode];

//     while (priorityQueue.length > 0) {
//         // Sort the queue based on heuristic (lowest first)
//         priorityQueue.sort((a, b) => a.heuristic - b.heuristic);

//         // Dequeue the node with the lowest heuristic
//         const currentNode = priorityQueue.shift();

//         // If the current node is the end node, terminate
//         if (currentNode === endNode) {
//             let pathNode = currentNode;
//             while (pathNode) {
//                 shortestPath.push(`${pathNode.rowIndex} ${pathNode.colIndex}`);
//                 pathNode = pathNode.prevNode;
//             }
//             break;
//         }

//         // Mark the current node as explored
//         explored.push(currentNode);

//         // Traverse through the neighbors
//         Object.values(currentNode.edges).forEach(neighbor => {
//             if (!explored.includes(neighbor) && !priorityQueue.includes(neighbor)) {
//                 neighbor.prevNode = currentNode; // Track the path
//                 priorityQueue.push(neighbor);
//             }
//         });
//     }
//     console.log(shortestPath)
//     return [
//          shortestPath.reverse(),
//         explored
//     ];
// };
