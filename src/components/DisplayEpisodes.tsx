import { useEffect, useState, ChangeEvent } from "react";
import "./DisplayEpisodes.css";

export { formatSeasonAndEpisode };
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
interface Props {
  showURL: string;
  handleChangePage: () => void;
}

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

export default function DisplayEpisodes(props: Props): JSX.Element {
  //----------------------------------------------------------------------------------------Fetching from API
  console.log("display episodes rerendered", props);
  const [episodes, setEpisodes] = useState<IEpisode[]>([]);
  useEffect(() => {
    const fetchEpisodes = async () => {
      console.log("fetched");
      const response = await fetch(props.showURL);
      const jsonBody: IEpisode[] = await response.json();
      setEpisodes(jsonBody);
    };
    fetchEpisodes();
  }, [props.showURL]);

  //------------------------------------------------------------------------------------------Search Bar Function

  const [searchTerm, setSearchTerm] = useState("");

  function handleSearchTermChange(event: ChangeEvent<HTMLInputElement>): void {
    setSearchTerm(event.target.value);
  }

  function matchingEpisodesFunction(
    searchTerm: string,
    list: IEpisode[]
  ): IEpisode[] {
    const matchList: IEpisode[] = [];

    for (const itemEpisode of list) {
      const lowerName = (itemEpisode.name + itemEpisode.summary).toLowerCase();
      const lowerSearch = searchTerm.toLowerCase();
      if (lowerName.includes(lowerSearch)) {
        matchList.push(itemEpisode);
      }
    }
    return matchList;
  }
  const matchingEpisodes = matchingEpisodesFunction(searchTerm, episodes);

  // ------------------------------------------------------------------------------------------ formatting summary
  const formatSummary = (summary: string): string => {
    const newSummary = summary
      .replaceAll(`<p>`, "")
      .replaceAll(`</p>`, "")
      .replaceAll(`<br>`, "");
    return newSummary;
  };

  //------------------------------------------------------------------------------------------Formatting functions
  // const formatSummary = () => {}

  //----------------------------------------------------------------------------------------Mapping episodes
  const mappedEpisodes = matchingEpisodes.map((episode) => (
    <div className="flex-item" key={episode.id}>
      <div>
        <h1>
          {episode.name} -{" "}
          {formatSeasonAndEpisode(episode.season, episode.number)}
        </h1>
        <br />
        <div>
          {episode.image !== null && <img src={episode.image.medium} alt="" />}
        </div>{" "}
        {episode.summary !== null && formatSummary(episode.summary)}
      </div>
    </div>
  ));
  // some APIs may not contain either the summary or image, so using a conditonal statement means if it is = to null, nothing will happen
  //----------------------------------------------------------------------------------------HTML returned
  return (
    <div className="whole-return">
      <div className="search-bar">
        <input value={searchTerm} onChange={handleSearchTermChange} />
        <button className="back-button" onClick={props.handleChangePage}>
          Back
        </button>
        <p>
          {mappedEpisodes.length}/{episodes.length} episodes displayed
        </p>
      </div>
      <div className="flex-container">{mappedEpisodes}</div>
      <p>
        {" "}
        This information was obtained from:{" "}
        <a href="https://www.tvmaze.com/"> TV Maze</a>{" "}
      </p>
    </div>
  );
}
