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

    function divide(grid, x, y, width, height, orientation) {
        // Base case: stop recursion if the area is too small
        if (width <= 1 || height <= 1) return;

        const horizontal = orientation === "HORIZONTAL";

        // Pick a random point for the wall, avoiding grid edges
        const wx = x + (horizontal ? 0 : Math.floor(Math.random() * (width - 2)) + 1);
        const wy = y + (horizontal ? Math.floor(Math.random() * (height - 2)) + 1 : 0);

        // Pick a random passage point along the wall
        const px = wx + (horizontal ? Math.floor(Math.random() * width) : 0);
        const py = wy + (horizontal ? 0 : Math.floor(Math.random() * height));

        // Length of the wall
        const length = horizontal ? width : height;

        // Build the wall
        for (let i = 0; i < length; i++) {
            const nx = wx + (horizontal ? i : 0);
            const ny = wy + (horizontal ? 0 : i);

            if (nx === px && ny === py) continue; // Keep the passage open
            if(grid[ny][nx].isStartNode || grid[ny][nx].isStopNode) continue;

            if (grid[ny] && grid[ny][nx]) {
                grid[ny][nx].isWall = true; // Mark as wall
            }
        }

        setGrid([...grid]); // Update the grid

        // Recursively divide the areas
        const [nx1, ny1, w1, h1] = horizontal
            ? [x, y, width, wy - y] // Top/left area
            : [x, y, wx - x, height]; // Left/top area

        const [nx2, ny2, w2, h2] = horizontal
            ? [x, wy + 1, width, y + height - wy - 1] // Bottom/right area
            : [wx + 1, y, x + width - wx - 1, height]; // Right/bottom area

        divide(grid, nx1, ny1, w1, h1, chooseOrientation(w1, h1));
        divide(grid, nx2, ny2, w2, h2, chooseOrientation(w2, h2));
    }

    // Initial call to divide the whole grid
    divide(grid, 0, 0, Cols, Rows, chooseOrientation(Cols, Rows));
};