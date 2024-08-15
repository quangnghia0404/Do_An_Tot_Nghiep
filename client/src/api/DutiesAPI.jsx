import {useState, useEffect} from 'react'
import axios from 'axios'

function DutiesAPI() {
    const [duties, setDuties] = useState([])
    const [callback, setCallback] = useState(false)

    useEffect(() =>{
        const getDuties = async () =>{
            const res = await axios.get('/api/duty')
            
            setDuties(res.data)
        }

        getDuties()
    },[callback])
    return {
        duties: [duties, setDuties],
        callback: [callback, setCallback]
    }
}

export default DutiesAPI