import React from 'react';
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
import Badge from '@material-ui/core/Badge';

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
    }
});

const UserList = props => {

    const {classes, users, onRemoveUser} = props;

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
                                        <Badge color="primary" badgeContent={user.games} showZero={true} className={classes.margin}>
                                            <Typography className={classes.padding}>Games Liked</Typography>
                                        </Badge>
                                        <IconButton aria-label="Delete" onClick={() => onRemoveUser(user)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>;
                            }
                        )}
                    </List>
                </React.Fragment>
            ) }
        </div>
    );
};

UserList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserList);
