import { useState } from "react";

export const Grid = () => {
    const [grid, setGrid] = useState(createInitialGrid());

    return (
      <div className="grid">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="grid-row">
            {row.map((cell, cellIndex) => (
              <Cell 
                key={cellIndex} 
                cell={cell} 
                onToggleWall={() => handleToggleWall(rowIndex, cellIndex, grid, setGrid)}
              />
            ))}
          </div>
        ))}
        
      </div>
    );
  };
  
  const createInitialGrid = () => {
    const rows = 20; // Example grid size
    const cols = 50;
    const grid = [];
    for (let row = 0; row < rows; row++) {
      const currentRow = [];
      for (let col = 0; col < cols; col++) {
        currentRow.push(createCell(row, col));
      }
      grid.push(currentRow);
    }
    return grid;
  };
  
  const createCell = (row, col) => {
    return {
      row,
      col,
      isWall: false,
    };
  };
  
  const handleToggleWall = (row, col, grid, setGrid) => {
    const newGrid = grid.slice(); // Create a copy
    const cell = newGrid[row][col];
    newGrid[row][col] = { ...cell, isWall: !cell.isWall }; // Toggle isWall
    setGrid(newGrid);
  };
  
  const Cell = ({ cell, onToggleWall }) => {
    const { isWall } = cell;
  
    return (
      <div 
        className={`grid-cell ${isWall ? 'wall' : ''}`} 
        onClick={onToggleWall}
      ></div>
    );
}
