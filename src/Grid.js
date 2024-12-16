import { useContext, useState } from "react";
import "./Grid.css";
import { Djikstra } from "./Djikstra";
import Node from "./Node";
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
        

        
        setShortestPath(path);
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
                    //node.edges = {}
                }
            }}            
          ></div>
        ))}
      </div>
    ))}
    <button onClick={handleDjikstra}>Djikstra</button>
    {/*<button onClick={()=>{setShortestPath(Djikstra([...grid],Rows,Cols))}}>Djikstra</button>*/}
  </div>
  )
}


