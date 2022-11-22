import { useEffect, useState, ChangeEvent } from "react";
import DisplayEpisodes from "./DisplayEpisodes";
import DisplayShows from "./DisplayShows";
import "./App.css"


export default function App(): JSX.Element {
    const [showURL, setShowURL] = useState<string> ("https://api.tvmaze.com/shows/438/episodes");
    console.log({showURL})
    function changeShowURL(givenShowURL:string){
        console.log("changeShowURL called", givenShowURL);
        setShowURL(givenShowURL);
    }
  
    return( 
    <div>
        hello world
        <DisplayShows
        handleChangeShowURL = {changeShowURL}
        chickenSpeed = {17.3}
        />
        <DisplayEpisodes 
            showURL = {showURL}
        />
    </div>
    )
}