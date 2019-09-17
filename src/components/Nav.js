import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const Nav = ({ notes, archived, path }) => {
    return (
        <nav>
            <Link to='/notes' className={path === '/notes' ? 'selected' : ''}>Notes ({notes.length - archived.length})</Link>
            <Link to='/archived' className={path === '/archived' ? 'selected' : ''}>Archived ({archived.length})</Link>
            <Link to='/notes/create' className={path === '/notes/create' ? 'selected' : ''}>Create</Link>
        </nav>
    )
}

const mapStateToProp = ({notes}) => {
    return {
        notes,
        archived: notes.filter(note => note.archived)
    }
}

export default connect(mapStateToProp)(Nav)
