import { useContext, useState } from "react";
import "./Grid.css";
import { Djikstra } from "./Djikstra";
import { GridContext } from "./GridContext";

export const Grid = () => {
  
  const {grid,setGrid,shortestPath,setShortestPath,Rows,Cols} = useContext(GridContext);
  const [visited,setVisited] = useState([]);
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
        //const path = Djikstra(resetGridState, Rows, Cols);

        //Displaying all the explored nodes slowly
        const pathAndExplored = Djikstra(resetGridState, Rows, Cols);
        const path = pathAndExplored[0]
        const explored =pathAndExplored[1]
        
        let j = 0;
        const dummyExplored=[];
        const exploredInterval = setInterval(setExploredNodesSlowly, 20);

        function setExploredNodesSlowly() {
          if (j < explored.length) {
            dummyExplored.push(explored[j]);
            setVisited([...dummyExplored]);
            j++; 
          } else {
            clearInterval(exploredInterval); // Stop the interval when all elements are displayed
            displayShortestPath();
          }
        }

        //Display shortest path slowly using setInterval
        function displayShortestPath(){
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
            //className={`grid-cell ${node.isStartNode ? "isStartNode":node.isEndNode ? "isEndNode" :node.isWall ? "wall" : shortestPath.includes(`${node.rowIndex} ${node.colIndex}`)? "path" : node.shortestTime !== Number.MAX_SAFE_INTEGER? "visited":""}`}
            className={`grid-cell ${node.isStartNode ? "isStartNode":node.isEndNode ? "isEndNode" :node.isWall ? "wall" : shortestPath.includes(`${node.rowIndex} ${node.colIndex}`)? "path" : visited.includes(`${node.rowIndex} ${node.colIndex}`) ? "visited":""}`}
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


