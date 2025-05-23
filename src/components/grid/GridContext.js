import {createContext, useState } from "react";
import {Node} from "./Node"

export const GridContext = createContext();

export const GridProvider = ({children}) => {

    const CreateInitialGrid = (rows,cols,SNR,SNC,ENR,ENC)=>{
        const initGrid=[];
        const startNodeRow = SNR;
        const startNodeCol = SNC;
        const endNodeRow = ENR;
        const endNodeCol = ENC;
    
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

    const Rows = 17;
    const Cols = 51;
    const initStartNodeRow = 7;
    const initStartNodeCol = 5;
    const initEndNodeRow = 11;
    const initEndNodeCol = 40;
    const [grid,setGrid] = useState(CreateInitialGrid(Rows,Cols,initStartNodeRow,initStartNodeCol,initEndNodeRow,initEndNodeCol));
    const [shortestPath,setShortestPath] = useState([]);  

    
    return(
        <GridContext.Provider value={{grid,setGrid,shortestPath,setShortestPath,Rows,Cols,initStartNodeRow,initStartNodeCol,initEndNodeRow,initEndNodeCol}}>
            {children}
        </GridContext.Provider>
    );
};