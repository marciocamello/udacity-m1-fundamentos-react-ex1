import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';

let openAlertFn;

const styles = theme => ({
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: theme.palette.primary.dark,
    },
    warning: {
        backgroundColor: amber[700],
    },
});

class Alert extends React.Component {

    state = {
        open: false,
        message: '',
        color: 'error',
    };

    componentDidMount() {
        openAlertFn = this.openAlert;
    }

    openAlert = ({ message, color }) => {
        this.setState({
            open: true,
            message,
            color,
        });
    };

    handleAlertClose = () => {
        this.setState({
            open: false,
            message: '',
            color: 'error',
        });
    };

    render() {

        const { classes } = this.props;

        const message = (
            <span
                id="snackbar-message-id"
                dangerouslySetInnerHTML={{ __html: this.state.message }}
            />
        );

        return (
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
                message={message}
                autoHideDuration={3000}
                onClose={this.handleClose}
                open={this.state.open}
                ContentProps={{
                    'aria-describedby': 'message-id',
                    classes: {
                        root: classes[this.state.color]
                    }
                }}
                action={[
                    <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        className={classes.close}
                        onClick={this.handleAlertClose}
                    >
                        <CloseIcon />
                    </IconButton>,
                ]}
            />
        );
    }
}

Alert.propTypes = {
    classes: PropTypes.object.isRequired,
};

export function openAlert({ message, color }) {
    openAlertFn({ message, color });
}

export default withStyles(styles)(Alert);
