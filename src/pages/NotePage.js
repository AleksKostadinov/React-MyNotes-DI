import React, { useEffect, useState } from 'react';
// import notes from '../assets/data';
import { useParams, useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg';


const NotePage = () => {

    const params = useParams();
    const noteId = params.id
    const baseUrl = `http://localhost:8000/notes/${noteId}`
    // let note = notes.find(note => note.id === Number(noteId))
    const [note, setNote] = useState(null)

    const navigate = useNavigate();

    useEffect(() => {
        getNote()
    }, [noteId]) //when is changing noteId to rerun useEffect

    const getNote = () => {
        fetch(baseUrl)
        .then(res => res.json())
        .then(result => {
            setNote(result)
        } )
    }

    // const getNote = async () => {
    //     const response = await fetch(`http://localhost:8000/notes/${noteId}`)
    //     const result = await response.json()
    //     setNote(result)
    // }

    const onChange = (e) =>{
        setNote({
            ...note,
            'body': e.target.value
        });
    }

    const updateNote = async () => {
        await fetch(`http://localhost:8000/notes/${noteId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...note, 'updated': new Date()})
        })
    }

    const handleSubmit = () => {
        updateNote()
        navigate('/')
    }

    return (
        <div className='note'>
            <div className="note-header">
                <h3>
                    <ArrowLeft onClick={handleSubmit}/>
                </h3>
            </div>

            <textarea onChange={onChange} placeholder="Edit note" value={note?.body}>

            </textarea>
        </div>
    )
}

export default NotePage
