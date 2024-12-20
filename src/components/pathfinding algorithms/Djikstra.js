export const Djikstra = (grid,rows,cols) => {

    let explored = [];
    let unexplored = [];
    let shortestTime = {};
    const startNode = grid.flat().find(node => node.isStartNode);
    const endNode = grid.flat().find(node => node.isEndNode);

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

    //Get all the shortest times and assign edges to each node
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const node = grid[row][col];
            if (!node.isWall) {
                shortestTime[`${row} ${col}`] = node.shortestTime;
                unexplored.push(`${row} ${col}`);
                node.edges = assignEdges(node);
            }  
        }
    }

    //Traverse through the grid from start node
    let currentNode = startNode;
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
                    //nextNode = grid.flat().find(nodes => (nodes.rowIndex==row && nodes.colIndex==col));
                    nextNode = grid[row][col];
                }
            })   
            
            if(nextNode === null){
                console.log("No path exists to the target node.");
                return;
            }
            currentNode = nextNode;
        }
    }
    traverse()
    
    //Finding the shortest path using prevNode property of each node
    //Right now current node is the end node, we are traversing from end node to start node
    let shortestPath = []
    while(currentNode !== startNode){
        shortestPath.push(currentNode.prevNode);
        const [row,col] = currentNode.prevNode.split(" ").map(Number);
        currentNode = grid[row][col]
    }

    //console.log(grid);
    //console.log("Shortest Path:");
    //console.log(shortestPath.reverse());

  return (
    //shortestPath.reverse()
    [shortestPath.reverse(),explored]
  )
}