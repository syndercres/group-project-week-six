import { useEffect, useState, ChangeEvent } from "react";
import DisplayEpisodes from "./DisplayEpisodes";
import DisplayShows from "./DisplayShows";
import "./App.css"


export default function App(): JSX.Element {
    const [showURL, setShowURL] = useState<string> ("https://api.tvmaze.com/shows/438/episodes");
    const [pageView, setPageView] = useState<boolean> (false);
    console.log({showURL})
    function changeShowURL(givenShowURL:string){
        setShowURL(givenShowURL);
        setPageView(true)
        console.log(pageView)
    }
  
    return( 
    <div>

        <div className= "title">
            <h1>TV Show App</h1>
        </div>

        {pageView? 
        <DisplayEpisodes 
        showURL = {showURL}
    />:
        <DisplayShows
        handleChangeShowURL = {changeShowURL}
        chickenSpeed = {17.3}
        />

}
    </div>
    )
}