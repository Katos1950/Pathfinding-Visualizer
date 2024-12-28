export const BFS = (grid, rows, cols) => {
    let startNode = grid.flat().find(node => node.isStartNode);
    let endNode = grid.flat().find(node => node.isEndNode);
    let explored = [];
    let shortestPath = [];
    let currentNode = null;

    const assignEdges = (node) => {
        const edges = {};
        const { rowIndex, colIndex } = node;

        if (rowIndex > 0 && !grid[rowIndex - 1][colIndex].isWall) {
            edges[`${rowIndex - 1} ${colIndex}`] = 1; // Top neighbor
        }
        if (rowIndex < rows - 1 && !grid[rowIndex + 1][colIndex].isWall) {
            edges[`${rowIndex + 1} ${colIndex}`] = 1; // Bottom neighbor
        }
        if (colIndex > 0 && !grid[rowIndex][colIndex - 1].isWall) {
            edges[`${rowIndex} ${colIndex - 1}`] = 1; // Left neighbor
        }
        if (colIndex < cols - 1 && !grid[rowIndex][colIndex + 1].isWall) {
            edges[`${rowIndex} ${colIndex + 1}`] = 1; // Right neighbor
        }

        return edges;
    };

    const allotEdges = () => {
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const node = grid[row][col];
                if (!node.isWall) {
                    node.edges = assignEdges(node);
                }
            }
        }
    };

    const bfsShortestPath = () => {
        let queue = [startNode];
        startNode.prevNode = null;

        while (queue.length > 0) {
            currentNode = queue.shift();
            explored.push(`${currentNode.rowIndex} ${currentNode.colIndex}`);

            if (currentNode === endNode) {
                break;
            }

            const edges = currentNode.edges;
            Object.entries(edges).forEach(([key, _]) => {
                const [row, col] = key.split(" ").map(Number);
                const neighbor = grid[row][col];

                if (!explored.includes(key) && !queue.includes(neighbor)) {
                    queue.push(neighbor);
                    neighbor.prevNode = currentNode; // Reference to the previous node
                }
            });
        }
    };

    const determineShortestPath = () => {
        if (currentNode !== endNode) {
            console.error("No path found to the end node.");
            return;
        }

        while (currentNode) {
            shortestPath.push(`${currentNode.rowIndex} ${currentNode.colIndex}`);
            currentNode = currentNode.prevNode;
        }

        shortestPath.reverse(); // Start to end
    };

    allotEdges();
    bfsShortestPath();
    determineShortestPath();

    return [shortestPath, explored];
};
