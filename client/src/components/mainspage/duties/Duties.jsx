import React,{useState, useContext} from 'react';
import {GlobalState} from '../../../GlobalState'
import axios from 'axios'
import { Link } from 'react-router-dom';

function Duties() {

    const state = useContext(GlobalState)
    const [duties] = state.dutiesAPI.duties
    const [duty, setDuty] = useState('')
    const [token] = state.token
    const [callback, setCallback] = state.dutiesAPI.callback
    const [onEdit, setOnEdit] = useState(false)
    const [id, setID] = useState('')
    const [isAdmin] = state.userAPI.isAdmin


    const createDuty = async e => {
        e.preventDefault()
        try {
            if(onEdit){
                const res = await axios.put(`/api/duty/${id}`, {name: duty}, {
                    headers: {Authorization: token}
                })
                alert(res.data.msg)
            }
            else{
                const res = await axios.post('/api/duty',{name : duty},{
                    headers: {Authorization: token}
                })
    
                alert(res.data.msg)
            }
            setOnEdit(false)
            setDuty('')
            setCallback(!callback)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const editDuty = async (id, name) =>{
        setID(id)
        setDuty(name)
        setOnEdit(true)
    }

    const deleteDuty = async id =>{
        try {
            const res = await axios.delete(`/api/duty/${id}`, {
                headers: {Authorization: token}
            })
            alert(res.data.msg)
            setCallback(!callback)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }
    
    return (
        <div>
            {
            isAdmin ? 
            <div className="note">
                <div className="note-left">
                    {onEdit? "Edit Duties" : "Create Duties"}
                </div>
                <div className="note-right">
                    <Link to="/" id="link">Admin</Link> / {onEdit? "Edit Duties" : "Create Duties"}
                </div>
            </div>
            : 
            ''
            }
            <div className="categories">
                <form onSubmit={createDuty}>
                    <label htmlFor="category">Duty</label>
                    <input type="text" name="duty" value={duty} required
                    onChange={e => setDuty(e.target.value)}/>

                    <button type="submit">{onEdit? "Update" : "Create"}</button>
                </form>
                <div className="col">
                        {
                            duties.map(duty =>(
                                <div className="row" key={duty._id}>
                                    <p>{duty.name}</p>
                                    <div>
                                        <button onClick={() => editDuty(duty._id, duty.name)}>Edit</button> 
                                        <button onClick={() => deleteDuty(duty._id)}>Delete</button>
                                    </div>
                                </div>
                            ))
                        }
                </div>
            </div>
        </div>
    );
}

export default Duties;