import React, {Component} from 'react';

import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        marginTop: theme.spacing.unit * 3,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});

class UserCreate extends Component {

    constructor(props) {
        super(props);
        this.firstNameEl = React.createRef();
        this.lastNameEl = React.createRef();
        this.state = {
            validateForm: true
        }
    }

    onCreateUser = event => {
        event.preventDefault();

        const firstName = this.firstNameEl.current.value;
        const lastName = this.lastNameEl.current.value;

        this.props.onCreateUser(event, firstName, lastName);

        this.firstNameEl.current.value = '';
        this.lastNameEl.current.value = '';
    };

    validateForm = () => {
        const validateInputs = this.firstNameEl.current.value.trim().length > 0 && this.lastNameEl.current.value.trim().length > 0;
        this.setState({ validateForm: !validateInputs })
    };

    render() {

        const {classes} = this.props;

        return (
            <main className={classes.main} >
                <CssBaseline/>
                <Paper className={classes.paper} elevation={0} square={false}>
                    <h1>Create User</h1>
                    <form className={classes.form} onSubmit={this.onCreateUser} onChange={this.validateForm}>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="firstName">First Name</InputLabel>
                            <Input id="firstName" name="firstName" autoFocus inputRef={this.firstNameEl}/>
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="lastName">Last Name</InputLabel>
                            <Input name="lastName" id="lastName" inputRef={this.lastNameEl}/>
                        </FormControl>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            disabled={this.state.validateForm}
                            className={classes.submit}
                        >
                            Save
                        </Button>
                    </form>
                </Paper>
            </main>
        )
    }
}

UserCreate.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UserCreate);
