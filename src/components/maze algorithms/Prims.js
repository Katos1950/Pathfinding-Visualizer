export const Prims = (grid,rows,cols,setGrid,setShortestPath) => {
    const startNode = grid.flat().find(node => node.isStartNode);
    const endNode = grid.flat().find(node => node.isEndNode);
    const mazePath = [];

    const assignEdges = (node) => {

                node.isWall = true;
                const edges = {};
                const { rowIndex, colIndex } = node;
            
                if (rowIndex > 0) {
                    edges[`${rowIndex - 1} ${colIndex}`] = 1; // Top neighbor
                }
                if (rowIndex < rows - 1) {
                    edges[`${rowIndex + 1} ${colIndex}`] = 1; // Bottom neighbor
                }
                if (colIndex > 0) {
                    edges[`${rowIndex} ${colIndex - 1}`] = 1; // Left neighbor
                }
                if (colIndex < cols - 1) {
                    edges[`${rowIndex} ${colIndex + 1}`] = 1; // Right neighbor
                }
            
                return edges;
            };
        
            for(let i=0;i<rows;i++){
                for(let j=0;j<cols;j++){
                    if(grid[i][j] !== startNode || grid[i][j] !== endNode)
                        grid[i][j].isWall = true;
                    
                    grid[i][j].edges = assignEdges(grid[i][j]);
                }
            }
            setGrid([...grid]);

            endNode.isWall = false;
            let frontierCells = {}; 
            let [currRow, currCol] = [startNode.rowIndex,startNode.colIndex];

            const intervalId = setInterval(() => {
                Object.entries(grid[currRow][currCol].edges).forEach(([key, value]) => {
                    const [row, col] = key.split(" ").map(Number);
                    if (currRow < row) {
                        Object.entries(grid[row][col].edges).forEach(([keyf, valuef]) => {
                            const [row2, col2] = keyf.split(" ").map(Number);
                            if (row < row2 && grid[row2][col2].isWall)
                                frontierCells[keyf] = key;
                        });
                    } else if (currRow > row) {
                        Object.entries(grid[row][col].edges).forEach(([keyf, valuef]) => {
                            const [row2, col2] = keyf.split(" ").map(Number);
                            if (row > row2 && grid[row2][col2].isWall)
                                frontierCells[keyf] = key;
                        });
                    } else if (currCol < col) {
                        Object.entries(grid[row][col].edges).forEach(([keyf, valuef]) => {
                            const [row2, col2] = keyf.split(" ").map(Number);
                            if (col < col2 && grid[row2][col2].isWall)
                                frontierCells[keyf] = key;
                        });
                    } else if (currCol > col) {
                        Object.entries(grid[row][col].edges).forEach(([keyf, valuef]) => {
                            const [row2, col2] = keyf.split(" ").map(Number);
                            if (col > col2 && grid[row2][col2].isWall)
                                frontierCells[keyf] = key;
                        });
                    }
                });
            
                const arrayOfEntries = Object.entries(frontierCells);
                console.log("Frontier cell ");
                console.log(arrayOfEntries);
            
                if (arrayOfEntries.length === 0) {
                    clearInterval(intervalId); // Stop the interval when no frontier cells are left
                    console.log("All frontier cells processed.");
                    return;
                }
            
                const randomElementIndex = Math.floor(Math.random() * arrayOfEntries.length);
                const randomElemenent = arrayOfEntries[randomElementIndex];
                console.log("random element to remove " + randomElemenent);
            
                const frontierCellKey = randomElemenent[0];
                const [frontierCellRow, frontierCellCol] = frontierCellKey.split(" ").map(Number);
                const [connectingRow, connectingCol] = randomElemenent[1].split(" ").map(Number);
            
                grid[frontierCellRow][frontierCellCol].isWall = false;
                grid[connectingRow][connectingCol].isWall = false;
            
                currRow = frontierCellRow;
                currCol = frontierCellCol;
            
                delete frontierCells[frontierCellKey];
                console.log("After deleting");
                console.log(Object.entries(frontierCells));
                setGrid([...grid])
            }, 20);
            
            

        return (
            <div>Prims</div>
          )
        }