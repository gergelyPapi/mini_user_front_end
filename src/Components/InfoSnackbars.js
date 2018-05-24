import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import {MiniUserConsumer} from "../Storage/MiniUserProvider";

const styles = theme => ({
    close: {
        width: theme.spacing.unit * 4,
        height: theme.spacing.unit * 4,
    },
});

class InfoSnackbars extends React.Component {

    render() {
        return (
            <MiniUserConsumer>
                {(value) => {
                    const { snackDeleteOpen, snackInputErrorOpen } = value;

                    if( snackDeleteOpen) {
                        return (

                            <div>
                                <Snackbar
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'center',
                                    }}
                                    open={snackDeleteOpen}
                                    autoHideDuration={2000}
                                    ContentProps={{
                                        'aria-describedby': 'message-id',
                                    }}
                                    message={<span id="message-id">User successfully deleted</span>}
                                />
                            </div>
                        )
                    } else if (snackInputErrorOpen){
                        return (

                            <div>
                                <Snackbar
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'center',
                                    }}
                                    open={snackInputErrorOpen}
                                    autoHideDuration={2000}
                                    ContentProps={{
                                        'aria-describedby': 'message-id',
                                    }}
                                    message={<span id="message-id">Inputs were not correct please try again!</span>}
                                />
                            </div>
                        )
                    } else {
                        return null;
                    }
                }}
            </MiniUserConsumer>
        );
    }
}

InfoSnackbars.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InfoSnackbars);