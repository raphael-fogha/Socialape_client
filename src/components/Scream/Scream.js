import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
import DeleteScream from './DeleteScream';
import ScreamDialog from './ScreamDialog';
import LikeButton from './LikeButton';
//MUI
import{ withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
//Icon
import ChatIcon from '@material-ui/icons/Chat';


const styles = {
    card: {
        display:'flex',
        marginBottom: 20,
    },
    image:{
        minWidth: 200,

    },
    content:{
        padding: 25,
        objectFit:'cover'
    }
}

class Scream extends Component {

    render() {
        dayjs.extend(relativeTime);
        const { 
            classes, 
            scream: {body, createdAt, userHandle, userImage, screamId, likeCount, commentCount}} = this.props;
        const {authenticated, credentials:{handle}} = this.props.user;    
        const deleteButton = authenticated && userHandle === handle ? (
            <DeleteScream screamId={screamId}/>
        ) : null
        return (
            <Card className={classes.card}>
                <CardMedia
                    image={userImage}
                    title="Profile image"
                    className={classes.image}/>
                    <CardContent className={classes.content}>
                        <Typography variant="h5" component={Link} to={`/user/${userHandle}`} color="primary">{userHandle}</Typography>
                        <Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
                        <Typography variant="body1">{body}</Typography>
                        <LikeButton screamId={screamId}/>
                        <span>{likeCount} Likes</span>
                        <MyButton
                            tip="Commentez">
                            <ChatIcon color="primary"/>
                        </MyButton>
                        <span>{commentCount} Commentaires</span>
                        {deleteButton}
                        <ScreamDialog 
                            screamId={screamId}
                            userHandle={userHandle}
                            openDialog={this.props.openDialog}/>
                    </CardContent>
            </Card>
        )
    }
}


  Scream.propTypes = {
    user: PropTypes.object.isRequired,
    scream: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    openDialog: PropTypes.bool
  };

  const mapStateToProps = (state) => ({
      user: state.user
  })
  
export default connect(mapStateToProps)(withStyles(styles)(Scream));

