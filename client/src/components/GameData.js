//route.post('/api/players',controller.create)
//route.get('/api/players',controller.find)
//route.put('/api/players/:id',controller.update)
//route.delete('/api/players/:id',controller.delete)
import React from "react"
export default function GameData(props){
    return(
        <div className="player--data">
            <h3>player:{props.username}</h3>
            <h3>steps:{props.steps}</h3>
        </div>
    )
}