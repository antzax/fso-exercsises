import axios from "axios";
import { useEffect, useState } from "react";
import CountryList from "./components/CountryList";

const API_URL = "https://studies.cs.helsinki.fi/restcountries/";


const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get(`${API_URL}/api/all`).then((res) => {
      setCountries(res.data);
    });
  }, []);

  const matchedCountries = countries.filter((c) =>
    c.name.common.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      find countries{" "}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {search === "" ? null : (
        <CountryList countries={matchedCountries} showCountry={setSearch} />
      )}
    </div>
  );
};

export default App;
