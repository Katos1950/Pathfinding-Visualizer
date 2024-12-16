import { Children, createContext, useState } from "react";
import Node from "./Node"

export const GridContext = createContext();

export const GridProvider = ({children}) => {

    const CreateInitialGrid = (rows,cols)=>{
        const initGrid=[];
        const startNodeRow = 7;
        const startNodeCol = 5;
        const endNodeRow = 15;
        const endNodeCol = 30;
    
        for(let row=0;row<rows;row++){
            const currentRow=[];
            for(let col=0;col<cols;col++){
                const newNode = new Node(row,col);
                if(col === startNodeCol && row === startNodeRow){
                    newNode.isStartNode=true;
                    newNode.shortestTime=0;
                }
                if(col === endNodeCol && row === endNodeRow){
                    newNode.isEndNode=true;
                }
    
                newNode.rowIndex=row;
                newNode.colIndex=col;
                currentRow.push(newNode);
            }   
            initGrid.push(currentRow);
        }
        return(initGrid);
    }

    const Rows = 20;
    const Cols = 50;

    const [grid,setGrid] = useState(CreateInitialGrid(Rows,Cols));
    const [shortestPath,setShortestPath] = useState([]);  

    
    return(
        <GridContext.Provider value={{grid,setGrid,shortestPath,setShortestPath,Rows,Cols}}>
            {children}
        </GridContext.Provider>
    );
};