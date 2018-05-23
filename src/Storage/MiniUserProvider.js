import React, { Component } from 'react';
import axios from 'axios'

const MiniUserContext = React.createContext();

export class MiniUserProvider extends Component {
    state = {
        userName: null,
        isLoggedIn: false,
        userRole: null,
        userList: []
    };

    componentWillMount () {
        axios.get('http://localhost:8080/users')
            .then((response) => {
                if (response.status === 200) {
                    this.setState({userList: response.data})
                } else {
                    console.log("Other than 200 status code")
                }
            }).catch(error => console.log(error));
    }

    logIn = (name, password) => {
        this.setState (
            {userName: "Admin",
                isLoggedIn: true,
                userRole: "Admin"
            });
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

    registration = (name, email, password) => {
        axios.post('http://localhost:8080/user/registration', { userName: name, userEmail: email, password: password })
            .then((response) => {
                if (response.status === 200) {
                    this.setState({userList: response.data})
                } else {
                    console.log("BAD BAD BAD")
                }
            }).catch(error => console.log("Error happened" + error));
    };

    deleteUser = (userId) => {
        axios.get('http://localhost:8080/delete_user/' + userId)
            .then((response) => {
                if (response.status === 200) {
                    console.log(response);
                } else {
                    console.log("BAD BAD BAD")
                }
            }).catch(error => console.log("Error happened" + error));
        this.refreshUserList();
    };


    render () {
        return (
            <MiniUserContext.Provider value = {
                {
                    userName: this.state.userName,
                    isLoggedIn: this.state.isLoggedIn,
                    userRole: this.state.userRole,
                    userList: this.state.userList,
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