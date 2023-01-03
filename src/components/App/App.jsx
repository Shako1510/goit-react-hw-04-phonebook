import { useState, useEffect } from "react";
import { nanoid } from 'nanoid';
import Form from "../Form/ContactForm";
import Contacts from "../Contacts/Contacts";
import Filter from "../Filter/Filter";
import { DivBox, TitleBox, SecondaryTitleBox } from "./AppStyled";


export function App() {
  const [contacts, setContacts] = useState(() => {
    const contactsValue = JSON.parse(localStorage.getItem('contacts'));
    return contactsValue ?? [{ id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },]
  });

  const [filter, setFilter] = useState("");

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts))
  }, [contacts]);


  const addContact = ({ name, number }) => {

    const findContact = contacts.find((contact) => contact.name === name);

    if (findContact) {
      alert(`${name} is already in contacts`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    setContacts(prevState =>
      [newContact, ...prevState],
    )
  };

  const serchingFilter = (e) => {
    const value = e.currentTarget.value
    setFilter(value);
  };

  const removeContact = (contactId) => {
    setContacts(prevState =>
      contacts.filter(contact => contact.id !== contactId),
    )
  }

  const normalizedFilter = filter.toLowerCase();
  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );

  return (
    <DivBox>

      <TitleBox>Phonebook</TitleBox>

      <Form onSubmit={addContact} />

      <SecondaryTitleBox>Contacts</SecondaryTitleBox>

      <Filter
        filterValue={filter}
        onChange={serchingFilter} />

      <Contacts
        contacts={visibleContacts}
        onClick={removeContact}
      />
    </DivBox>
  );
}

export default App;


