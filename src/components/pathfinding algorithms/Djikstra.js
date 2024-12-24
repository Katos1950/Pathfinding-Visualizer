// export const Djikstra = (grid,rows,cols) => {

//     let explored = [];
//     let unexplored = [];
//     let shortestTime = {};
//     let startNode = grid.flat().find(node => node.isStartNode);
//     let endNode = grid.flat().find(node => node.isEndNode);
//     let stopNode = grid.flat().find(node => node.isStopNode);

//     function edgeAssignment(){
//         explored = []
//         unexplored = []
//         shortestTime = {}
//         const assignEdges = (node) => {
//             const edges = {};

//             const { rowIndex, colIndex } = node;
        
//             if (rowIndex > 0 && !grid[rowIndex - 1][colIndex].isWall) {
//                 edges[`${rowIndex - 1} ${colIndex}`] = 1; // Top neighbor
//             }
//             if (rowIndex < rows - 1 && !grid[rowIndex + 1][colIndex].isWall) {
//                 edges[`${rowIndex + 1} ${colIndex}`] = 1; // Bottom neighbor
//             }
//             if (colIndex > 0 && !grid[rowIndex][colIndex - 1].isWall) {
//                 edges[`${rowIndex} ${colIndex - 1}`] = 1; // Left neighbor
//             }
//             if (colIndex < cols - 1 && !grid[rowIndex][colIndex + 1].isWall) {
//                 edges[`${rowIndex} ${colIndex + 1}`] = 1; // Right neighbor
//             }
        
//             return edges;
//         };
    
//         //Get all the shortest times and assign edges to each node
//         for (let row = 0; row < rows; row++) {
//             for (let col = 0; col < cols; col++) {
//               const node = grid[row][col];
//                 if (!node.isWall) {
//                     shortestTime[`${row} ${col}`] = node.shortestTime;
//                     unexplored.push(`${row} ${col}`);
//                     node.edges = assignEdges(node);
//                 }  
//             }
//         }
    
//     }
    
//     //Traverse through the grid from start node

//     function traverse(){
        
//         while(currentNode !== endNode){
//             explored.push(`${currentNode.rowIndex} ${currentNode.colIndex}`);
//             unexplored = unexplored.filter((nodeId) => nodeId !== `${currentNode.rowIndex} ${currentNode.colIndex}`);
            
//             const edges = currentNode.edges;
    
//             //Looping through each edge
//             Object.entries(edges).forEach(([key, value]) => {
//                 const [row, col] = key.split(" ").map(Number);
            
//                 if (!explored.includes(key)) {
//                     const time = currentNode.shortestTime + value;//Time to get to the node from current node
                    
//                     //updating the shortest time where applicable
//                     if (time < shortestTime[`${row} ${col}`]) {
//                         shortestTime[`${row} ${col}`] = time;
//                         grid[row][col].shortestTime = time;
//                         grid[row][col].prevNode = `${currentNode.rowIndex} ${currentNode.colIndex}`;
//                     }
//                 }
//             });
    
//             //Finding the next node with the shortest time
//             let nextNode = null;
//             let minTime = Number.MAX_SAFE_INTEGER
//             unexplored.forEach(node => {
//                 const [row, col] = node.split(" ").map(Number);
    
//                 if(shortestTime[`${row} ${col}`] < minTime){
//                     minTime = shortestTime[`${row} ${col}`];
//                     //nextNode = grid.flat().find(nodes => (nodes.rowIndex==row && nodes.colIndex==col));
//                     nextNode = grid[row][col];
//                 }
//             })   
            
//             if(nextNode === null){
//                 console.log("No path exists to the target node.");
//                 currentNode = startNode;
//                 return;
//             }
            
//             currentNode = nextNode;
            
//         }
//     }

    
//     //Finding the shortest path using prevNode property of each node
//     //Right now current node is the end node, we are traversing from end node to start node
//     function determineShortestPath(){
//         let shortestPath = []
//         while(currentNode !== startNode){
//         shortestPath.push(currentNode.prevNode);
//         const [row,col] = currentNode.prevNode.split(" ").map(Number);
//         currentNode = grid[row][col]
//         }
//         return shortestPath
//     }

//     let currentNode = null;
//     let quickestPath = [];
//     if(stopNode){
//         edgeAssignment();
//         currentNode = startNode;
//         endNode = stopNode;
//         traverse()
//         quickestPath = determineShortestPath()
    
        
//         startNode = stopNode;
//         endNode = grid.flat().find(node => node.isEndNode);
//         edgeAssignment();
//         currentNode = startNode;
//         traverse()
//         //quickestPath = [...quickestPath,...determineShortestPath()];
//         quickestPath = determineShortestPath()
//         console.log(quickestPath)
//     }
//     else{
//         edgeAssignment();
//         currentNode = startNode;
//         traverse()
//         quickestPath = determineShortestPath()
    
//     }
//     console.log(endNode.prevNode)
//     //console.log(grid);
//     //console.log("Shortest Path:");
//     //console.log(shortestPath.reverse());

//   return (
//     //shortestPath.reverse()
//     [quickestPath.reverse(),explored]
//   )
// }

export const Djikstra = (grid, rows, cols) => {
    let explored = [];
    let unexplored = [];
    let shortestTime = {};
    let startNode = grid.flat().find(node => node.isStartNode);
    let endNode = grid.flat().find(node => node.isEndNode);
    let stopNode = grid.flat().find(node => node.isStopNode);

    function edgeAssignment() {
        explored = [];
        unexplored = [];
        shortestTime = {};

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

        // Get all the shortest times and assign edges to each node
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const node = grid[row][col];
                if (!node.isWall) {
                    shortestTime[`${row} ${col}`] = Infinity;
                    unexplored.push(`${row} ${col}`);
                    node.edges = assignEdges(node);
                    node.shortestTime = Infinity;
                    node.prevNode = null;
                }
            }
        }

        startNode.shortestTime = 0; // Start node has a shortest time of 0
    }

    function traverse() {
        while (currentNode !== endNode) {
            explored.push(`${currentNode.rowIndex} ${currentNode.colIndex}`);
            unexplored = unexplored.filter(
                (nodeId) => nodeId !== `${currentNode.rowIndex} ${currentNode.colIndex}`
            );

            const edges = currentNode.edges;

            // Looping through each edge
            Object.entries(edges).forEach(([key, value]) => {
                const [row, col] = key.split(" ").map(Number);

                if (!explored.includes(key)) {
                    const time = currentNode.shortestTime + value; // Time to get to the node from current node

                    // Updating the shortest time where applicable
                    if (time < shortestTime[`${row} ${col}`]) {
                        shortestTime[`${row} ${col}`] = time;
                        grid[row][col].shortestTime = time;
                        grid[row][col].prevNode = `${currentNode.rowIndex} ${currentNode.colIndex}`;
                    }
                }
            });

            // Finding the next node with the shortest time
            let nextNode = null;
            let minTime = Number.MAX_SAFE_INTEGER;
            unexplored.forEach((node) => {
                const [row, col] = node.split(" ").map(Number);

                if (shortestTime[`${row} ${col}`] < minTime) {
                    minTime = shortestTime[`${row} ${col}`];
                    nextNode = grid[row][col];
                }
            });

            if (nextNode === null) {
                console.log("No path exists to the target node.");
                return;
            }

            currentNode = nextNode;
        }
    }

    function determineShortestPath() {
        let shortestPath = [];
        while (currentNode !== startNode) {
            if (!currentNode.prevNode) {
                console.error("Error: prevNode is null. Path reconstruction failed.");
                return []; // Return an empty path if prevNode is missing
            }
            shortestPath.push(`${currentNode.rowIndex} ${currentNode.colIndex}`);
            const [row, col] = currentNode.prevNode.split(" ").map(Number);
            currentNode = grid[row][col];
        }
        shortestPath.push(`${startNode.rowIndex} ${startNode.colIndex}`); // Include the start node
        return shortestPath.reverse();
    }

    let currentNode = null;
    let quickestPath = [];
    let allexplored = [];
    if (stopNode) {
        // Phase 1: Start to Stop Node
        edgeAssignment();
        currentNode = startNode;
        endNode = stopNode;
        traverse();
        let pathToStopNode = determineShortestPath();
        let exploredStop = explored;

        // Phase 2: Stop Node to End Node
        startNode = stopNode;
        endNode = grid.flat().find(node => node.isEndNode);
        edgeAssignment();
        currentNode = startNode;
        traverse();
        let pathToEndNode = determineShortestPath();
        let exploredEnd = explored
        allexplored = [...exploredStop,...exploredEnd];
        quickestPath = [...pathToStopNode, ...pathToEndNode];
        
    } else {
        // Single phase: Start to End Node
        edgeAssignment();
        currentNode = startNode;
        traverse();
        quickestPath = determineShortestPath();
    }

    return [quickestPath, allexplored];
};
