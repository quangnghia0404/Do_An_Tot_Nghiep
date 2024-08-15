import React, {useState, useContext, useEffect} from 'react'
import axios from 'axios'
import {GlobalState} from '../../../GlobalState'
import Loading from '../utils/loading/Loading'
import {useHistory, useParams} from 'react-router-dom'
import {Link} from 'react-router-dom'



const initialState = {
    member_id: '',
    name: '',
    phone: 0,
    duty: '',
    _id: ''
}

function CreateMember() {

    const state = useContext(GlobalState)
    const [member, setMember] = useState(initialState)
    const [duties] = state.dutiesAPI.duties
    const [images, setImages] = useState(false)
    const [loading, setLoading] = useState(false)

    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token

    const history = useHistory()
    const param = useParams()


    const [members] = state.membersAPI.members
    const [onEdit, setOnEdit] = useState(false)
    const [callback, setCallback] = state.membersAPI.callback

    useEffect(() => {
        if(param.id){
            setOnEdit(true)
            members.forEach(member => {
                if(member._id === param.id) {
                    setMember(member)
                    setImages(member.images)
                }
            })
        }else{
            setOnEdit(false)
            setMember(initialState)
            setImages(false)
            
        }
    }, [param.id, members])

    const handleUpload = async e =>{
        e.preventDefault()
        try {
            if(!isAdmin) return alert("You're not an admin")
            const file = e.target.files[0]
            
            if(!file) return alert("File not exist.")

            if(file.size > 1024 * 1024) return alert("Size to large!.")

            if(file.type !== 'image/jpeg' && file.type !== 'image/png')
                return alert("File format is incorrect!.")

                let formData = new FormData()
                formData.append('file', file)
    
                setLoading(true)
                const res = await axios.post('/api/upload', formData, {
                    headers: {'content-type': 'multipart/form-data', Authorization: token}
                })
                setLoading(false)
                setImages(res.data)

        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handleDestroy = async () => {
        try {
            if(!isAdmin) return alert("You're not an admin")
            setLoading(true)
            await axios.post('/api/destroy', {public_id: images.public_id}, {
                headers: {Authorization: token}
            })
            setLoading(false)
            setImages(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handleChangeInput = async e =>{
        const {name, value} = e.target
        setMember({...member, [name]:value})
    }
    
    const handleSubmit = async e =>{
        e.preventDefault()
        try {
            if(!isAdmin) return alert("You're not an admin")
            if(!images) return alert("No image upload")

            if(onEdit)
            {
                await axios.put(`/api/members/${member._id}`, {...member, images},{
                    headers: {Authorization: token}
                })
                alert("Update successfully!")
                window.location.href = "/members";
            }
            else{
                await axios.post('/api/members', {...member, images},{
                    headers: {Authorization: token}
                })
                alert("Create member successfully!")
                window.location.href = "/members";
            }
            setCallback(!callback)
            history.push("/")
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const styleUpload = {
        display : images ? "block" : "none"
    }

    return (
        <div>
        {
            isAdmin ? 
            <div className="note">
                <div className="note-left">
                    {onEdit? "Edit Products": "Create Products"}
                </div>
                <div className="note-right">
                    <Link to="/" id="link">Admin</Link> / {onEdit? "Edit Members": "Create Members"}
                </div>
            </div>
            : 
            ''
        }
            <div className="create_product">
                <div className="upload">
                    <input type="file" name="file" id="file_up" onChange={handleUpload}/>
                    {
                        loading ? <div id="file_img"><Loading /></div>
                        :<div id="file_img" style={styleUpload}>
                            <img src={images ? images.url : ''} alt=""/>
                            <span onClick={handleDestroy}>X</span>
                        </div>
                    }  
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <label htmlFor="member_id">Member ID</label>
                        <input type="text" name="member_id" id="product_id" required
                        value={member.member_id} onChange={handleChangeInput} disabled={onEdit}/>
                    </div>

                    <div className="row">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="title" required
                        value={member.name} onChange={handleChangeInput} />
                    </div>
                    <div className="row">
                        <label htmlFor="content">Content</label>
                        <input type="text" name="content" id="content" required
                        value={member.content} onChange={handleChangeInput} />
                    </div>

                    <div className="row">
                        <label htmlFor="duties">Duties: </label>
                        <select name="duty" value={member.duty} onChange={handleChangeInput} >
                            <option value="">Please select a duty</option>
                            {
                                duties.map(duty => (
                                    <option value={duty.name} key={duty.name}>
                                        {duty.name}
                                    </option>
                                ))
                            }
                        </select>
                    </div>

                    <button type="submit">{onEdit? "Update": "Create"}</button>
                </form>
            </div>
        </div>
    );
}

export default CreateMember;