import React, {useState,useEffect} from "react"
import Die from "./Die"
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
import GameData from './GameData'
import axios from 'axios';
const PORT = 3001;
export default function Main(){
    /**
     * @returns 
     * A new single die object
     */
    function generateNewDie(){
        const dieFaceNum = 6
        return({
            value: Math.ceil(Math.random()*dieFaceNum),
            isHeld: false,
            id : nanoid()
            }
        )
    }
    /**
     * @returns 
     * A new array of die objects
     */
    function getNewDice(){
        const numOfDie = 10
        const newDice = []
        for(let i=0;i<numOfDie;i++){
            newDice.push(generateNewDie())
        }
        return newDice
    }
    /**
     * Use state "dice" to store all the current dice with 3 properties:
     * 1. id:= used as "key" of <Die />
     * 2. value:= the value of die
     * 3. isHeld:= if the die is held set the value to true, ow false
     * 
     * Whenever the button is clicked
     * 1. Roll every die that is not hold
     * 2. Allow the user to start a new game when they've already won
     */
    const [dice,setDice] = React.useState(getNewDice())
    function rollDice(){
        if(!tenzies){
            setDice(oldDice => oldDice.map(die =>
                {return die.isHeld?
                die
                :
                generateNewDie()}
            ))
        }else{
            setTenzies(false)
            setDice(getNewDice())
        }
    }
    function holdDice(id) {
        setDice(oldDice=> oldDice.map(die=> 
            {return die.id === id ?
                    {...die, isHeld : !die.isHeld} 
                    : 
                    die
            }
            ))
        }
    const dieElements = dice.map(die=>
            <Die 
            key={die.id}
            value={die.value}
            isHeld={die.isHeld}
            holdDice={()=>holdDice(die.id)}
            />)

    //Fetch and display current player's data
    const [playerData, setPlayerData] = useState({"id":"","username":"Tom","score":40,"rolls":1})
    useEffect(()=>{
        axios.get(`http://localhost:${PORT}/api/players/?id=630c5f81afd269fd9bfe4438`)
        .then(function(response){          
            setPlayerData({...playerData,
                            "username":response.data.name,
                            "id":response.data._id})
        })
       },[]);
    useEffect(() => {
        const fetchData = async () => {
            setPlayerData({...playerData,rolls:playerData.rolls+1})
        }
        fetchData()
            .catch(console.error)   
    }, [dice])    
    const playerBoard = 
            <GameData key={playerData._id}
                        username={playerData.username}
                        score={40}
                        steps={playerData.rolls}
                        />


    /**
     * Check the dice array for these winning conditions:
     * 1. All dice are held, and
     * 2. all dice have the same value
     * 
     * If both conditions are true, set `tenzies` to true and
     * If tenzies is true:
     * 1. Change the button text to "New Game"
     * 2. Use the "react-confetti" package to
     *    render the <Confetti /> component 🎉
     */
    const [tenzies,setTenzies] = React.useState(false)
    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
        }
    }, [dice])
    return(
        <main>
            {tenzies && <Confetti/> }
            <h1 className="title">Tenzies</h1>
            <p className="instructions">
                Roll until all dice are the same. 
                Click each die to freeze it at its current value between rolls.
            </p>
            <div className="dataBoard">
                {/* {console.log(playerName.name)} */}
                {playerBoard}
            </div>
            
            <div className="Container--Die">
                {dieElements}
            </div>
            <button className="roll-dice" onClick={rollDice}>
                {tenzies? "New Game":"Roll"}
                </button>
            
        </main>
    )
    
}