import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {MiniUserConsumer} from "../Storage/MiniUserProvider";
import Paper from "@material-ui/core/es/Paper/Paper";

const style = {
    formAreaStyle: {
        margin: 'auto',
        width: '50%',
    }
};

export default class RegistrationForm extends React.Component {
    constructor(props) {
        super();
        this.state = {
            userName: '',
            email:'',
            password: '',
            userNameValid: null,
            eMailValid: null,
            passwordValid: null,
        };
    }

    updateUsername = (event) => {
        this.state.userName = event.target.value;
    };

    updateEmail = (event) => {
        this.state.email = event.target.value;
    };

    updatePassword = (event) => {
        this.state.password = event.target.value;
    };

    validateField(fieldName, value) {
        switch(fieldName) {
            case 'userName':
                this.state.userNameValid = value.length >= 10;
                break;
            case 'email':
                let validationArray = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                try {
                    if(validationArray) {
                        this.state.emailValid = true;
                    } else {
                        this.state.emailValid = false;
                    }
                }
                catch(err) {
                    console.log(err.message);
                    this.state.emailValid = false;
                }
                break;
            case 'password':
                this.state.passwordValid = value.length > 4;
                break;

            default:
                break;
        }
    }

    render() {
        return (
            <MiniUserConsumer>
                {(value) => {
                    const { registration } = value;

                    return (
                        <div style={style.formAreaStyle}>
                            <Paper>
                                <div className={"TextFieldArea"}>
                                    <TextField
                                        margin="dense"
                                        id="name"
                                        label="Username"
                                        type="username"
                                        fullWidth
                                        placeholder="Enter your Username"
                                        onKeyUp={(event) => this.updateUsername(event)}
                                    />
                                    <TextField
                                        margin="dense"
                                        id="name"
                                        label="Email"
                                        type="email"
                                        fullWidth
                                        placeholder="Enter your E-mail address"
                                        onKeyUp={(event) => this.updateEmail(event)}
                                    />
                                    <TextField
                                        margin="dense"
                                        id="pw"
                                        label="Password"
                                        type="password"
                                        fullWidth
                                        placeholder="Enter your Password"
                                        onKeyUp={(event) => this.updatePassword(event)}
                                    />
                                </div>
                                <Button color={'primary'}
                                        onClick={() => {
                                            registration(this.state.userName, this.state.email, this.state.password)}
                                        }>
                                Registration
                                </Button>
                            </Paper>
                        </div>
                    )
                }}
            </MiniUserConsumer>
        );
    }
}
