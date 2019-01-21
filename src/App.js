import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import GenerateId from './components/Utils/GenerateId';
import Notifier, {openAlert} from './components/Utils/Alert';
import UserCreate from './components/UserCreate';
import UserList from './components/UserList';

import './App.css';

class App extends Component {

    // constructor
    constructor(props) {

        super(props);

        // default state
        const users = JSON.parse(
            (window.localStorage.getItem('users') || '[]')
        );

        this.state = {
            users: users,
            alertStatus: false,
            alertMessage: 'Failed',
            alertColor: 'error',
        };
    }

    // Update to local storage
    updateLocalStorage = users => {

        const stringified = JSON.stringify(users);
        window.localStorage.setItem('users', stringified);
    };

    // Save/Update users
    updateAndSave = users => {

        this.updateLocalStorage(users);
        this.setState({users});
    };

    // Remove user and update state
    removeUser = user => {

        if (window.confirm('You are sure')) {

            let {users} = this.state;

            users = users.filter(u => {
                return u.id !== user.id
            });

            this.updateAndSave(users);
        }
    };

    // filter if user has exist
    filterUserByUsername = username => {

        let {users} = this.state;

        return users.filter(u => {

            const getUserName = u.firstName + u.lastName;
            return getUserName.toString() === username.toString()
        });
    };

    // save user handler
    saveUserHandler = (event, state) => {

        event.preventDefault();

        let {users} = this.state;

        const userName = state.firstName + state.lastName;

        const userId = window.btoa(GenerateId(userName));

        if (this.filterUserByUsername(userName).length > 0) {
            openAlert({message: `This user ${state.firstName} has exist`, color: 'error'});
            return;
        }

        const newUser = {
            id: userId,
            firstName: state.firstName.trim(),
            lastName: state.lastName,
            avatar: `https://material-ui.com/static/images/avatar/${Math.floor(Math.random() * 2) + 1}.jpg`,
            games: state.listGames
        };

        users = users.concat(newUser);
        this.updateAndSave(users);
    };

    render() {

        return (
            <div className="App">
                <Notifier/>
                <AppBar position="static" color="primary">
                    <Toolbar>
                        <Typography variant="h6" color="inherit">
                            VideoGame List
                        </Typography>
                    </Toolbar>
                </AppBar>
                <UserCreate
                    users={this.state.users}
                    onCreateUser={this.saveUserHandler}
                />
                <UserList
                    users={this.state.users}
                    onRemoveUser={this.removeUser}
                />
            </div>
        );
    }
}

export default App;
