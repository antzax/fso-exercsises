const Persons = ({ persons, onRemove }) =>
  persons.map((person) => (
    <p key={person.id}>
      {person.name} {person.number}{' '}
      <button onClick={() => onRemove(person)}>delete</button>
    </p>
  ))

export default Persons