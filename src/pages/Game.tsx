import { ReactElement, useState } from "react";
import './styles/Game.scss'
import baseCampaign from "../gameData/mainCampaignData";

export default function Game():ReactElement{
    const [GameTextWindow, setGameTextWindow] = useState<ReactElement[]>([
        <p>You begin in {baseCampaign.locations[0].location.name}.</p>,
        <p>What do you do?</p>
    ])

    let {playerChar}=baseCampaign
    const [playerhp, setPlayerhp] = useState(playerChar.currHP)

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
            </div>
        </div>
    )
}