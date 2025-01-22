import "./Tutorial.css"
import { useState

 } from "react"
export const Tutorial = ({openTutorial}) => {
    const [id,setId] = useState(0)
    let titles = [
        "Welcome to Pathfinding Visualizer!",
        "What is a pathfinding algorithm ?",
        "Pick an algorithm",
        "Algorithms used",
        "Adding Walls",
        "Generate Maze",
        "Add a stop",
        "Dragging nodes",
        "Other options",
        "Enjoy!"
    ]

    let mainBodies = [
        "Let's walk you through all the features of the the application!",
        "A pathfinding algorithm finds the shortest path betwenn two points.",
        "You can choose any algorithm to visualize from the 'Algorithms' drop down menu.",
        "Some of the algorithms are weighted while others are not.",
        "Click to add a wall to a cell or click and drag to add multiple walls.",
        "Click on the 'Mazes' drop down menu to select a maze generation algorithm.",
        "Click on the 'Add a Stop' button to add a stop.",
        "Click and drag the start, stop or end node to move them to another place.",
        "Use the navbar buttons to do other stuff.",
        "I hope you have fun."
    ]

    let secondaryBodies = [
        "If you already know how to use the application, feel free to press the 'Skip Tutorial' button below. Otherwise, press 'Next' button to continue our journey!",
        "All the algorithms can be visualized on the 2d grid. Movement to each block costs 1 unit.",
        "After selecting an algorithm, just clcik on 'Visualize' button to visualize the path.",
        <>
        <strong>Djikstra</strong><br/>
        <strong>Breadth First Search(BFS)</strong><br/>
        <strong>Greedy Best First Search</strong>
        </>,
        "Walls are simply a way to block the path. Consider these like roadblocks or under construction roads in real life.",
        "You will visualize an aesthetic maze ready in seconds.",
        "Suppose you want go from place A to C but on the way you need coffee from place B. The path will then be calculated from place A to place B and then from place B to place C",
        "Note that you can also drag nodes after the algorithm has visualized the shortest path",
        "You can clear the board using 'Clear Board' button, this will reset the grid. You can also set the visualization speed from the 'Speed' drop down menu",
        "Be creative and play around. New features coming soon!"
    ]
    
    let images =[
        "./logo192.png",
        "./path.png",
        "./algorithms.png",
        "./join.png",
        "./wall.gif",
        "./maze.gif",
        "./stop.png",
        "./drag.gif",
        "./nav.png",
        "./happy.png",
    ]
    return (
    <div className="tutorialBg">
        <div className="tutorialContainer">
            <div className="slideIdentifier">
                <p>{id+1}/{titles.length}</p>
            </div>

            <div className="title">
                <h1>{titles[id]}</h1>
            </div>

            <div className="body">
                <h2>{mainBodies[id]}</h2>
                <br/>
                <h3>{secondaryBodies[id]}</h3>
                <br/>
                <img className="images" src={images[id]}></img>
            </div>

            <div className="btnContainer">
                <div className="skipContainer">
                    <button className="skipBtn" onClick={()=> openTutorial(false)}>Skip Tutorial</button>
                </div>

                <div className="prevNextContainer">
                    <button className="previousBtn" onClick={()=>{
                        if(id > 0){
                            setId(id-1);
                        }
                    }}>Previous</button>
                    <button className="nextBtn"onClick={()=>{
                        if(id<titles.length-1){
                            setId(id+1);
                        }
                        else{
                            openTutorial(false)
                        }
                    }}>{id<titles.length-1?"Next" : "Finish"}</button>
                </div>
            </div>
        </div>
    </div>
  )
}
