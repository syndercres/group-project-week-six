import { useEffect, useState, ChangeEvent } from "react";

interface IShow {
  name: string;
  id: number;
  _links: { self: { href: string } };
}


export default function DisplayShows(): JSX.Element {
  const [Shows, setShows] = useState<IShow[]>([]);

  useEffect(() => {
    const fetchShows = async () => {
      const response = await fetch("http://api.tvmaze.com/shows?page=1");
      const jsonBody: IShow[] = await response.json();
      setShows(jsonBody);
    };
    fetchShows();
  }, []);

  function handleGoToShow(){
    console.log("sgdrvkihasebbfkliulasebfgukhyhasevfhaFUKY");
  }

  const mappedShows = Shows.map((show) => (
    <button className="flex-item" onClick={handleGoToShow} key={show.id}>
    <div>
      <h1>{show.name}</h1>
    </div>
    </button>
  ));

  return <div className="flex-container">{mappedShows}</div>;
}
