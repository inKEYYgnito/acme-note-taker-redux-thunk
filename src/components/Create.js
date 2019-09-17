import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../store/actions/index'
import { API } from '../commons/constants'
import axios from 'axios'

class Create extends Component {
    constructor() {
        super();
        this.state = {
            text: '',
            error: ''
        };
        this.create = this.create.bind(this)
    }
    async create() {
        const { text } = this.state
        const { user, createNote, history } = this.props
        try {
            const created = (await axios.post(`${API}/users/${ user.id }/notes`, { text })).data
            createNote(created)
            history.push('/notes')
        } catch (ex) {
            this.setState({ error: ex.response.data.message })
        }
    }
    render() {
        const { text, error } = this.state;
        const { create } = this;
        const loaderImg = 'https://www.pinclipart.com/picdir/middle/175-1750251_loader-loading-progress-wait-icon-loading-png-clipart.png'
        return this.props.loading ? (<img src={ loaderImg } className="App-logo" />) :
        (
            <form onSubmit={ev => ev.preventDefault()}>
                {!!error && <div className='error'>{error}</div>}
                <input value={text} placeholder='create new note' onChange={(ev) => this.setState({ text: ev.target.value })} />
                <button disabled={!text} onClick={create}>Create</button>
            </form>
        );
    }
}

const mapStateToProp = ({ user, utils }) => {
    return {
        user,
        loading: utils.loading
    }
}

const mapDispatchToProp = dispatch => {
    return {
        createNote: (note) => dispatch(actions.createNote(note)),
    }
}

export default connect(mapStateToProp, mapDispatchToProp)(Create)
