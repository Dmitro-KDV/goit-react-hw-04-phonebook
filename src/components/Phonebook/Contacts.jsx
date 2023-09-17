import {ContactList, ContactItem} from './Phonebook.stiled';

export const Contacts = ({contact, handDelete}) => {
    return ( 
        <>
            {(contact).map((el) => 
            <ContactItem key = {el.id}>
                <ContactList>{el.name}: {el.number}   
                    <button type='button' onClick={()=>handDelete(el.id)}>Delete</button>
                </ContactList>
            </ContactItem>
            )}
        </>    
    );
}