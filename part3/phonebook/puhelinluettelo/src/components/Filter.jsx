const Filter = ({ searchValue, setSearch }) => {
  return (
    <div>
      <p>
        filter show with{" "}
        <input
          value={searchValue}
          onChange={(e) => setSearch(e.target.value)}
        />
      </p>
    </div>
  );
};

export default Filter;
