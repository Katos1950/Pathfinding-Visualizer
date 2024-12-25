import React, { useContext, useState } from 'react';
import { Link } from 'react-router';
import { AppContext } from './AppContext';
export const Header = () => {
  const {setTriggerAlgorithm,visualizeButtonText,setVisualizeButtonText, setTriggerMaze, addStop, setAddStop,speed,setSpeed} = useContext(AppContext);

  const [isAlgorithmOpen, setAlgorithmOpen] = useState(false);
  const [isMazesOpen, setMazesOpen] = useState(false);
  const [isSpeedOpen, setSpeedOpen] = useState(false);

  const toggleDropdown = (dropdown) => {
    if (dropdown === 'algorithm') {
      setAlgorithmOpen(!isAlgorithmOpen);
      setMazesOpen(false);
      setSpeedOpen(false);
    } else if(dropdown === "mazes") {
      setMazesOpen(!isMazesOpen);
      setAlgorithmOpen(false);
      setSpeedOpen(false);
    }
    else{
      setSpeedOpen(!isSpeedOpen);
      setAlgorithmOpen(false);
      setMazesOpen(false);
    }
  };

  return (
    <header className="bg-slate-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          <div className="text-xl font-bold">
            <Link to = "/">PathFinding Visualizer</Link>
          </div>

          <div className=''>
              <button className='bg-cyan-500 hover:bg-blue-500 px-4 py-2 rounded' onClick={()=>{
                if(visualizeButtonText === ""){
                  //do something
                }
                else{
                  setTriggerAlgorithm({visualizeButtonText})
                }
              }}
              >Vizualize {visualizeButtonText}
              </button>
          </div>

          <nav className="flex items-center space-x-6">

            <div className="relative">
              <button
                className="hover:bg-blue-500 px-4 py-2 rounded"
                onClick={() => toggleDropdown('algorithm')}>
                Algorithm
              </button>
              {isAlgorithmOpen && (
                <div className="absolute bg-white text-black mt-2 rounded shadow-lg py-2 w-32" >
                  <button className="block px-4 py-2 hover:bg-gray-100" onClick={()=>{
                    setVisualizeButtonText("Djikstra")
                    toggleDropdown('algorithm')
                  }}>Djikstra</button>
                  <button className="block px-4 py-2 hover:bg-gray-100" onClick={()=>{
                    toggleDropdown('algorithm')
                  }}>A*</button>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                className="hover:bg-blue-500 px-4 py-2 rounded"
                onClick={() => toggleDropdown('mazes')}>
                Mazes
              </button>
              {isMazesOpen && (
                <div className="absolute bg-white text-black mt-2 rounded shadow-lg py-2 w-40">
                  <button onClick = {()=>{
                    setTriggerMaze("Prims")
                    setAddStop("Add");
                    toggleDropdown('mazes')
                  }}
                  className="block px-4 py-2 hover:bg-gray-100">Prims Algorithm</button>
                </div>
              )}
            </div>

            <div className='relative'>
              <button className='hover:bg-blue-500 px-4 py-2 rounded' onClick={()=>{
                if(addStop === "Add"){
                  setAddStop("Remove")
                }
                else{
                  setAddStop("Add")
                }
              }}
              >{addStop} a Stop</button>
            </div>

            <div>
              <button className='hover:bg-blue-500 px-4 py-2 rounded'>Clear Board</button>
            </div>

            <div className="relative">
              <button
                className="hover:bg-blue-500 px-4 py-2 rounded"
                onClick={() => toggleDropdown('speed')}>
                Speed : {speed}
              </button>
              {isSpeedOpen && (
                <div className="absolute bg-white text-black mt-2 rounded shadow-lg py-2 w-32" >
                  <button className="block px-4 py-2 hover:bg-gray-100" onClick={()=>{
                    setSpeed("Fast")
                    toggleDropdown('speed')
                  }}>Fast</button>
                  <button className="block px-4 py-2 hover:bg-gray-100" onClick={()=>{
                    setSpeed("Average")
                    toggleDropdown('speed')
                  }}>Average</button>
                  <button className="block px-4 py-2 hover:bg-gray-100" onClick={()=>{
                    setSpeed("Slow")
                    toggleDropdown('speed')
                  }}>Slow</button>
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
