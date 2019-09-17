import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../store/actions/index'
import { API } from '../commons/constants'
import axios from 'axios'

const Notes = ({ user, notes, archived, updateNote, destroyNote }) => {
    return (
        <ul>
            {
                notes.filter(note => note.archived === archived).map(note => <li
                    key={note.id}>
                    {note.text}
                    <br />
                    <button onClick={() => { updateNote(user.id, { ...note, archived: !note.archived }) }}>{archived ? 'unarchive' : 'archive'}</button>
                    <button onClick={() => destroyNote(user.id, note)}>destroy</button>
                </li>)
            }
        </ul>
    );

}

const mapStateToProp = ({user, notes}) => {
    return {
        user,
        notes
    }
}

const mapDispatchToProp = dispatch => {
    return {
        updateNote: async (userId, note) => {
            const updated = (await axios.put(`${API}/users/${ userId }/notes/${note.id}`, { archived: note.archived, text: note.text })).data
            dispatch(actions.updateNote(updated))
        },
        destroyNote: async (userId, note) => {
            await axios.delete(`${API}/users/${ userId }/notes/${note.id}`);
            dispatch(actions.destroyNote(note))
        }
    }
}

export default connect(mapStateToProp, mapDispatchToProp)(Notes)

