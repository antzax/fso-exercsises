import { useEffect, useState } from "react";

import Filter from "./components/Filter";
import Notification from "./components/Notification";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [notification, setNotification] = useState({ message: null });

  useEffect(() => {
    personService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons);
      })
      .catch((error) => notifyWith(error.response.data, true));
  }, []);

  const personsToShow = persons.filter((person) => {
    return person.name?.toLowerCase().includes(search.toLowerCase());
  });

  const clearForm = () => {
    setNewName("");
    setNewNumber("");
  };

  const notifyWith = (message, isError = false) => {
    setNotification({ message, isError });
    setTimeout(() => {
      setNotification({ message: null });
    }, 5000);
  };

  const updatePerson = (person) => {
    const ok = window.confirm(
      `${newName} is already added to phonebook, replace the old number with a new one?`
    );
    if (ok) {
      personService
        .update({ ...person, number: newNumber })
        .then((updatedPerson) => {
          setPersons(
            persons.map((p) => (p.id !== person.id ? p : updatedPerson))
          );
          notifyWith(`Phonenumber of ${updatedPerson.name} updated!`);
          clearForm();
        })
        .catch(() => {
          notifyWith(
            `Information of ${person.name} has already been removed from server`,
            true
          );
          setPersons(persons.filter((p) => p.name !== person.name));
        });
    }
  };

  const onAddNew = (event) => {
    event.preventDefault();
    const existingPerson = persons.find((p) => p.name === newName);

    if (existingPerson) {
      updatePerson(existingPerson);
      return;
    }

    personService
      .create({ name: newName, number: newNumber })
      .then((createdPerson) => {
        setPersons(persons.concat(createdPerson));
        notifyWith(`Added ${createdPerson.name}`);
        clearForm();
      })
      .catch((error) => {
        notifyWith(error.response.data, true);
      });
  };

  const onRemove = (person) => {
    const ok = window.confirm(`Delete ${person.name} ?`);
    if (ok) {
      personService
        .remove(person.id)
        .then(() => setPersons(persons.filter((p) => p.id !== person.id)));

      notifyWith(`Deleted ${person.name}`);
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification notification={notification} />
      <Filter searchValue={search} setSearch={setSearch} />

      <h2>Add a new</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        onSubmit={onAddNew}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
      />

      <h2>Numbers</h2>
      <Persons persons={personsToShow} onRemove={onRemove} />
    </div>
  );
};

export default App;
