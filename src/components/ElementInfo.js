import "./ElementInfo.css";
import startImg from "../images/start.png";
import endImg from "../images/end.png";
import grassImg from "../images/grass.png";
import pathImg from "../images/path.png";
import wallImg from "../images/wall.png";
import stopImg from "../images/stop.png";

const data = [
    { text: "Start Point", image: startImg },
    { text: "End Point", image: endImg },
    { text: "Pit Stop", image: stopImg },
    { text: "Visited Cells", image: "" },
    { text: "Unvisited Cells", image: grassImg },
    { text: "Shortest Path", image: pathImg },
    { text: "Wall", image: wallImg },
];

export const ElementInfo = () => {
    return (
    <div className="info-bar">
        {data.map((item,index) => (
            <div className="info-item" key = {index}>
                <img src={item.image} alt={item.text} className="info-image" />
                <span className="info-text">{item.text}</span>
            </div>
        ))}
    </div>
  )
}
