import Weather from "./Weather";

const Country = ({ country }) => {
  const languages = Object.values(country.languages);

  return (
    <>
      <h1>{country.name.common}</h1>
      <p>{country.capital}</p>
      <p>Area {country.area}</p>
      <h2>Languages</h2>
      <ul>
        {languages.map((lang) => {
          return <li>{lang}</li>;
        })}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
      <Weather country={country} />
    </>
  );
};

const CountryList = ({ countries, showCountry }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  if (countries.length > 1) {
    return (
      <div>
        {countries.map((country) => (
          <>
            <div>{country.name.common}</div>
            <button onClick={() => showCountry(country.name.common)}>
              Show
            </button>
          </>
        ))}
      </div>
    );
  }
  if (countries.length === 1) {
    return <Country country={countries[0]} />;
  }

  return <div>No matches, please try another search</div>;
};

export default CountryList;
