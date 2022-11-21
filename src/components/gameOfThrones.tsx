import {useEffect, useState} from "react"



interface IEpisode {
    id: number;
    url: string;
    name: string;
    season: number;
    number: number;
    type: string;
    airdate: string;
    airtime: string;
    airstamp: string;
    rating: { average: number };
    runtime: number;
    image: {
      medium: string;
      original: string;
    };
    summary: string;
    _links: { self: { href: string } };
  }



export default function GameOfThrones():JSX.Element {
   
    const [episodes, setEpisodes] = useState<IEpisode[]> ([]);
    
    useEffect(() => {
        const fetchEpisodes = async () => {
          const response = await fetch("https://api.tvmaze.com/shows/82/episodes");
          const jsonBody: IEpisode[] = await response.json();
          setEpisodes(jsonBody);
        };
        fetchEpisodes();
      }, []);
   
      const mappedEpisodes = episodes.map(episode => (
        <div key={episode.id}>
        <p>episode name is :{episode.name}</p>
        </div>
      ))
   
    return(
        
        <div>
            {mappedEpisodes}
        </div>
    )
}