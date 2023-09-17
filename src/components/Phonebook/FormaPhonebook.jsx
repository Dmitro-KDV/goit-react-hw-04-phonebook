import {Form, Label} from './Phonebook.stiled';
import { useState } from 'react'

const INITIAL_STATE = {
    name: '',
    number: '',
}

export const FormaPhonebook = ({creatContacts}) => {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const handleChange = evt => {
        const { name, value } = evt.target;
        if (name === 'name') {
            setName(value);
        } else {
            setNumber(value)
        }
    };

    const handleSubmit = evt => {
        evt.preventDefault();
        if (!name.trim() || !number.trim()) 
            return 
                setName('');
                setNumber('');
        
        INITIAL_STATE.name = name;
        INITIAL_STATE.number = number;
        creatContacts(INITIAL_STATE)
    };
      
        return ( 
            <div>
                <Form onSubmit={handleSubmit}>
                    <Label>
                        Name
                        <input
                            type="text"
                            name="name"
                            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                            required
                            onChange={handleChange}
                            value={name}
                        />
                    </Label>
                    <Label>
                        Number
                        <input
                            type="tel"
                            name="number"
                            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                            required
                            onChange={handleChange}
                            value={number}
                        />
                    </Label>
                    <button type="submit">Add contact</button>
                </Form>
            </div>
        );
    }