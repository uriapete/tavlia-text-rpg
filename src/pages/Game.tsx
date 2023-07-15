import { ReactElement, useState } from "react";
import './styles/Game.scss'
import baseCampaign from "../gameData/mainCampaignData";
import { GameLocationConnections } from "../gameData/classes/Campaign";
import { isField } from "../gameData/classes/locations/Field";
import { isTown } from "../gameData/classes/locations/Town";
import { isDungeon } from "../gameData/classes/locations/Dungeon";

export default function Game():ReactElement{
    const [GameTextWindow, setGameTextWindow] = useState<ReactElement[]>([
        <p key={0}>You begin in {baseCampaign.locations[0].location.name}.</p>,
        <p key={1}>What do you do?</p>
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
            <p key={0}>You've arrived in {newLoc.location.name}.</p>,
            <p key={1}>What will you do now?</p>
        ])
    }

    const [nextLoc, setNextLoc] = useState(currLoc)

    function toggleFieldWalk(newDestConn:GameLocationConnections){
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
                        (locConn,idx) => {
                            const { location } = locConn
                            const { name } = location
                            let locClassName:string=" "
                            if(isTown(location)){
                                locClassName+="to-town "
                            }
                            if(isField(location)){
                                locClassName+="to-field "
                            }
                            if(isDungeon(location)){
                                locClassName+="to-dun "
                            }
                            return (
                                <div className={`next-loc${locClassName}`} key={idx}>
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