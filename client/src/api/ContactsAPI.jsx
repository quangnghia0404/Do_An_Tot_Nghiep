import { useState, useEffect } from "react";
import axios from "axios";

function ContactsAPI() {
  const [contacts, setContacts] = useState([]);
  const [callback, setCallback] = useState(false);

  const getContacts = async () => {
    const res = await axios.get('/api/inforcontact');

    setContacts(res.data);
  
  };

  useEffect(() => {
    getContacts();
   
  }, [callback]);

  return {
    contacts: [contacts, setContacts],
    callback: [callback, setCallback],
  };
}

export default ContactsAPI;
