const Filter = ({searchValue, onSearchChange}) => {
  return (
    <div>
      <p>
        filter show with <input value={searchValue} onChange={onSearchChange} />
      </p>
    </div>
  );
};

export default Filter;
