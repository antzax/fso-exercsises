const Numbers = ({ filteredPersons, onDelete }) => {
  return (
    <ul>
      {filteredPersons.map((person) => {
        return (
          <li key={person.name}>
            {person.name} - {person.number}{" "}
            <button onClick={() => onDelete(person.id)}>delete</button>
          </li>
        );
      })}
    </ul>
  );
};

export default Numbers;
