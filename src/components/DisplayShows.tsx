import { useEffect, useState, ChangeEvent } from "react";

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
      const lowerName = itemShow.name.toLowerCase();
      const lowerSearch = searchTerm.toLowerCase();
      if (lowerName.includes(lowerSearch)) {
        matchList.push(itemShow);
      }
    }
    return matchList;
  }

  const formatSummary = (summary: string): string => {
    const newSummary = summary
      .replaceAll(`<p>`, "")
      .replaceAll(`</p>`, "")
      .replaceAll(`<br>`, "")
      .replaceAll(`<b>`, "")
      .replaceAll(`</b>`, "")
      .replaceAll(`</br>`, "");
    return newSummary;
  };

  const matchingShows = matchingEpisodesFunction(searchTerm, shows);

  useEffect(() => {
    const fetchShows = async () => {
      const response = await fetch("http://api.tvmaze.com/shows?page=1");
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
      className="flex-item"
      onClick={() => handleGoToShow(show._links.self.href)}
      key={show.id}
    >
      <div>
        <h1>{show.name}</h1>
        <div>
          {show.image.medium !== null && <img src={show.image.medium} alt="" />}
        </div>
        <div>
          {show.summary !== null && formatSummary(show.summary)}
          {show.rating !== null && show.rating.average}
          {show.genres !== null && show.genres}
          {show.status !== null && show.status}
          {show.runtime !== null && show.runtime}
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
        <input value={searchTerm} onChange={handleSearchTermChange} />
      </div>
      <div className="flex-container">{mappedShows}</div>
    </>
  );
}
