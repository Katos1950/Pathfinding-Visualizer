import { useContext, useEffect, useState } from "react";
import "./Grid.css";
import { Djikstra } from "../pathfinding algorithms/Djikstra";
import { GridContext } from "./GridContext";
import { RecursiveDivision } from "../maze algorithms/RecursiveDivision";
import { Prims } from "../maze algorithms/Prims";
import { AppContext } from "../AppContext";



export const Grid = () => {
  
  const {grid,setGrid,shortestPath,setShortestPath,Rows,Cols,initStartNodeRow,initStartNodeCol,initEndNodeRow,initEndNodeCol} = useContext(GridContext);
  const [visited,setVisited] = useState([]);
  const [visited2,setVisited2] = useState([]);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isStartNodeMoved, setIsStartNodeMoved] = useState(false);
  const [isEndNodeMoved, setIsEndNodeMoved] = useState(false);
  const [isStopNodeMoved, setIsStopNodeMoved] = useState(false);
  const [timesRan,setTimesRan] = useState(0);

  const { triggerAlgorithm, setTriggerAlgorithm ,triggerMaze, setTriggerMaze, addStop, setAddStop, speed, setSpeed, clearBoard,setClearBoard,deactivateButtons,setDeactivateButtons} = useContext(AppContext);

  useEffect(() => {
    if (triggerAlgorithm === "Djikstra") {
      console.log(triggerAlgorithm)
      //setTriggerAlgorithm(""); // Reset after execution
      if(timesRan!==1){
        setTimesRan(1);
      }
      else{
        handleDjikstra();
      }
      setTriggerAlgorithm("Djikstr")//Resetting the string
    }
  }, [triggerAlgorithm]);

  useEffect(()=>{
    if(triggerMaze === "Prims"){
      handlePrims();
      setTriggerMaze("")
    }
  },[triggerMaze]);

  useEffect(()=>{
    if(addStop === "Add"){
      const stopNode = grid.flat().find(node=>node.isStopNode)
      if(stopNode){
        stopNode.isStopNode = false;
        setVisited2([]);
        setGrid([...grid]);
      }
    }
    else{
      let canSetStop = grid.flat().find(node=> node.isStopNode);
      while(!canSetStop){

        const randomRow = Math.floor(Math.random() * Rows);
        const randomCol = Math.floor(Math.random() * Cols);
        if(!grid[randomRow][randomCol].isStartNode && !grid[randomRow][randomCol].isEndNode){
          canSetStop = true;
          grid[randomRow][randomCol].isStopNode = true;
          grid[randomRow][randomCol].isWall = false;
          setGrid([...grid])
        }
      }
    }
  },[addStop])

  const clearTheBoard = (oldGrid) => {
    return oldGrid.map(row =>
        row.map(node => ({
            ...node,
            isWall : false,
            isStopNode : false,
            shortestTime: node.isStartNode ? 0 : Number.MAX_SAFE_INTEGER,
            prevNode: null,
            edges: {}
        }))
    );
  };

  useEffect(()=>{
    if(clearBoard === true){
      setGrid(clearTheBoard(grid));
      setShortestPath([]);
      setVisited([]);
      setVisited2([]);
      setTimesRan(0);
      setClearBoard(false);
      setAddStop("Add");//To dispay Add stop in the header
    }
  },[clearBoard]);

  useEffect(()=>{
    if(timesRan>0)
      handleDjikstra();
  },[timesRan]);

  //grid[9][45].isStopNode = true;

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
        let path = pathAndExplored[0]
        let explored =pathAndExplored[1]
        const path2 = pathAndExplored[2]
        const explored2 = pathAndExplored[3]

        let visualizeExploredSpeed = 0;
        let visualizePathSpeed = 0;
        switch(speed){
          case "Fast":
            visualizeExploredSpeed = 5;
            visualizePathSpeed = 20;
            break;
          case "Average":
            visualizeExploredSpeed = 20;
            visualizePathSpeed = 50;
            break;
          case "Slow":
            visualizeExploredSpeed = 50;
            visualizePathSpeed = 90;
            break;
          default:
            visualizeExploredSpeed = 5;
            visualizePathSpeed = 20;
        }

        if(path2 !== null && explored2 !== null){
          path = [...path,...path2];console.log(path)
          //explored = [...explored,...explored2]
        }
        if(timesRan === 1){
          setDeactivateButtons(true);
          setVisited([])
          setVisited2([])
          let j = 0;
          const dummyExplored=[];
          const dummyExplored2=[];
          const exploredInterval = setInterval(setExploredNodesSlowly, visualizeExploredSpeed);

          function setExploredNodesSlowly() {
            if (j < explored.length) {
              dummyExplored.push(explored[j]);
              setVisited([...dummyExplored]);
              j++; 
            }
            else if(explored2 !== null && j < (explored.length+explored2.length)){
                dummyExplored2.push(explored2[j-explored.length]);
                setVisited2([...dummyExplored2]);
                j++;
            }
             
            else {
              clearInterval(exploredInterval); // Stop the interval when all elements are displayed
              displayShortestPath();
            }
          }

          //Display shortest path slowly using setInterval
          function displayShortestPath(){
            let i = 0;
            let dummyPath = []; // Adding main path to dummy one by one

            const interval = setInterval(setShortestPathSlowly, visualizePathSpeed);

            function setShortestPathSlowly() {
              if (i < path.length) {
                dummyPath.push(path[i]);
                setShortestPath([...dummyPath]); // Update the displayed path
                i++; 
              } else {
                clearInterval(interval); // Stop the interval when all elements are displayed
                setDeactivateButtons(false);
              }
            }
          }
          //setTimesRan(prevTimesran => prevTimesran+1);
        }
        else{
          setVisited(explored);
          if(explored2 !== null)
            setVisited2(explored2);
          setShortestPath(path);

        }
      };
      

    const handlePrims = () => {
      // const resetGridState = resetGrid(grid);
      // setGrid(resetGridState);
      setShortestPath([])
      setVisited([])
      setVisited2([])
      let stopNode = grid.flat().find(node => node.isStopNode);
      if(stopNode){
        stopNode.isStopNode = false;
      }
      Prims(grid,Rows,Cols,setGrid,setDeactivateButtons)
      setTimesRan(0);
    } 

  return (
    <div className="grid">
    {grid.map((row, rowIndex) => (
      <div key={rowIndex} className="grid-row">
        {row.map((node, colIndex) => (
          <div
            key={colIndex}
            //className={`grid-cell ${node.isStartNode ? "isStartNode":node.isEndNode ? "isEndNode" :node.isWall ? "wall" : shortestPath.includes(`${node.rowIndex} ${node.colIndex}`)? "path" : node.shortestTime !== Number.MAX_SAFE_INTEGER? "visited":""}`}
            className={`grid-cell ${node.isStartNode ? "isStartNode":node.isEndNode ? "isEndNode" : node.isStopNode ? "isStopNode" :node.isWall ? "wall" : shortestPath.includes(`${node.rowIndex} ${node.colIndex}`)? "path" : visited2.includes(`${node.rowIndex} ${node.colIndex}`) ? "visited2" : visited.includes(`${node.rowIndex} ${node.colIndex}`) ? "visited": ""}`}
            onMouseDown={()=>{
              if(deactivateButtons){return};
                setIsMouseDown(true)
                  if(node.isEndNode===false && node.isStartNode === false && node.isStopNode === false && isMouseDown){
                    toggleWall(rowIndex, colIndex)
                  }

                  else if(node.isStartNode){
                    setIsStartNodeMoved(true);
                    node.isStartNode = false;
                  }
                  
                  else if(node.isEndNode){
                    setIsEndNodeMoved(true);
                    node.isEndNode = false;
                  }

                  else if(node.isStopNode){
                    setIsStopNodeMoved(true);
                    node.isStopNode = false;
                  }
              } 
            }

            onMouseEnter={() => {
              if(deactivateButtons){return};
              if(node.isEndNode===false && node.isStartNode === false && node.isStopNode === false && isMouseDown && isStartNodeMoved===false && isEndNodeMoved === false && isStopNodeMoved ===false){
                toggleWall(rowIndex, colIndex)
              }
              // if(isStartNodeMoved && isMouseDown){
              //   node.isStartNode = true;
              //   if(timesRan>0){
              //     setTimesRan(timesRan+1);
              // }
              // }
            }}

            // onMouseLeave={()=>{
            //   if(deactivateButtons){return};
            //   if(isStartNodeMoved && isMouseDown){
            //     node.isStartNode = false;
            //   }
            // }}

            onMouseUp={()=>{
              if(deactivateButtons){return};
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
              else if(isStopNodeMoved){
                node.isWall = false;
                node.isStopNode=true;
                setIsStopNodeMoved(false);
                if(timesRan>0){
                  setTimesRan(timesRan+1);
                }
              }
            }}

            onClick={()=>{
              if(deactivateButtons){return};
              //some times react does not work properly with mouse enter and exit so this is an extra check to prevent errors
              if(node.isStartNode || node.isEndNode || node.isStopNode){
                node.isWall = false;
              }

              else if(node.isEndNode===false && node.isStartNode === false && node.isStopNode === false){
                toggleWall(rowIndex, colIndex)
              }
            }}>

          </div>
        ))}
      </div>
    ))}
  </div>
  )
}


/* Working start node movement
              if(deactivateButtons){return};
                setIsMouseDown(true)
                  if(node.isEndNode===false && node.isStartNode === false && node.isStopNode === false && isMouseDown){
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

                  else if(node.isStopNode){
                    setIsStopNodeMoved(true);
                    node.isStopNode = false;
                  }
              } 
            }

            onMouseEnter={() => {
              if(deactivateButtons){return};
              if(node.isEndNode===false && node.isStartNode === false && node.isStopNode === false && isMouseDown && isStartNodeMoved===false && isEndNodeMoved === false && isStopNodeMoved ===false){
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
              if(deactivateButtons){return};
              if(isStartNodeMoved && isMouseDown){
                node.isStartNode = false;
              }
            }}

            onMouseUp={()=>{
              if(deactivateButtons){return};
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
              else if(isStopNodeMoved){
                node.isWall = false;
                node.isStopNode=true;
                setIsStopNodeMoved(false);
                if(timesRan>0){
                  setTimesRan(timesRan+1);
                }
              }
            }}

            onClick={()=>{
              if(deactivateButtons){return};
              //some times react does not work properly with mouse enter and exit so this is an extra check to prevent errors
              if(node.isStartNode || node.isEndNode || node.isStopNode){
                node.isWall = false;
              }

              else if(node.isEndNode===false && node.isStartNode === false && node.isStopNode === false){
                toggleWall(rowIndex, colIndex)
              }
            }}>
            */
