import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import UserTable from "./UserTable";
import RegistrationForm from "./RegistrationForm";
import {MiniUserConsumer} from "../Storage/MiniUserProvider";
import Paper from "@material-ui/core/es/Paper/Paper";

function TabContainer({ children, dir }) {
    return (
        <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
            {children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
    dir: PropTypes.string.isRequired,
};

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: '100%',
        margin: 'auto'
    },
});

class AdminActionTabs extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleChangeIndex = index => {
        this.setState({ value: index });
    };

    render() {
        const { classes, theme } = this.props;

        return (
            <MiniUserConsumer>
                {(value) => {
                    const { isLoggedIn, userRole } = value;

                    return isLoggedIn && userRole === 'Admin' ? (
                        <div className={classes.root}>
                            <AppBar position="static" color="default">
                                <Tabs
                                    value={this.state.value}
                                    onChange={this.handleChange}
                                    indicatorColor="secondary"
                                    textColor="secondary"
                                    fullWidth
                                    centered
                                >
                                    <Tab label="User List" />
                                    <Tab label="User Registration" />
                                </Tabs>
                            </AppBar>
                            <SwipeableViews
                                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                                index={this.state.value}
                                onChangeIndex={this.handleChangeIndex}
                            >
                                <TabContainer dir={theme.direction}><UserTable/></TabContainer>
                                <TabContainer dir={theme.direction}><RegistrationForm/></TabContainer>
                            </SwipeableViews>
                        </div>
                    ) : (
                        <Paper> Site is under construction please visit back later!</Paper>
                    )
                }}
            </MiniUserConsumer>
        );
    }
}

AdminActionTabs.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(AdminActionTabs);
