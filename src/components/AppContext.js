import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [triggerAlgorithm, setTriggerAlgorithm] = useState("");
  const [visualizeButtonText,setVisualizeButtonText] = useState("Algorithm")
  const [triggerMaze,setTriggerMaze] = useState("")
  const [addStop,setAddStop] = useState("Add")
  const [speed,setSpeed] = useState("Fast")

  return (
    <AppContext.Provider value={{
        triggerAlgorithm, setTriggerAlgorithm,
        visualizeButtonText, setVisualizeButtonText,
        triggerMaze,setTriggerMaze,
        addStop, setAddStop,
        speed, setSpeed }}>
      {children}
    </AppContext.Provider>
  );
};