import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
// MUI stuff
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
// Icons
import NotificationsIcon from '@material-ui/icons/Notifications';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';
// Redux
import { connect } from 'react-redux';
import { markNotificationsRead } from '../../redux/actions/userActions';

 class Notifications extends Component {
     state = {
         achorEl: null
     }

     handleOpen = (e) => {
       this.setState({anchorEl: e.target});
     };

     handleClose = () =>  {
      this.setState({anchorEl: null});
    };

    onMenuOpened = () => {
      let unreadNotifIds = this.props.notifications.filter(notif => !notif.read)
                                                   .map(notif => notif.notificationId);
      this.props.markNotificationsRead(unreadNotifIds);
    }

    render() {
      const notifs = this.props.notifications;
      const anchorEl = this.state.anchorEl;
      let notifIcon;

      dayjs.extend(relativeTime);
      
      if(notifs && notifs.length > 0 ){
        notifs.filter(notif => notif.read === false).length > 0 ? (
          notifIcon = (
          <Badge
            badgeContent={notifs.filter(notif => notif.read === false).length}
            color="secondary"
            >
              <NotificationsIcon/>
            </Badge>
        )) : (
            notifIcon = <NotificationsIcon/>
        ); 
      } else {
        notifIcon = <NotificationsIcon/>
      }

      let notificationsMarkup = notifs && notifs.length > 0 ? (
        notifs.map(notif => {
          const action = notif.type === 'like' ? 'a aimé' : 'a commenté';
          const time = dayjs(notif.createdAt).fromNow();
          const iconColor = notif.read ? 'primary' : 'secondary';
          const icon = notif.type === 'like' ? (
            <FavoriteIcon 
              color={iconColor} 
              style={{marginRight:10}}/>
          ) : (
            <ChatIcon
            color={iconColor} 
            style={{marginRight:10}}/>
          )

          return (
            <MenuItem key={notif.createdAt} onClick={this.handleClose}>
              {icon}
              <Typography
                component={Link}
                color="default"
                variant="body1"
                to={`/user/${notif.recipient}/scream/${notif.screamId}`}>

                  {notif.sender} {action} votre post {/*{time}*/}
              </Typography>
            </MenuItem>
          )
        })
        ): ( 
          <MenuItem onClick={this.handleClose}>
            Vous n'avez pas de notifications
          </MenuItem>
        )
        return (
            <Fragment>
              <Tooltip 
                placement="top"
                title="Notifications">
                  <IconButton
                    aria-owns={anchorEl ? 'simple-menu' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleOpen}>
                  {notifIcon}
                  </IconButton>
              </Tooltip>
              <Menu 
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleClose}
                onEntered={this.onMenuOpened}>
                    {notificationsMarkup}
              </Menu>
            </Fragment>
        )
    }
}

Notifications.propTypes = {
    markNotificationsRead: PropTypes.func.isRequired,
    notifications: PropTypes.array.isRequired
  };
  
  const mapStateToProps = (state) => ({
    notifications: state.user.notifications
  });
  
  const mapDispatchToProps = (dispatch) => {
    return {
      markNotificationsRead : (notifsId) => dispatch(markNotificationsRead(notifsId))
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
