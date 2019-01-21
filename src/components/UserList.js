import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: '800px',
        backgroundColor: theme.palette.background.paper,
        margin: '10px auto'
    },
    inline: {
        display: 'inline',
    },
    padding: {
        padding: `0 ${theme.spacing.unit * 2}px`,
    },
    margin: {
        margin: theme.spacing.unit * 4
    },
    button: {
        margin: theme.spacing.unit,
    },
});

class UserList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            displayUserGames: false,
            listGames: [],
            userGame: null
        }
    }

    render() {

        const {classes, users, onRemoveUser} = this.props;

        const showUserGames = user => (
            this.setState(() => ({
                displayUserGames: true,
                listGames: user.games,
                userGame: user
            }))
        );

        const hideUserGames = () => (
            this.setState(() => ({
                displayUserGames: false,
                listGames: [],
                userGame: null
            }))
        );

        return (
            <div>
                {(!users || users.length > 0) && (
                    <React.Fragment>
                        <h1>Show Users</h1>
                        <List className={classes.root}>
                            {users.map(user => {

                                    const userName = `${user.firstName} ${user.lastName}`;

                                    return <ListItem alignItems="flex-start" key={user.id}>
                                        <ListItemAvatar>
                                            <Avatar alt={userName} src={user.avatar}/>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={userName}
                                        />
                                        <ListItemSecondaryAction>
                                            <Badge color="primary" badgeContent={user.games.length} showZero={true}
                                                   className={classes.margin}>
                                                <Typography className={classes.padding}>Games Played</Typography>
                                            </Badge>
                                            <IconButton aria-label="Show User Games" title="Show User Games"
                                                        onClick={() => showUserGames(user)}>
                                                <SearchIcon/>
                                            </IconButton>
                                            <IconButton aria-label="Remove User" title="Remove User"
                                                        onClick={() => onRemoveUser(user)}>
                                                <DeleteIcon/>
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>;
                                }
                            )}
                        </List>
                    </React.Fragment>
                )}
                {(this.state.displayUserGames) && (
                    <React.Fragment>
                        <h1>User Games from {this.state.userGame.firstName}</h1>
                        <Button variant="contained" color="secondary" className={classes.button} aria-label="Hide Game Users" title="Hide Game Users" onClick={hideUserGames}>
                            Close
                            <CloseIcon/>
                        </Button>
                        <List className={classes.root}>
                            {this.state.listGames.map(game => {
                                    return <ListItem alignItems="flex-start" key={game}>
                                        <ListItemText
                                            primary={game}
                                        />
                                    </ListItem>;
                                }
                            )}
                        </List>
                    </React.Fragment>
                )}
            </div>
        );
    }
};

UserList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserList);
