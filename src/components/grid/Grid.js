import { useContext, useEffect, useState } from "react";
import "./Grid.css";
import { Djikstra } from "../pathfinding algorithms/Djikstra";
import { GridContext } from "./GridContext";
import { RecursiveDivision } from "../maze algorithms/RecursiveDivision";
import { Prims } from "../maze algorithms/Prims";



export const Grid = () => {
  
  const {grid,setGrid,shortestPath,setShortestPath,Rows,Cols} = useContext(GridContext);
  const [visited,setVisited] = useState([]);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isStartNodeMoved, setIsStartNodeMoved] = useState(false);
  const [isEndNodeMoved, setIsEndNodeMoved] = useState(false);
  const [timesRan,setTimesRan] = useState(0);

  useEffect(()=>{
    if(timesRan>0)
      handleDjikstra();
  },[timesRan]);

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
        setShortestPath([])
        const resetGridState = resetGrid(grid);
        setGrid(resetGridState);
        //const path = Djikstra(resetGridState, Rows, Cols);

        //Displaying all the explored nodes slowly
        const pathAndExplored = Djikstra(resetGridState, Rows, Cols);
        const path = pathAndExplored[0]
        const explored =pathAndExplored[1]
        console.log(explored)
        if(timesRan === 1){
          
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
          //setTimesRan(prevTimesran => prevTimesran+1);
        }
        else{
          setVisited(explored);
          setShortestPath(path);

        }
      };
      

    const handlePrims = () => {
      // const resetGridState = resetGrid(grid);
      // setGrid(resetGridState);
      Prims(grid,Rows,Cols,setGrid)
    } 

  return (
    <div className="grid">
    {grid.map((row, rowIndex) => (
      <div key={rowIndex} className="grid-row">
        {row.map((node, colIndex) => (
          <div
            key={colIndex}
            //className={`grid-cell ${node.isStartNode ? "isStartNode":node.isEndNode ? "isEndNode" :node.isWall ? "wall" : shortestPath.includes(`${node.rowIndex} ${node.colIndex}`)? "path" : node.shortestTime !== Number.MAX_SAFE_INTEGER? "visited":""}`}
            className={`grid-cell ${node.isStartNode ? "isStartNode":node.isEndNode ? "isEndNode" :node.isWall ? "wall" : shortestPath.includes(`${node.rowIndex} ${node.colIndex}`)? "path" : visited.includes(`${node.rowIndex} ${node.colIndex}`) ? "visited":""}`}
            onMouseDown={()=>{
                setIsMouseDown(true)
                  if(node.isEndNode===false && node.isStartNode === false && isMouseDown){
                    toggleWall(rowIndex, colIndex)
                  }

                  else if(node.isStartNode){
                    setIsStartNodeMoved(true);
                    //node.isStartNode = false;
                  }
                  
                  else if(node.isEndNode){
                    setIsEndNodeMoved(true);
                    node.isEndNode = false;
                  }
              } 
            }

            onMouseEnter={() => {
              if(node.isEndNode===false && node.isStartNode === false && isMouseDown && isStartNodeMoved===false && isEndNodeMoved === false){
                toggleWall(rowIndex, colIndex)
              }
              if(isStartNodeMoved && isMouseDown){
                node.isStartNode = true;
                if(timesRan>0){
                  setTimesRan(timesRan+1);
              }
              }
            }}

            onMouseLeave={()=>{
              if(isStartNodeMoved && isMouseDown){
                node.isStartNode = false;
              }
            }}

            onMouseUp={()=>{
              setIsMouseDown(false);
              if(isStartNodeMoved){
                node.isWall = false;//if you placed the start node on a wall
                node.isStartNode=true;
                setIsStartNodeMoved(false);
                if(timesRan>0){
                    setTimesRan(timesRan+1);
                }
              }
              else if(isEndNodeMoved){
                node.isWall = false;
                node.isEndNode=true;
                setIsEndNodeMoved(false);
                if(timesRan>0){
                  setTimesRan(timesRan+1);
                }
              }
            }}

            onClick={()=>{
              //some times react does not work properly with mouse enter and exit so this is an extra check to prevent errors
              if(node.isStartNode || node.isEndNode){
                node.isWall = false;
              }

              else if(node.isEndNode===false && node.isStartNode === false){
                toggleWall(rowIndex, colIndex)
              }
            }}

          ></div>
        ))}
      </div>
    ))}

    <h1>{timesRan}</h1>
    <button onClick={()=>{
      if(timesRan!==1){
        setTimesRan(1);
      }
      else{
        handleDjikstra();
      }
      //handleDjikstra()
      // setTimesRan(prevTimesran => prevTimesran+1);
    }}>Djikstra</button>
    <button onClick={()=>{
      handlePrims()
      }}>Divide</button>
  </div>
  )
}
