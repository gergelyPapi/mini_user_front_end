import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/es/Button/Button";
import axios from "axios/index";
import {MiniUserConsumer} from "../Storage/MiniUserProvider";

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    text: {
        textAlign: 'center'
    }
})

class UserTable extends React.Component {
    constructor () {
        super();
        this.state = {
            userList: []
        }
    }

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

    deleteEventFunction(userId) {
        function isUserHasId(user) {
            return user.id !== userId;
        }
        var newList = this.state.userList.filter(isUserHasId);
        this.setState({userList: newList});
    }

    render() {
        return (
            <MiniUserConsumer>
                {(value) => {
                    const { deleteUser } = value;

                    return (
                        <Paper>
                            <Table>
                                <TableHead>
                                    <TableRow style={styles.text}>
                                        <TableCell>User Id</TableCell>
                                        <TableCell>User Name</TableCell>
                                        <TableCell>User E-mail Address</TableCell>
                                        <TableCell>Delete</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody >
                                    {this.state.userList.map(user => {
                                        return (
                                            <TableRow key={user.id} style={styles.text}>
                                                <TableCell component="th" scope="row">
                                                    {user.id}
                                                </TableCell>
                                                <TableCell>{user.userName}</TableCell>
                                                <TableCell>{user.userEmail}</TableCell>
                                                <TableCell>
                                                    <Button color="primary"
                                                            onClick={ (event) => {
                                                                deleteUser(user.id);
                                                                this.deleteEventFunction(user.id); }}>
                                                        Delete User
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>

                        </Paper>
                    )
                }}
            </MiniUserConsumer>
        );
    }
}

export default UserTable;


