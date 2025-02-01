import React, { useContext, useRef, useState, useEffect } from "react";
import { AppContext } from "./AppContext";

export const Header = () => {
  const {
    setTriggerAlgorithm,
    visualizeButtonText,
    setVisualizeButtonText,
    setTriggerMaze,
    addStop,
    setAddStop,
    speed,
    setSpeed,
    clearBoard,
    setClearBoard,
    deactivateButtons,
  } = useContext(AppContext);

  const [isAlgorithmOpen, setAlgorithmOpen] = useState(false);
  const [isMazesOpen, setMazesOpen] = useState(false);
  const [isSpeedOpen, setSpeedOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const algorithmRef = useRef(null);
  const mazesRef = useRef(null);
  const speedRef = useRef(null);

  const closeModal = () => setShowModal(false);

  const toggleDropdown = (dropdown) => {
    if (dropdown === "algorithm") {
      setAlgorithmOpen(!isAlgorithmOpen);
      setMazesOpen(false);
      setSpeedOpen(false);
    } else if (dropdown === "mazes") {
      setMazesOpen(!isMazesOpen);
      setAlgorithmOpen(false);
      setSpeedOpen(false);
    } else {
      setSpeedOpen(!isSpeedOpen);
      setAlgorithmOpen(false);
      setMazesOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        algorithmRef.current &&
        !algorithmRef.current.contains(event.target)
      ) {
        setAlgorithmOpen(false);
      }
      if (mazesRef.current && !mazesRef.current.contains(event.target)) {
        setMazesOpen(false);
      }
      if (speedRef.current && !speedRef.current.contains(event.target)) {
        setSpeedOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-slate-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center sm:h-40 lg:h-16 py-4 sm:py-0">
          {/* Title */}
          <div className="text-xl font-bold text-center sm:text-left">
            <a href="/">PathFinding Visualizer</a>
          </div>

          {/* Visualization Button */}
          <div className="my-4 sm:my-0">
            <button
              className={`${
                deactivateButtons ? "bg-gray-500" : "bg-cyan-500"
              } ${
                deactivateButtons
                  ? "hover:bg-gray-500"
                  : "hover:bg-blue-500"
              } px-4 py-2 rounded text-white`}
              disabled={deactivateButtons}
              onClick={() => {
                if (visualizeButtonText === "Algorithm") {
                  setShowModal(true);
                } else {
                  setTriggerAlgorithm(visualizeButtonText);
                }
              }}
            >
              Visualize {visualizeButtonText}
            </button>

            {/* Modal */}
            {showModal && (
              <div
                id="default-modal"
                tabIndex="-1"
                aria-hidden="true"
                className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-gray-800 bg-opacity-50"
              >
                <div className="relative p-4 w-full max-w-sm bg-white rounded-lg shadow dark:bg-gray-700">
                  <div className="p-4 space-y-4">
                    <p className="text-2xl leading-relaxed text-white">
                      Select an Algorithm
                    </p>
                    <div className="flex items-center justify-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button
                      className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-8 py-3 text-center"
                      onClick={closeModal}
                    >
                      OK
                    </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center sm:justify-start items-center gap-4">
            {/* Algorithms Dropdown */}
            <div ref={algorithmRef}>
              <button
                className={`px-4 py-2 rounded ${
                  deactivateButtons ? "hover:bg-gray-500" : "hover:bg-blue-500"
                }`}
                disabled={deactivateButtons}
                onClick={() => toggleDropdown("algorithm")}
              >
                Algorithms
              </button>
              {isAlgorithmOpen && (
                <div className="absolute bg-white text-black mt-2 rounded shadow-lg py-2 w-full max-w-xs sm:w-40">
                  <button
                    className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                    onClick={() => {
                      setVisualizeButtonText("Djikstra");
                      toggleDropdown("algorithm");
                    }}
                  >
                    Djikstra
                  </button>
                  <button
                    className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                    onClick={() => {
                      setVisualizeButtonText("BFS");
                      toggleDropdown("algorithm");
                    }}
                  >
                    BFS
                  </button>
                  <button
                    className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                    onClick={() => {
                      setVisualizeButtonText("Greedy Best First Search");
                      toggleDropdown("algorithm");
                    }}
                  >
                    Greedy Best First Search
                  </button>
                </div>
              )}
            </div>

            {/* Mazes Dropdown */}
            <div ref={mazesRef}>
              <button
                className={`px-4 py-2 rounded ${
                  deactivateButtons ? "hover:bg-gray-500" : "hover:bg-blue-500"
                }`}
                disabled={deactivateButtons}
                onClick={() => toggleDropdown("mazes")}
              >
                Mazes
              </button>
              {isMazesOpen && (
                <div className="absolute bg-white text-black mt-2 rounded shadow-lg py-2 w-full max-w-xs sm:w-40">
                  <button
                    className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                    onClick={() => {
                      setTriggerMaze("Prims");
                      setAddStop("Add");
                      toggleDropdown("mazes");
                    }}
                  >
                    Prims Algorithm
                  </button>
                </div>
              )}
            </div>

            {/* Add Stop Button */}
            <div>
              <button
                className={`px-4 py-2 rounded ${
                  deactivateButtons ? "hover:bg-gray-500" : "hover:bg-blue-500"
                }`}
                disabled={deactivateButtons}
                onClick={() => setAddStop(addStop === "Add" ? "Remove" : "Add")}
              >
                {addStop} a Stop
              </button>
            </div>

            {/* Clear Board Button */}
            <div>
              <button
                className={`px-4 py-2 rounded ${
                  deactivateButtons ? "hover:bg-gray-500" : "hover:bg-blue-500"
                }`}
                disabled={deactivateButtons}
                onClick={() => setClearBoard(!clearBoard)}
              >
                Clear Board
              </button>
            </div>

            {/* Speed Dropdown */}
            <div ref={speedRef}>
              <button
                className={`px-4 py-2 rounded ${
                  deactivateButtons ? "hover:bg-gray-500" : "hover:bg-blue-500"
                }`}
                disabled={deactivateButtons}
                onClick={() => toggleDropdown("speed")}
              >
                Speed: {speed}
              </button>
              {isSpeedOpen && (
                <div className="absolute bg-white text-black mt-2 rounded shadow-lg py-2 w-full max-w-xs sm:w-40">
                  <button
                    className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                    onClick={() => {
                      setSpeed("Fast");
                      toggleDropdown("speed");
                    }}
                  >
                    Fast
                  </button>
                  <button
                    className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                    onClick={() => {
                      setSpeed("Average");
                      toggleDropdown("speed");
                    }}
                  >
                    Average
                  </button>
                  <button
                    className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                    onClick={() => {
                      setSpeed("Slow");
                      toggleDropdown("speed");
                    }}
                  >
                    Slow
                  </button>
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};
