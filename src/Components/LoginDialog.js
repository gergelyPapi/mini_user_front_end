import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {MiniUserConsumer} from "../Storage/MiniUserProvider";
import TextField from "@material-ui/core/es/TextField/TextField";

class LoginDialog extends React.Component {
    state = {
        open: false,
        userName: null,
        password: null,
        userNameValid: false,
        passwordValid: false
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    updateUsername = (event) => {
        this.state.userName = event.target.value;
        this.validateField("userName", event.target.value)
    };

    updatePassword = (event) => {
        this.state.password = event.target.value;
        this.validateField("password", event.target.value)
    };

    validateField(fieldName, value) {
        switch(fieldName) {
            case 'userName':
                this.state.userNameValid = value.length >= 3;
                break;
            case 'password':
                this.state.passwordValid = value.length >= 3;
                break;
            default:
                break;
        }
    }

    render() {

        return (
            <MiniUserConsumer>
                {(value) => {
                    const { logIn } = value;

                    return (
                        <div>
                            <Button onClick={this.handleClickOpen}>Login</Button>
                            <Dialog
                                open={this.state.open}
                                onClose={this.handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                            <DialogTitle id="alert-dialog-title">Login</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Please enter your credentials
                                </DialogContentText>
                                <TextField
                                    autoFocus
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
                                    id="pw"
                                    label="Password"
                                    type="password"
                                    fullWidth
                                    placeholder="Enter your Password"
                                    onKeyUp={(event) => this.updatePassword(event)}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.handleClose} color="secondary">
                                    Cancel
                                </Button>
                                <Button color={'primary'}
                                        onClick={() => {
                                            logIn(this.state.userName, this.state.password);
                                            }
                                        }>
                                    Login
                                </Button>
                            </DialogActions>
                            </Dialog>
                        </div>
                    )
                }}
            </MiniUserConsumer>
        );
    }
}

export default LoginDialog;
