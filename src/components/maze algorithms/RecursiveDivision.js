export const RecursiveDivision = (grid, Rows, Cols, setGrid) => {
    function chooseOrientation(width, height) {
        if (width > height) {
            return "VERTICAL";
        } else if (height > width) {
            return "HORIZONTAL";
        } else {
            return Math.random() > 0.5 ? "VERTICAL" : "HORIZONTAL";
        }
    }

    function addBorders(newGrid) {
        const updatedGrid = newGrid.map(row => row.map(node => ({ ...node }))); // Deep copy

        // Top and bottom borders
        for (let col = 0; col < Cols; col++) {
            updatedGrid[0][col].isWall = true;
            updatedGrid[Rows - 1][col].isWall = true;
        }

        // Left and right borders
        for (let row = 0; row < Rows; row++) {
            updatedGrid[row][0].isWall = true;
            updatedGrid[row][Cols - 1].isWall = true;
        }

        return updatedGrid;
    }

    function divide(newGrid, x, y, width, height, orientation, delay = 10) {
        if (width < 2 || height < 2) return;

        const bisect = orientation === "HORIZONTAL"
            ? Math.floor(y + Math.random() * (height - 1)) // Random row for horizontal wall
            : Math.floor(x + Math.random() * (width - 1)); // Random column for vertical wall;

        const passage = orientation === "HORIZONTAL"
            ? Math.floor(x + Math.random() * width) // Random column for passage
            : Math.floor(y + Math.random() * height); // Random row for passage

        if (orientation === "HORIZONTAL") {
            for (let i = x; i < x + width; i++) {
                if (i !== passage) {
                    newGrid[bisect][i].isWall = true;
                }
            }

            setTimeout(() => setGrid(newGrid.map(row => row.map(node => ({ ...node })))), delay);

            divide(newGrid, x, y, width, bisect - y, chooseOrientation(width, bisect - y), delay + 10);
            divide(newGrid, x, bisect + 1, width, y + height - bisect - 1, chooseOrientation(width, y + height - bisect - 1), delay + 10);
        } else {
            for (let i = y; i < y + height; i++) {
                if (i !== passage) {
                    newGrid[i][bisect].isWall = true;
                }
            }

            setTimeout(() => setGrid(newGrid.map(row => row.map(node => ({ ...node })))), delay);

            divide(newGrid, x, y, bisect - x, height, chooseOrientation(bisect - x, height), delay + 10);
            divide(newGrid, bisect + 1, y, x + width - bisect - 1, height, chooseOrientation(x + width - bisect - 1, height), delay + 10);
        }
    }

    const initialGrid = grid.map(row => row.map(node => ({ ...node, isWall: false }))); // Reset walls
    const borderedGrid = addBorders(initialGrid); // Add border walls
    setGrid(borderedGrid); // Update the grid with borders

    // Start the recursive division process after a short delay to display the borders first
    setTimeout(() => {
        divide(borderedGrid, 1, 1, Cols - 2, Rows - 2, chooseOrientation(Cols - 2, Rows - 2));
    }, 50);
};
