import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [visualizeButtonText,setVisualizeButtonText] = useState("Algorithm")
  const [triggerAlgorithm, setTriggerAlgorithm] = useState("");
  const [triggerMaze,setTriggerMaze] = useState("")
  const [addStop,setAddStop] = useState("Add")
  const [clearBoard,setClearBoard] = useState(false);
  const [speed,setSpeed] = useState("Fast")

  return (
    <AppContext.Provider value={{
        triggerAlgorithm, setTriggerAlgorithm,
        visualizeButtonText, setVisualizeButtonText,
        triggerMaze,setTriggerMaze,
        addStop, setAddStop,
        speed, setSpeed,
        clearBoard, setClearBoard }}>
      {children}
    </AppContext.Provider>
  );
};