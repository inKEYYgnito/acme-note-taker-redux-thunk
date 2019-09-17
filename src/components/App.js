import React, { Component } from 'react'
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { API } from '../commons/constants'
import * as actions from '../store/actions/index'
import axios from 'axios'
import Notes from './Notes'
import Create from './Create'
import Nav from './Nav'

const fetchUser = async () => {
    const storage = window.localStorage;
    const userId = storage.getItem('userId');
    if (userId) {
        try {
            return (await axios.get(`${API}/users/detail/${userId}`)).data;
        }
        catch (ex) {
            storage.removeItem('userId');
            return fetchUser();
        }
    }
    const user = (await axios.get(`${API}/users/random`)).data;
    storage.setItem('userId', user.id);
    return user;
};

class App extends Component {
    async componentDidMount() {
        const { setUser, setNotes } = this.props
        try {
            const user = await fetchUser()
            setUser(user)
            const notes = (await axios.get(`${API}/users/${user.id}/notes`)).data
            setNotes(notes)
        } catch (e) {
            console.error(e)
        }
    }
    render() {
        const { user } = this.props
        return (
            <HashRouter>
                <Route render={({ location }) => <Nav path={location.pathname} />} />
                <h1>Acme Note--taker for {user.id ? user.fullName : ''}</h1>
                <Switch>
                    <Route exact path='/notes' render={() => <Notes archived={false} />} />
                    <Route path='/notes/create' render={({ history }) => <Create history={history} />} />
                    <Route path='/archived' render={() => <Notes archived={true} />} />
                    <Redirect to='/notes' />
                </Switch>
            </HashRouter>
        );
    }
}

const mapStateToProp = ({ user }) => {
    return {
        user
    }
}

const mapDispatchToProp = (dispatch) => {
    return {
        setUser: (user) => dispatch(actions.setUser(user)),
        setNotes: (notes) => dispatch(actions.setNotes(notes)),
    }
}

export default connect(mapStateToProp, mapDispatchToProp)(App)
