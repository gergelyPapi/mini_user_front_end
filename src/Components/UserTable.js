import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/es/Button/Button";
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
});

class UserTable extends React.Component {

    render() {
        return (
            <MiniUserConsumer>
                {(value) => {
                    const { deleteUser, userList, refreshUserList} = value;

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
                                    {userList.map(user => {
                                        return (
                                            <TableRow key={user.id} style={styles.text}>
                                                <TableCell component="th" scope="row">
                                                    {user.id}
                                                </TableCell>
                                                <TableCell>{user.userName}</TableCell>
                                                <TableCell>{user.userEmail}</TableCell>
                                                <TableCell>
                                                    <Button color="primary"
                                                            onClick={ () => {
                                                                deleteUser(user.id);
                                                                refreshUserList(user.id);
                                                            }}>
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


