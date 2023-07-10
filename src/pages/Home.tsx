import { ReactElement } from "react";
import { Link } from "react-router-dom";
import "./styles/Home.scss"

export default function Home():ReactElement{
    return(
        <div className="page page-home">
            <p>Hello! Welcome to Tavlia!</p>
            <p>Currently a work in progress!</p>
            <p>
                Wanna play?
            </p>
            <Link to={"game"} className="home-play-btn" id="home-play-btn">Play now!</Link>

        </div>
    )
}