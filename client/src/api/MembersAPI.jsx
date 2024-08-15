import { useState, useEffect } from "react";
import axios from "axios";

function MembersAPI() {
  const [members, setMembers] = useState([]);
  const [callback, setCallback] = useState(false);
  const [duty, setDuty] = useState("");

  const getMembers = async () => {
    const res = await axios.get("/api/members");

    setMembers(res.data);
  };

  useEffect(() => {
    getMembers();
  }, [callback, duty]);

  return {
    members: [members, setMembers],
    callback: [callback, setCallback],
    duty: [duty, setDuty],
  };
}

export default MembersAPI;
