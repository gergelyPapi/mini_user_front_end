import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/es/Button/Button";
import {MiniUserConsumer} from "../Storage/MiniUserProvider";
import LoginDialog from "./LoginDialog";
import Paper from "@material-ui/core/es/Paper/Paper";

const styles = {
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
    }
};

const appBarContent = (
    <MiniUserConsumer>
        {(value) => {
            const { userName, isLoggedIn, logOut } = value;

            return isLoggedIn ? (
                <React.Fragment>
                    <Typography variant="title" color="secondary">
                        Welcome {userName}
                    </Typography>
                    <Button variant="raised" onClick={logOut}>Logout</Button>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <LoginDialog/>
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