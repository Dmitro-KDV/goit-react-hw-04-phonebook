import {FormaPhonebook} from 'components/Phonebook/FormaPhonebook'
import {Contacts} from 'components/Phonebook/Contacts'
import {Filter} from 'components/Phonebook/Filter'
import {Container} from './Phonebook/Phonebook.stiled';
import { nanoid } from "nanoid";
import { useState, useEffect} from "react";

const INITIAL_STATE = {
    contacts: [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
}

export const App = () => {
  let INITIAL = INITIAL_STATE.contacts;
  const [contacts, setContacts] = useState(INITIAL)
  const [filter, setFilter] = useState(null)
  // state = {
  //   ...INITIAL_STATE,
  //   filter: null,
  // }
  useEffect(() => {
    const parsedSettings = localStorage.getItem('contacts');
    if (parsedSettings && JSON.parse(parsedSettings).length) {
      setContacts(JSON.parse(parsedSettings))
      // this.setState({contacts: JSON.parse(parsedSettings)})
    }
  }, [])
  // componentDidMount() {
  //   const parsedSettings = localStorage.getItem('contacts');
  //   if (parsedSettings && JSON.parse(parsedSettings).length) {
  //     this.setState({contacts: JSON.parse(parsedSettings)})
  //   }
  // }
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  },[contacts]);

  // componentDidUpdate(_, prevState) {
  //   console.log(prevState)
  //   if (prevState.contacts.length !== this.state.contacts.length) {
  //     localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  //   }
  // }

  const creatContacts = (body) => {
    // console.log(contacts)
    const  isAlredyContacts = contacts.find(el => el.name === body.name);
    if (isAlredyContacts) return alert(`${body.name} is alredy in contacts.`)
    
    const newContacts = {
      ...body,
      id: nanoid(),
    }
    setContacts((prevContacts)=>[newContacts, ...prevContacts]);
    // this.setState((prev) => ({
    //   contacts: [newContacts, ...prev.contacts],
    // }))
  }

  const handDelete = (id) =>  {
    if (filter) {
      setContacts((prevContacts) => {
        return setFilter(prevContacts.filter((el) => el.id !== id))});
      // this.setState((prev) => ({
      //   filter: prev.contacts.filter((el) => el.id !== id),
      // }));
    } else {
      // setContacts(contacts.filter((el) => el.id !== id))
      setContacts((prevContacts) => {
        return prevContacts.filter((el) => el.id !== id)});
      // this.setState((prev) => ({
      //   contacts: prev.contacts.filter((el) => el.id !== id),
      // }));
    }
  }

  const filterContacts = (filterName) => {
    setContacts((prevContacts) => {
      return setFilter(prevContacts.filter((el) => el.name.toLowerCase().includes(filterName.toLowerCase())))})
    // this.setState((prev) => ({
    //   filter: prev.contacts.filter((el) => el.name.toLowerCase().includes(filterName.toLowerCase())),
    // }));
  }
  
      return (
          <Container>
              <h2>Phonebook</h2>
              <FormaPhonebook creatContacts={creatContacts}/>
              <h2>Contacts</h2>
              <Filter filterContacts={filterContacts}/>
              <Contacts contact={contacts} filter={filter} handDelete={handDelete}/>
          </Container>
      );
  
};
