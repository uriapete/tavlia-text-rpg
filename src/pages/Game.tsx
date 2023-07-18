import { ReactElement, useContext, useState } from "react";
import './styles/Game.scss'
import baseCampaign from "../gameData/mainCampaignData";
import { GameLocationConnections } from "../gameData/classes/Campaign";
import { isField } from "../gameData/classes/locations/Field";
import { isTown } from "../gameData/classes/locations/Town";
import Dungeon, { isDungeon } from "../gameData/classes/locations/Dungeon";
import { AccessFlagTypes } from "../gameData/interfaces/ICampaign";
import Enemy from "../gameData/classes/entities/Enemy";
import Skill from "../gameData/classes/skills/Skill";
import PhysicalAttack from "../gameData/classes/skills/PhysicalAttack";
import Entity from "../gameData/classes/entities/Entity";
import { DmgReturn } from "../gameData/interfaces/entities/IEntity";
import DungeonLevel from "../gameData/classes/locations/DungeonLevel";
import saveGame from "../functions/saveGame";
import { UserToken } from "../hooks/Contexts";
import useUserSaves from "../hooks/useUserSaves";
import useLoadSave from "../hooks/useLoadSave";

export default function Game():ReactElement{
    const UserTokenContext=useContext(UserToken)

    const [GameTextWindow, setGameTextWindow] = useState<ReactElement[]>([
        <p key={0}>You begin in {baseCampaign.locations[0].location.name}.</p>,
        <p key={1}>What do you do?</p>
    ])

    function addToGameTextWindow(...newText:ReactElement[]){
        GameTextWindow.push(...newText)
        setGameTextWindow(GameTextWindow)
    }

    const userSaves=useUserSaves()
    
    const {playerChar,locations} = baseCampaign
    
    const [currLoc, setCurrLoc] = useState<GameLocationConnections>(locations[0])

    const currLocConns = currLoc.connections

    const [enteredFrom, setEnteredFrom] = useState<GameLocationConnections | null>(null)
    
    const [saveID, setSaveID] = useState<number|null>(null)

    useLoadSave(locations,saveID)
    
    const [playerHpVisible, setPlayerHpVisible] = useState(playerChar.currHP)
    
    const [inBattle, setInBattle] = useState<boolean>(false)

    // const enemiesInPlay:Enemy[]=[]

    const [enemiesInPlay, setEnemiesInPlay] = useState<Enemy[]>([])

    const [walkingThruField, setWalkingThruField] = useState<number>(0)

    function updateEntities(){
        setPlayerHpVisible(playerChar.currHP)
        setEnemiesInPlay(enemiesInPlay)
    }

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
        let newEneArr:Enemy[]=[]
        for (let i = 0; i < newEnemies.length; i++) {
            const enemy = newEnemies[i];
            newEneArr.push(Object.create(enemy))
        }
        setEnemiesInPlay(newEneArr)
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
            // nextFn=setWalkingThruField
            // nextFnParams=[walkingThruField-1]
            setWalkingThruField(walkingThruField-1)
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

    function EnterDungeon(){
        if(currLoc.location instanceof Dungeon){
            return(
                <div className="enter-dun">
                    <button>Enter {currLoc.location.name}</button>
                </div>
            )
        }else return(<></>)
    }

    function IdleChoices():ReactElement{
        return(
            <div className="out-of-battle-choices">
                {
                    walkingThruField?
                    (
                        <button onClick={continueFieldWalk}>Continue ({walkingThruField})</button>
                    )
                    :
                    (
                        <>
                            <NextLocBtns />
                            <EnterDungeon />
                        </>
                    )
                }
            </div>
        )
    }

    const [selectingEnemy, setSelectingEnemy] = useState<Skill|null>(null)

    interface IMoveTurnInfo{
        user:Entity
        attack?:Skill
        speed:number
        target?:Entity
    }

    class MoveTurnInfo implements IMoveTurnInfo{
        public speed:number
        constructor(
            public user:Entity,
            public attack?:Skill,
            public target?:Entity,
        ){
            this.speed=user.speed
        }
    }

    let attList:MoveTurnInfo[]=[]

    function enemySelectMoves(){
        for (let i = 0; i < enemiesInPlay.length; i++) {
            const enemy = enemiesInPlay[i];
            attList.push(new MoveTurnInfo(enemy,enemy.basicSkill,playerChar))
        }
    }

    function handleEnemySelect(enemy:Enemy){
        if(selectingEnemy==null){
            return null
        }
        // console.log("enemy confirmed")
        attList.push(new MoveTurnInfo(playerChar,selectingEnemy,enemy))
        setSelectingEnemy(null)
        enemySelectMoves()
        playTurn()
    }

    function tryRunTurn(){
        attList.push(new MoveTurnInfo(playerChar))
        setSelectingEnemy(null)
        enemySelectMoves()
        playTurn()
    }

    // function commitTurns(playerTargetSelect:Enemy){
    //     handleEnemySelect(playerTargetSelect)
    //     enemySelectMoves()
    //     playTurn()
    // }

    function playerRunAway(){
        if(currLoc.location instanceof DungeonLevel){
            addToGameTextWindow(
                <p>Can't run away from a dungeon battle!</p>
            )
            return false
        }
        if(Math.random()<.50){
            setInBattle(false)
            setEnemiesInPlay([])
            callNextFn()
            return true
        }
        return false
    }

    function playTurn(){
        let turnOrder:MoveTurnInfo[]=[]
        while(attList.length>0){
            let highestSpd=attList[0].speed
            let highestSpdIdx=0
            for (let i = 1; i < attList.length; i++) {
                const move = attList[i];
                if(move.speed>highestSpd){
                    highestSpdIdx=i
                    highestSpd=move.speed
                }
            }
            turnOrder.push(...attList.splice(highestSpdIdx,1))
        }
        for (let i = 0; i < turnOrder.length; i++) {
            const move = turnOrder[i];
            if(typeof move.attack==="undefined"||typeof move.target==="undefined"){
                if(move.user===playerChar){
                    const runSucc=playerRunAway()
                    if(!runSucc){
                        addToGameTextWindow(
                            <p>Failed to run away!</p>
                        )
                        continue;
                    }else{
                        addToGameTextWindow(
                            <p>Successfully ran away!</p>
                        )
                        break
                    }
                }
            }else{
                if(move.user.isDead()){
                    continue
                }
                addToGameTextWindow(
                    <p>{move.user instanceof Enemy?`${move.user.name} attacks!`:"You attack!"}</p>
                )
                const moveRes=move.attack.use(move.user,move.target) as DmgReturn
                addToGameTextWindow(
                    <p>{moveRes.dmg} damage.</p>
                )
                if(move.target.isDead()){
                    if(move.target instanceof Enemy){
                        addToGameTextWindow(
                            <p>{move.target.name} was killed!</p>
                        )
                    }
                }
                updateEntities()
            }
            // console.log(`turn done, playerhp ${playerChar.currHP}, enemy hp ${enemiesInPlay[0].currHP}`)
        }
        for (let i = 0; i < enemiesInPlay.length; i++) {
            const enemy = enemiesInPlay[i];
            if(enemy.isDead()){
                enemiesInPlay.splice(i,1)
                i--
            }
        }

        if(enemiesInPlay.length<=0){
            setInBattle(false)
            playerChar.healHP(99)
            updateEntities();
            callNextFn()
        }
    }

    function EnemyStats():ReactElement{
        return(
            <div className="enemy-stats">
                {
                    enemiesInPlay.map((enemy,idx)=>{
                        return(
                            <div key={idx} onClick={()=>{
                                handleEnemySelect(enemy)
                            }} className={`enemy-stat ${selectingEnemy?"selecting-enemy-target":""}`}>
                                <h2>{enemy.name}</h2>
                                <p>HP: {enemy.currHP}/{enemy.maxHP}</p>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    function startChooseTarget(skill:Skill){
        if(skill instanceof PhysicalAttack){
            setSelectingEnemy(skill)

        }
    }

    function BattleChoices():ReactElement{
        
        return(
            <div className="battle-choices">
                <div className="battle-main-menu">
                    <button onClick={()=>{
                        startChooseTarget(playerChar.basicSkill)
                    }}><h3>{playerChar.basicSkill.name}</h3></button>
                    {
                        playerChar.physSkills.length>0?
                            <button><h3>Attack</h3></button>
                            :
                            <button disabled><h3>Attack</h3></button>
                    }
                    {
                        playerChar.magicSkills.length>0?
                            <button><h3>Magic</h3></button>
                            :
                            <button disabled><h3>Magic</h3></button>
                    }
                    <button onClick={()=>{
                        tryRunTurn()
                    }}><h3>Run</h3></button>
                </div>
            </div>
        )
    }

    function ListUserSaves(){
        if(userSaves===null){
            return(
                <></>
            )
        }
        return(
            <div className="user-saves-list">
                {userSaves.map((save,idx)=>{
                    return(
                        <div className="save">
                            <h3>{new Date(save.last_updated).toLocaleString()}</h3>
                            <h3>{locations[save.current_location].location.name}</h3>
                        </div>
                    )
                })}
            </div>
        )
    }

    return(
        <div className="page page-game">
            <div className="game game-text-window">
                {GameTextWindow}
            </div>
            <div className="save-btn">
                <button onClick={()=>{
                    if(UserTokenContext===null){
                        return null
                    }
                    if(UserTokenContext.userToken===null){
                        return null
                    }
                    saveGame(UserTokenContext.userToken,baseCampaign,currLoc)
                }}>Save</button>
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
            <div className="saves">
                <ListUserSaves />
            </div>
        </div>
    )
}