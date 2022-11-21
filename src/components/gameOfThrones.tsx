import { useEffect, useState, ChangeEvent } from "react";
import "./gameOfThrones.css";

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

export default function GameOfThrones(): JSX.Element {
  const [episodes, setEpisodes] = useState<IEpisode[]>([]);

  useEffect(() => {
    const fetchEpisodes = async () => {
      const response = await fetch("https://api.tvmaze.com/shows/82/episodes");
      const jsonBody: IEpisode[] = await response.json();
      setEpisodes(jsonBody);
    };
    fetchEpisodes();
  }, []);

  const [searchTerm,setSearchTerm] = useState("");

  function handleSearchTermChange(event: ChangeEvent<HTMLInputElement>): void {
      setSearchTerm(event.target.value);
  }

  function matchingEpisodesFunction(searchTerm:string, list: IEpisode[]): IEpisode[] {
      const matchList: IEpisode[] = [];
      
      for(const itemEpisode of list){
          const lowerName = itemEpisode.name.toLowerCase();
          const lowerSearch = searchTerm.toLowerCase();
          if((lowerName).includes(lowerSearch)){
              matchList.push(itemEpisode);
          }
      }
      return matchList;
    }
   const matchingEpisodes = matchingEpisodesFunction(searchTerm,episodes)

  // const formatSummary = () => {}

  const formatSeasonAndEpisode = (season: number, episode: number): string => {
    let returnSeason = `${season}`;
    let returnEpisode = `${episode}`;
    if (season < 10) {
      returnSeason = `0${season}`;
    }
    if (episode < 10) {
      returnEpisode = `0${episode}`;
    }
    return `S${returnSeason}E${returnEpisode}`;
  };

  const mappedEpisodes = matchingEpisodes.map((episode) => (
    <div className="flex-item" key={episode.id}>
      <div>
        <h1>
          {episode.name} -{" "}
          {formatSeasonAndEpisode(episode.season, episode.number)}
        </h1>
        <br />
        <div>
          <img src={episode.image.medium} alt="" />
        </div>
        {episode.summary}
      </div>
    </div>
  ));

  return (<>
   <input value={searchTerm} 
      onChange={handleSearchTermChange}
     />
  <div className="flex-container">{mappedEpisodes}</div>
  <p> This information was obtained from: <a href= "https://www.tvmaze.com/"> TV Maze</a> </p>
  </>);
}
