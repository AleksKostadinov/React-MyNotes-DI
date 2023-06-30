import React from 'react';
import notes from '../assets/data';
import { useParams } from 'react-router-dom';

const NotePage = () => {
    const params = useParams();

    let noteId = params.id
    let note = notes.find(note => note.id === Number(noteId))

    return (
        <div>
            <p>{note.body}</p>
        </div>
    )
}

export default NotePage
