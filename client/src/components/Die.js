import React from "react"
export default function Die(props){
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    return(
        <div className = "Die--Face"
             style={styles}
             onClick={props.holdDice}>
            <h3 className="Die--Num">{props.value}</h3>
        </div>
    )
}