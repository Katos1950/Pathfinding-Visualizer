import { useContext } from "react";
import "./Grid.css";
import { Djikstra } from "./Djikstra";
import { GridContext } from "./GridContext";

export const Grid = () => {
  
  const {grid,setGrid,shortestPath,setShortestPath,Rows,Cols} = useContext(GridContext);

    const toggleWall = (rowIndex, colIndex) => {
        const newGrid = grid.map((row, rIndex) => {
          return row.map((node, cIndex) => {
            if (rIndex === rowIndex && cIndex === colIndex) {
              return { ...node, isWall: !node.isWall};
            }
            return node;
          });
        });
        setGrid(newGrid);        
      };
    

      const resetGrid = (oldGrid) => {
        return oldGrid.map(row =>
            row.map(node => ({
                ...node,
                shortestTime: node.isStartNode ? 0 : Number.MAX_SAFE_INTEGER,
                prevNode: null,
                edges: {}
            }))
        );
      };
      
      const handleDjikstra = () => {
        const resetGridState = resetGrid(grid);
        setGrid(resetGridState);
        const path = Djikstra(resetGridState, Rows, Cols);
        
        //Display shoetest path slowly using setInterval
        let i = 0;
        let dummyPath = []; // Adding main path to dummy one by one

        const interval = setInterval(setShortestPathSlowly, 50);

        function setShortestPathSlowly() {
          if (i < path.length) {
            dummyPath.push(path[i]);
            setShortestPath([...dummyPath]); // Update the displayed path
            i++; 
          } else {
            clearInterval(interval); // Stop the interval when all elements are displayed
          }
        }
        //setShortestPath(path);
      };
      
      
  return (
    <div className="grid">
    {grid.map((row, rowIndex) => (
      <div key={rowIndex} className="grid-row">
        {row.map((node, colIndex) => (
          <div
            key={colIndex}
            className={`grid-cell ${node.isStartNode ? "isStartNode":node.isEndNode ? "isEndNode" :node.isWall ? "wall" : shortestPath.includes(`${node.rowIndex} ${node.colIndex}`)? "path" : node.shortestTime !== Number.MAX_SAFE_INTEGER? "visited":""}`}
            onClick={() => {
                if(node.isEndNode===false && node.isStartNode === false ){
                    toggleWall(rowIndex, colIndex)
                }
            }}            
          ></div>
        ))}
      </div>
    ))}
    <button onClick={handleDjikstra}>Djikstra</button>
  </div>
  )
}


