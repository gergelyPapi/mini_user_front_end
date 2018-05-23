import React, { Component } from 'react';
import axios from 'axios'

const MiniUserContext = React.createContext();

export class MiniUserProvider extends Component {
    state = {
        userName: null,
        isLoggedIn: false
    };

    logIn = (name, password) => {
        this.setState (
            {userName: "Admin",
                isLoggedIn: true
            });
        console.log(this.state.isLoggedIn)
    };

    logOut = () => {
        this.setState (
            {userName: null,
                isLoggedIn: false
            });
    };

    registration = (name, email, password) => {
        axios.post('http://localhost:8080/user/registration', { userName: name, email: email, password: password })
            .then((response) => {
                if (response.status === 200) {
                    console.log(response);
                    this.setState ({userName: response.data.userName});
                } else {
                    console.log("BAD BAD BAD")
                }
            }).catch(error => console.log("Error happened" + error));
    };



    render () {
        return (
            <MiniUserContext.Provider value = {
                {
                    userName: this.state.userName,
                    isLoggedIn: this.state.isLoggedIn,
                    registration: this.registration,
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