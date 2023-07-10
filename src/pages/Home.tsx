import { ReactElement } from "react";
import { Link } from "react-router-dom";
import "./styles/Home.scss"

export default function Home():ReactElement{
    return(
        <div className="comp comp-home">
            <h1 className="home-title">Tavlia</h1>
            <p>Hello! Welcome to Tavlia!</p>
            <p>Currently a work in progress!</p>
            <p>
                Wanna play?
            </p>
            <Link to={"#"} className="home-play-btn" id="home-play-btn">Play now!</Link>

        </div>
    )
}