import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Numbers from "./components/Numbers";
import personService from "./service/persons";

const App = () => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    personService.getAll().then((allPersons) => {
      setPersons(allPersons);
    });
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const deletePersonOf = (id) => {
    const personName = persons.find((person) => person.id === id).name;
    
    if (!window.confirm(`Delete ${personName} ?`)) return;

    personService.deletePerson(id).then((deletedPerson) => {
      setPersons(persons.filter((person) => person.id !== deletedPerson.id));
    });
  };

  const updatePerson = (existingPerson) => {
    const updatedPerson = {
      ...existingPerson,
      number: newNumber,
    };

    personService
      .updatePerson(existingPerson.id, updatedPerson)
      .then((returnedPerson) => {
        setPersons(
          persons.map((person) =>
            person.id === returnedPerson.id ? returnedPerson : person
          )
        );
        setNewName("");
        setNewNumber("");
      });
  };

  const addPerson = (event) => {
    event.preventDefault();

    const existingPerson = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );

    if (
      existingPerson &&
      window.confirm(
        `${existingPerson.name} is already added to phonebook, replace the old number with new one?`
      )
    ) {
      updatePerson(existingPerson);
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    personService.addPerson(newPerson).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewName("");
      setNewNumber("");
    });
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter searchValue={search} onSearchChange={handleSearchChange} />

      <h3>add a new</h3>
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        onNameChange={handleNameChange}
        newNumber={newNumber}
        onNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Numbers filteredPersons={filteredPersons} onDelete={deletePersonOf} />
    </div>
  );
};

export default App;
