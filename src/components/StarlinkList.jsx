import { useEffect } from "react";

export default function StarlinkList() {
  //const [starlinks, setStarlinks] = useState([]);
  
  const fetchStarlink = async () => {
    const request = {
      query: {},
      options: { limit: 100 }
    };

    const teste = await fetch('https://api.spacexdata.com/v4/starlink/query', {
      method: 'POST',
      body: JSON.stringify(request)
    });

    console.log(teste);
  }
  useEffect(() => {
    fetchStarlink();
  }, []);

  return (
    <>
      <h1>Olá.. </h1>
    </>
  );
}