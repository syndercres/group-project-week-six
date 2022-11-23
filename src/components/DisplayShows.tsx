import { useEffect, useState } from "react";

interface IShow {
  name: string;
  id: number;
  image: {
    medium: string;
    original: string;
  };
  _links: { self: { href: string } };
}

interface Props {
  handleChangeShowURL: (givenShowURL: string) => void;
}

export default function DisplayShows(props: Props): JSX.Element {
  const [Shows, setShows] = useState<IShow[]>([]);

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

  const mappedShows = Shows.map((show) => (
    <button
      className="flex-item"
      onClick={() => handleGoToShow(show._links.self.href)}
      key={show.id}
    >
      <div>
        <h1>{show.name}</h1>
        <img src={show.image.medium} alt="" />
      </div>
    </button>
  ));

  return <div className="flex-container">{mappedShows}</div>;
}
