import React, { useEffect, useState } from 'react';
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [noteId]) //when is changing noteId to rerun useEffect

    const getNote = () => {
        if (noteId === 'new') return
        fetch(baseUrl)
        .then(res => res.json())
        .then(result => {
            setNote(result)
        } )
    }

    // const getNote = async () => {
    //     if (noteId === 'new') return
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

    const createNote = async () => {
        console.log('Note')
        await fetch(`http://localhost:8000/notes/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...note, 'updated': new Date()})
        })
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

    const deleteNote = async () => {
        await fetch(`http://localhost:8000/notes/${noteId}`, {
            method: 'Delete',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        navigate('/')
    }

    const goToHomePage = () => {
        navigate('/')
    }

    const handleSubmit = () => {
        if (noteId !== 'new' && !note.body) {
            deleteNote()
        } else if (noteId !== 'new') {
            updateNote()
        } else if (noteId === 'new' && note!== null) {
            createNote()
        }

        navigate('/')
    }

    return (
        <div className='note'>
            <div className="note-header">
                <h3>
                    <ArrowLeft onClick={goToHomePage}/>
                    <button onClick={handleSubmit}>Update</button>
                </h3>

                {noteId !== 'new' &&
                    <button onClick={deleteNote}>Delete</button>

                }

            </div>

            <textarea onChange={onChange} placeholder="Edit note" value={note?.body}>

            </textarea>
        </div>
    )
}

export default NotePage
