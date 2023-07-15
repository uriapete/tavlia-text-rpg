import { ReactElement, useState } from "react";
import './styles/Game.scss'
import baseCampaign from "../gameData/mainCampaignData";
import { GameLocationConnections } from "../gameData/classes/Campaign";
import { isField } from "../gameData/classes/locations/Field";
import { isTown } from "../gameData/classes/locations/Town";
import { isDungeon } from "../gameData/classes/locations/Dungeon";
import { AccessFlagTypes } from "../gameData/interfaces/ICampaign";
import Enemy from "../gameData/classes/entities/Enemy";

export default function Game():ReactElement{
    const [GameTextWindow, setGameTextWindow] = useState<ReactElement[]>([
        <p key={0}>You begin in {baseCampaign.locations[0].location.name}.</p>,
        <p key={1}>What do you do?</p>
    ])

    const {playerChar,locations} = baseCampaign

    const [currLoc, setCurrLoc] = useState<GameLocationConnections>(locations[0])

    const currLocConns = currLoc.connections

    const [enteredFrom, setEnteredFrom] = useState<GameLocationConnections>(locations[0])
    
    const [playerHpVisible, setPlayerHpVisible] = useState(playerChar.currHP)
    
    const [inBattle, setInBattle] = useState<boolean>(false)

    // const enemiesInPlay:Enemy[]=[]

    const [enemiesInPlay, setEnemiesInPlay] = useState<Enemy[]>([])

    const [walkingThruField, setWalkingThruField] = useState<number>(0)

    let nextFn: Function|null, nextFnParams: any[]

    function callNextFn(){
        if(nextFn==null){
            nextFnParams=[]
            return null
        }
        const val = nextFn(...nextFnParams)
        nextFn=null
        nextFnParams=[]
        return val
    }

    function changeLoc(newLoc:GameLocationConnections){
        setWalkingThruField(0)
        setEnteredFrom(currLoc)
        setCurrLoc(newLoc)
        newLoc.visit()
        setGameTextWindow([
            <p key={0}>You've arrived in {newLoc.location.name}.</p>,
            <p key={1}>What will you do now?</p>
        ])
    }

    function startBattle(...newEnemies:Enemy[]){
        if(newEnemies.length<=0){
            return null
        }
        setGameTextWindow([
            <p key={0}>You've encountered {newEnemies[0].name}!</p>,
            <p key={1}>What will you do?</p>
        ])
        setInBattle(true)
        setEnemiesInPlay(newEnemies)
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
        const currLocInfo=currLoc.location
        if(!isField(currLocInfo)){
            nextFn=null
            nextFnParams=[]
            return changeLoc(nextLoc)
        }
        if(walkingThruField<=1){
            nextFn=changeLoc
            nextFnParams=[nextLoc]
        }else{
            nextFn=setWalkingThruField
            nextFnParams=[walkingThruField-1]
        }
        const rngEncount=Math.random()
        if(rngEncount<currLocInfo.battleChance){
            startBattle(...currLocInfo.enemies)
        }else{
            callNextFn()
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
                            const { location,accessFlag } = locConn
                            const { name } = location

                            if(typeof accessFlag!=="undefined"){
                                const {type}=accessFlag
                                const flagLoc=accessFlag.location
                                switch (type) {
                                    case AccessFlagTypes.Visited:
                                        if(!flagLoc.visited){
                                            return<></>
                                        }
                                        break;
                                
                                    default:
                                        break;
                                }
                            }

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

    function EnemyStats():ReactElement{
        return(
            <div className="enemy-stats">
                {
                    enemiesInPlay.map((enemy,idx)=>{
                        return(
                            <div key={idx} className="enemy-stat">
                                <h2>{enemy.name}</h2>
                                <p>HP: {enemy.currHP}/{enemy.maxHP}</p>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    function BattleChoices():ReactElement{
        
        return(
            <div className="battle-choices">
                <div className="battle-main-menu">
                    <button>{playerChar.basicSkill.name}</button>
                    {
                        playerChar.physSkills.length>0?
                            <button>Attack</button>
                            :
                            <></>
                    }
                    {
                        playerChar.magicSkills.length>0?
                            <button>Magic</button>
                            :
                            <></>
                    }
                    <button>Run</button>
                </div>
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
                    <p>HP: {playerHpVisible}/{playerChar.maxHP}</p>
                </div>
                {
                    !inBattle?
                    (
                        <IdleChoices />
                    )
                    :
                        (
                            <div className="battle-menu">
                                <BattleChoices />
                                <EnemyStats />
                            </div>
                        )
                }
            </div>
        </div>
    )
}