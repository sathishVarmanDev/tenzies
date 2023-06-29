import React from "react";

export default function Die(props) {

    // updates Die components background color based on the truthy value of props.isHeld
    const dieFaceStyle = {
        backgroundColor: props.isHeld ? "#59E391" : "#ffffff"
    }

    return (
        <div
            className="die-face"
            style={dieFaceStyle}
            onClick={() => props.holdDice(props.id)} // OR: onClick={props.holdDice}
        >
            <h3 className="die-num">{props.value}</h3>
        </div>
    )
}