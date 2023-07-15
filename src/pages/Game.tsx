import { ReactElement, useState } from "react";
import './styles/Game.scss'
import baseCampaign from "../gameData/mainCampaignData";
import { GameLocationConnections } from "../gameData/classes/Campaign";
import { isField } from "../gameData/classes/locations/Field";

export default function Game():ReactElement{
    const [GameTextWindow, setGameTextWindow] = useState<ReactElement[]>([
        <p>You begin in {baseCampaign.locations[0].location.name}.</p>,
        <p>What do you do?</p>
    ])

    const {playerChar,locations} = baseCampaign

    const [currLoc, setCurrLoc] = useState<GameLocationConnections>(locations[0])

    const currLocConns = currLoc.connections

    const [enteredFrom, setEnteredFrom] = useState<GameLocationConnections>(locations[0])
    
    const [playerhp, setPlayerhp] = useState(playerChar.currHP)
    
    const [inBattle, setInBattle] = useState<boolean>(false)

    const [walkingThruField, setWalkingThruField] = useState<number>(0)

    function changeLoc(newLoc:GameLocationConnections){
        setWalkingThruField(0)
        setEnteredFrom(currLoc)
        setCurrLoc(newLoc)
        setGameTextWindow([
            <p>You've arrived in {newLoc.location.name}.</p>,
            <p>What will you do now?</p>
        ])
    }

    const [nextLoc, setNextLoc] = useState(currLoc)

    function toggleFieldWalk(newDestConn:GameLocationConnections){
        console.log("Field Walk!")
        if((isField(currLoc.location) && newDestConn!==enteredFrom)){
            setNextLoc(newDestConn)
            setWalkingThruField(currLoc.location.size)
        }else{
            setWalkingThruField(0)
            changeLoc(newDestConn)
        }
    }

    function continueFieldWalk(){
        if(walkingThruField<=1){
            changeLoc(nextLoc)
        }else{
            setWalkingThruField(walkingThruField-1)
        }
    }

    function handleChangeLoc(nextDest:GameLocationConnections){
        setNextLoc(nextDest)
        if(isField(currLoc.location) && walkingThruField<1){
            toggleFieldWalk(nextDest)
        }else{
            changeLoc(nextDest)
        }
    }
    
    function NextLocBtns():ReactElement{
        return(
            <div className="next-loc-btns">
                <h3>Go to:</h3>
                {
                    currLocConns.map(
                        (locConn) => {
                            const { location } = locConn
                            const { name } = location
                            return (
                                <div className="next-loc">
                                    <button onClick={() => {
                                        handleChangeLoc(locConn)
                                    }}>{name}</button>
                                </div>
                            )
                        }
                    )
                }
            </div>
        )
    }

    function IdleChoices():ReactElement{
        let choices:ReactElement[]=[]

        return(
            <div className="out-of-battle-choices">
                {
                    walkingThruField?
                    (
                        <button onClick={continueFieldWalk}>Continue ({walkingThruField})</button>
                    )
                    :
                    (
                        <NextLocBtns />
                    )
                }
            </div>
        )
    }

    return(
        <div className="page page-game">
            <div className="game game-text-window">
                {GameTextWindow}
            </div>
            <div className="game game-info-panels">
                <div className="game player-stats">
                    <h2>You</h2>
                    <p>HP: {playerhp}/{playerChar.maxHP}</p>
                </div>
                {
                    !inBattle?
                    (
                        <IdleChoices />
                    )
                    :
                        (
                            <></>
                        )
                }
            </div>
        </div>
    )
}