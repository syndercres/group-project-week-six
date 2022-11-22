import { useEffect, useState, ChangeEvent } from "react";

interface IShow {
  name: string;
  id: number;
  _links: { self: { href: string } };
}


export default function DisplayShows(): JSX.Element {
  const [Shows, setShows] = useState<IShow[]>([]);
  const [showAPIlink, setShowAPIlink] = useState<string>("https://api.tvmaze.com/shows/82/episodes");

  useEffect(() => {
    const fetchShows = async () => {
      const response = await fetch("http://api.tvmaze.com/shows?page=1");
      const jsonBody: IShow[] = await response.json();
      setShows(jsonBody);
    };
    fetchShows();
  }, []);

  function handleGoToShow(link:string){
    console.log(link +"/episodes");
    setShowAPIlink(link + "/episodes");
  }

  const mappedShows = Shows.map((show) => (
    <button className="flex-item" onClick={() =>handleGoToShow(show._links.self.href)} key={show.id}>
    <div>
      <h1>{show.name}</h1>
    </div>
    </button>
  ));

  return <div className="flex-container">{mappedShows}</div>;
}
