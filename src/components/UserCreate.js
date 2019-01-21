import React, {Component} from 'react';

import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Chip from '@material-ui/core/Chip';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

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
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: theme.spacing.unit / 4,
    }
});

class UserCreate extends Component {

    constructor(props) {
        super(props);
        this.firstNameEl = React.createRef();
        this.lastNameEl = React.createRef();
        this.listGames = React.createRef();
        this.state = {
            listGames: [],
            validateForm: true
        }
    }

    handleChange = event => {
        this.setState({ listGames: event.target.value });
    };

    // start create user handle
    onCreateUser = event => {
        event.preventDefault();

        const firstName = this.firstNameEl.current.value;
        const lastName = this.lastNameEl.current.value;
        const listGames = this.state.listGames;

        this.props.onCreateUser(event,{
            firstName,
            lastName,
            listGames
        });

        this.firstNameEl.current.value = '';
        this.lastNameEl.current.value = '';
        this.setState({ listGames: [] });

        this.validateForm();
    };

    // validate inputs in form
    validateForm = () => {
        const validateInputs = this.firstNameEl.current.value.trim().length > 0 && this.lastNameEl.current.value.trim().length > 0;
        this.setState({ validateForm: !validateInputs })
    };

    render() {

        // games
        const games = [
            'God of War 4',
            'Red Dead Redemption 2',
            'Assassin\'s Creed Odyssey',
            'Sea of Thieves',
            'No Man\'s Sky',
            'State Of Decay 2',
            'Mortal Kombat X',
            'Forza Horizon 4',
            'Days Gone'
        ];

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
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="listGames">Games List</InputLabel>
                            <Select
                                multiple
                                value={this.state.listGames}
                                onChange={this.handleChange}
                                input={<Input id="listGames" />}
                                renderValue={selected => (
                                    <div className={classes.chips}>
                                        {selected.map(value => (
                                            <Chip key={value} label={value} className={classes.chip} />
                                        ))}
                                    </div>
                                )}
                            >
                                {games.map(name => (
                                    <MenuItem key={name} value={name}>
                                        {name}
                                    </MenuItem>
                                ))}
                            </Select>
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
