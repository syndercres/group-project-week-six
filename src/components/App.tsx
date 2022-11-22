import { useEffect, useState, ChangeEvent } from "react";
import DisplayEpisodes from "./DisplayEpisodes";
import DisplayShows from "./DisplayShows";
import "./App.css"


export default function App(): JSX.Element {


  
    return( 
    <div>
        hello world
        <DisplayShows/>
        <DisplayEpisodes/>
    </div>
    )
}