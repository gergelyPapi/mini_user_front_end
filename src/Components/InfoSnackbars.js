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
                    const { snackOpen } = value;

                    return snackOpen ? (
                        <div>
                            <Snackbar
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                open={snackOpen}
                                autoHideDuration={2000}
                                ContentProps={{
                                    'aria-describedby': 'message-id',
                                }}
                                message={<span id="message-id"> User Deleted </span>}
                            />
                        </div>
                    ) : (
                        null
                    )
                }}
            </MiniUserConsumer>
        );
    }
}

InfoSnackbars.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InfoSnackbars);