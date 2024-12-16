import React from "react";

 class Node extends React.Component{
  constructor(row, col) {
    super();
    this.isStartNode = false;
    this.isEndNode = false;
    this.isWall = false;
    this.rowIndex = row;
    this.colIndex = col;
    this.prevNode = null;
    this.edges = {};
    this.shortestTime = Number.MAX_SAFE_INTEGER;
  }

  // setStartNode() {
  //   this.isStartNode = true;
  //   this.shortestTime = 0;
  // }

  // setEndNode() {
  //   this.isEndNode = true;
  // }

  // toggleWall() {
  //   this.isWall = !this.isWall;
  // }
}

export default Node;