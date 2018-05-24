import React, { Component } from 'react';
import axios from 'axios'

const MiniUserContext = React.createContext();

export class MiniUserProvider extends Component {
    state = {
        userName: null,
        isLoggedIn: false,
        userRole: null,
        userList: [],
        snackDeleteOpen: false,
        snackInputErrorOpen: false,
    };

    componentWillMount () {
        axios.get('http://localhost:8080/users')
            .then((response) => {
                this.setState({userList: response.data})
            }).catch(error => console.log("Error occurred" + error));
    }

    logIn = (name, password) => {
        axios.post('http://localhost:8080/login', { userName: name, password: password })
            .then((response) => {
                this.setState({userName: response.data.userName,
                    userRole: response.data.userRole,
                    isLoggedIn: true})
            }).catch( (error) => {this.openInputErrorSnack()});
    };

    logOut = () => {
        this.setState (
            {userName: null,
                isLoggedIn: false,
                userRole: null
            });
    };

    refreshUserList = (userId) => {
        function isUserHasId(user) {
            return user.id !== userId;
        }
        var newList = this.state.userList.filter(isUserHasId);
        this.setState({userList: newList});
    };

    registration = (name, email, password, nameValidity, emailValidity, passwordValidity) => {
        if (nameValidity && emailValidity && passwordValidity) {
            axios.post('http://localhost:8080/registration', { userName: name, userEmail: email, password: password })
                .then((response) => {
                    this.setState({userList: response.data})
                }).catch(error => console.log("Error occurred: " + error));
        } else {
            this.openInputErrorSnack();
        }

    };

    deleteUser = (userId) => {
        axios.get('http://localhost:8080/delete_user/' + userId)
            .then((response) => {
                console.log(response);
            }).catch(error => console.log("Error occurred: " + error));
        this.refreshUserList();
        this.openDeleteSnack();
    };

    openDeleteSnack = () => {
        this.setState({snackDeleteOpen: true});
        setTimeout(function() { this.setState({snackDeleteOpen: false}); }.bind(this), 3000);
    };

    openInputErrorSnack = () => {
        this.setState({snackInputErrorOpen: true});
        setTimeout(function() { this.setState({snackInputErrorOpen: false}); }.bind(this), 3000);
    };

    render () {
        return (
            <MiniUserContext.Provider value = {
                {
                    userName: this.state.userName,
                    isLoggedIn: this.state.isLoggedIn,
                    userRole: this.state.userRole,
                    userList: this.state.userList,
                    snackDeleteOpen: this.state.snackDeleteOpen,
                    snackInputErrorOpen: this.state.snackInputErrorOpen,
                    registration: this.registration,
                    deleteUser: this.deleteUser,
                    refreshUserList: this.refreshUserList,
                    logIn: this.logIn,
                    logOut: this.logOut
                }
            }>
                {this.props.children}
            </MiniUserContext.Provider>
        )
    }
}

export const MiniUserConsumer = MiniUserContext.Consumer;