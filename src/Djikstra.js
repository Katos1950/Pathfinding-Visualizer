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
            //edges[grid[rowIndex - 1][colIndex]] = 1;
            edges[`${rowIndex - 1} ${colIndex}`] = 1; // Top neighbor
        }
        if (rowIndex < rows - 1 && !grid[rowIndex + 1][colIndex].isWall) {
            //edges[grid[rowIndex + 1][colIndex]] = 1;
            edges[`${rowIndex + 1} ${colIndex}`] = 1; // Bottom neighbor
        }
        if (colIndex > 0 && !grid[rowIndex][colIndex - 1].isWall) {
            //edges[grid[rowIndex][colIndex - 1]] = 1;
            edges[`${rowIndex} ${colIndex - 1}`] = 1; // Left neighbor
        }
        if (colIndex < cols - 1 && !grid[rowIndex][colIndex + 1].isWall) {
            //edges[grid[rowIndex][colIndex + 1]] = 1;
            edges[`${rowIndex} ${colIndex + 1}`] = 1; // Right neighbor
        }
    
        return edges;
    };

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const node = grid[row][col];
            if (!node.isWall) {
                shortestTime[`${row} ${col}`] = node.shortestTime;
                unexplored.push(`${row} ${col}`);
                //unexplored.push(`${node.rowIndex} ${node.colIndex}`);
                node.edges = assignEdges(node);
                //console.log(`Neigbors for node ${row} ${col}`);
                //console.log(node.edges)
            }  
        }
    }
    //console.log(shortestTime);
    //console.log(grid[0][0].edges);
    //console.log(endNode);
    let currentNode = startNode;
    while(currentNode !== endNode){
        //console.log(`Current Node ${currentNode.rowIndex} ${currentNode.colIndex}`);
        explored.push(`${currentNode.rowIndex} ${currentNode.colIndex}`);
        unexplored = unexplored.filter((nodeId) => nodeId !== `${currentNode.rowIndex} ${currentNode.colIndex}`);
        //unexplored.filter((node) => node !== currentNode);
        const edges = currentNode.edges;
        //console.log("Explored "+ explored)
        //console.log("Unexplored "+ unexplored)
        //console.log(edges);
        //console.log("Current Node "+ currentNode.rowIndex + " "+ currentNode.colIndex);
        //console.log("Current node Shortest time "+currentNode.shortestTime);
        Object.entries(edges).forEach(([key, value]) => {
            const [row, col] = key.split(" ").map(Number);
        
            if (!explored.includes(key)) {
                const time = currentNode.shortestTime + value;
        
                if (time < shortestTime[`${row} ${col}`]) {
                    shortestTime[`${row} ${col}`] = time;
                    grid[row][col].shortestTime = time;
                    grid[row][col].prevNode = `${currentNode.rowIndex} ${currentNode.colIndex}`;
                }
            }
        });

        let nextNode = null;
        let minTime = Number.MAX_SAFE_INTEGER
        //console.log(unexplored);
        unexplored.forEach(node => {
            const [row, col] = node.split(" ").map(Number);

            if(shortestTime[`${row} ${col}`] < minTime){
                minTime = shortestTime[`${row} ${col}`];
                //nextNode = grid.flat().find(nodes => (nodes.rowIndex==row && nodes.colIndex==col));
                nextNode = grid[row][col];
                //console.log(`${nextNode.rowIndex} ${nextNode.colIndex}`)
                //console.log(parseInt(row,10))
                //console.log(parseInt(col,10))
            }
        })   
        
        if(nextNode === null){
            console.log("No path exists to the target node.");
            return [];
        }
        currentNode = nextNode;
    }
    
    let shortestPath = []
    // while(currentNode.prevNode !== null){
    //     shortestPath.push(currentNode.prevNode);
    //     const [row,col] = currentNode.prevNode.split(" ").map(Number);
    //     currentNode = grid[row][col]
    // }
    while(currentNode !== startNode){
        shortestPath.push(currentNode.prevNode);
        const [row,col] = currentNode.prevNode.split(" ").map(Number);
        currentNode = grid[row][col]
    }

    console.log(grid);
    console.log("Shortest Path:");
    console.log(shortestPath.reverse());

  return (
    //shortestPath.reverse()
    shortestPath
  )
}