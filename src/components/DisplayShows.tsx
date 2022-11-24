import { useEffect, useState, ChangeEvent } from "react";
import "./DisplayShows.css";
interface IShow {
  name: string;
  id: number;
  image: {
    medium: string;
    original: string;
  };
  _links: { self: { href: string } };
  genres: string;
  status: string;
  runtime: number;
  rating: { average: number };
  summary: string;
}

interface Props {
  handleChangeShowURL: (givenShowURL: string) => void;
}

export default function DisplayShows(props: Props): JSX.Element {
  const [shows, setShows] = useState<IShow[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  function matchingEpisodesFunction(
    searchTerm: string,
    list: IShow[]
  ): IShow[] {
    const matchList: IShow[] = [];

    for (const itemShow of list) {
      const lowerName = (
        itemShow.name +
        itemShow.genres +
        itemShow.summary
      ).toLowerCase();
      const lowerSearch = searchTerm.toLowerCase();
      if (lowerName.includes(lowerSearch)) {
        matchList.push(itemShow);
      }
    }
    return matchList;
  }

  const formatSummary = (summary: string): string => {
    let newSummary = summary
      .replaceAll(`<p>`, "")
      .replaceAll(`</p>`, "")
      .replaceAll(`<br>`, "")
      .replaceAll(`<b>`, "")
      .replaceAll(`</b>`, "")
      .replaceAll(`</br>`, "");

    if (newSummary.length > 800) {
      newSummary = newSummary.substring(0, 799) + "...read more";
    }
    return newSummary;
  };

  const matchingShows = matchingEpisodesFunction(searchTerm, shows);

  useEffect(() => {
    const fetchShows = async () => {
      const response = await fetch("https://api.tvmaze.com/shows?page=1");
      const jsonBody: IShow[] = await response.json();
      setShows(jsonBody);
    };
    fetchShows();
  }, []);

  function handleGoToShow(link: string) {
    props.handleChangeShowURL(link + "/episodes");
  }
  const alphaShows = matchingShows.sort((a, b) => a.name.localeCompare(b.name));
  const mappedShows = alphaShows.map((show) => (
    <button
      className="show-item"
      onClick={() => handleGoToShow(show._links.self.href)}
      key={show.id}
    >
      <div>
        <div className="title-image">
          <h1 className="show-title">{show.name}</h1>

          {show.image.medium !== null && (
            <img className="show-image" src={show.image.medium} alt="" />
          )}
        </div>
        <div className="show-info">
          <p className="summary">
            {show.summary !== null && formatSummary(show.summary)}
          </p>
          <br />
          <ul className="info-list">
            <li>rating:{show.rating !== null && show.rating.average}</li>
            <br />
            <li>genre:{show.genres !== null && show.genres}</li>
            <br />
            <li>status:{show.status !== null && show.status}</li>
            <br />
            <li>runtime:{show.runtime !== null && show.runtime}-minutes</li>
          </ul>
        </div>
      </div>
    </button>
  ));

  function handleSearchTermChange(event: ChangeEvent<HTMLInputElement>): void {
    setSearchTerm(event.target.value);
  }
  return (
    <>
      <div className="search-bar">
        <input
          placeholder="  Enter show name"
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
      </div>
      <div className="show-container">{mappedShows}</div>
    </>
  );
}
