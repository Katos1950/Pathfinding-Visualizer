import React from "react";

 export class Node extends React.Component{
  constructor(row, col) {
    super();
    this.isStartNode = false;
    this.isEndNode = false;
    this.isStopNode = false;
    this.isWall = false;
    this.rowIndex = row;
    this.colIndex = col;
    this.prevNode = null;
    this.edges = {};
    this.shortestTime = Number.MAX_SAFE_INTEGER;
    this.heuristic = Number.MAX_SAFE_INTEGER;
  }

  // setStartNode() {
  //   this.isStartNode = true;
  //   this.shortestTime = 0;
  //   this.isWall = false;
  // }

  // setEndNode() {
  //   this.isEndNode = true;
  // }

  // toggleWall() {
  //   this.isWall = !this.isWall;
  // }
}

//export default Node;