import React, { useContext, useState } from 'react';
import { AppContext } from './AppContext';
export const Header = () => {
  const {setTriggerAlgorithm,
        visualizeButtonText,setVisualizeButtonText, 
        setTriggerMaze, 
        addStop, setAddStop,
        speed,setSpeed,
        clearBoard,setClearBoard,
        deactivateButtons, setDeactivateButtons} = useContext(AppContext);

  const [isAlgorithmOpen, setAlgorithmOpen] = useState(false);
  const [isMazesOpen, setMazesOpen] = useState(false);
  const [isSpeedOpen, setSpeedOpen] = useState(false);  
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false); // Close the modal
  };

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
            <a href = "/">PathFinding Visualizer</a>
          </div>

          <div className=''>
              <button   className={`${deactivateButtons ? 'bg-gray-500' : 'bg-cyan-500'} ${deactivateButtons ? 'hover:bg-gray-500' : 'hover:bg-blue-500'} px-4 py-2 rounded text-white`} 
              disabled={deactivateButtons}
              onClick={()=>{
                if(visualizeButtonText === "Algorithm"){
                  //do something
                  setShowModal(true);
                }
                else{
                  setTriggerAlgorithm(visualizeButtonText)
                }
              }}
              >Vizualize {visualizeButtonText}
              </button>

              {/*Pop up for selecting and algorithm */}
              {showModal && (
                <div
                id="default-modal"
                tabIndex="-1"
                aria-hidden="true"
                className="overflow-y-auto overflow-x-hidden fixed inset-0 z-50 flex justify-center items-center w-full h-full">
                <div className="relative p-4 w-full max-w-sm max-h-full">
                  <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="p-4 md:p-5 space-y-4">
                      <p className="text-2xl leading-relaxed text-white-500">Select an Algorithm</p>
                      <div className="flex items-center justify-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button
                          data-modal-hide="default-modal"
                          type="button"
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          onClick={closeModal}>
                          OK
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* pop up ends */}
        </div>

          <nav className="flex items-center space-x-6">

            <div className="relative">
              <button
                className={`${deactivateButtons ? 'hover:bg-gray-500' : 'hover:bg-blue-500'} px-4 py-2 rounded`}
                disabled = {deactivateButtons}
                onClick={() => toggleDropdown('algorithm')}>
                Algorithms
              </button>
              {isAlgorithmOpen && (
                <div className="absolute bg-white text-black mt-2 rounded shadow-lg py-2 w-32" >
                  <button className="block px-4 py-2 hover:bg-gray-100" onClick={()=>{
                    setVisualizeButtonText("Djikstra")
                    toggleDropdown('algorithm')
                  }}>Djikstra</button>
                  <button className="block px-4 py-2 hover:bg-gray-100" onClick={()=>{
                    setVisualizeButtonText("BFS")
                    toggleDropdown('algorithm')
                  }}>BFS</button>
                  <button className="block px-4 py-2 hover:bg-gray-100" onClick={()=>{
                    setVisualizeButtonText("Greedy Best First Search")
                    toggleDropdown('algorithm')
                  }}>Greedy Best First Search</button>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                className={`${deactivateButtons ? 'hover:bg-gray-500' : 'hover:bg-blue-500'} px-4 py-2 rounded`}
                disabled = {deactivateButtons}
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
              <button className={`${deactivateButtons ? 'hover:bg-gray-500' : 'hover:bg-blue-500'} px-4 py-2 rounded`} 
              disabled = {deactivateButtons}
              onClick={()=>{
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
              <button className={`${deactivateButtons ? 'hover:bg-gray-500' : 'hover:bg-blue-500'} px-4 py-2 rounded`} 
              disabled = {deactivateButtons}  
              onClick={()=>{               
                setClearBoard(!clearBoard);
              }}>Clear Board</button>
            </div>

            <div className="relative">
              <button
                className={`${deactivateButtons ? 'hover:bg-gray-500' : 'hover:bg-blue-500'} px-4 py-2 rounded`}
                disabled = {deactivateButtons}
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
