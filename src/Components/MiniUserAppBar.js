import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/es/Button/Button";
import {MiniUserConsumer} from "../Storage/MiniUserProvider";
import RegistrationDialog from "./RegistrationDialog"

const styles = {
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

const appBarContent = (
    <MiniUserConsumer>
        {(value) => {
            const { userName, isLoggedIn, logIn, logOut, userRole } = value;

            return isLoggedIn ? (
                <React.Fragment>
                    {"Welcome " + userName + " | Your role is: " + userRole}
                    <RegistrationDialog/>
                    <Button variant="raised" onClick={logOut}>Logout</Button>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Button onClick={logIn}>Login</Button>
                </React.Fragment>
            )
        }}
    </MiniUserConsumer>
);


function MiniUserAppBar(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="title" color="inherit" className={classes.flex}>
                        Mini User Application
                    </Typography>
                    {appBarContent}
                </Toolbar>
            </AppBar>
        </div>
    );
}

MiniUserAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MiniUserAppBar);