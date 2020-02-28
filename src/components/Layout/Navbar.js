import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import MyButton from '../../util/MyButton';
import PostScream from '../Scream/PostScream';
import { logoutUser } from '../../redux/actions/userActions'
import Notifications from './Notifications';
//MUI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
//Icons
import HomeIcon from '@material-ui/icons/Home';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';

export class Navbar extends Component {

    handleLogout = () => {
        this.props.logoutUser();
      }

    render() {
        const { authenticated } = this.props;
        return (
            <AppBar>
                <Toolbar className="nav-container">
                    {authenticated ? (
                        <Fragment>
                           <PostScream/>
                            <Link to="/">
                                <MyButton
                                    tip="Home">
                                    <HomeIcon />
                                </MyButton>
                            </Link>
                                <Notifications/>
                            <MyButton
                                tip="Deconnexion"
                                onClick={this.handleLogout}>
                                <KeyboardReturn color="primary" />
                            </MyButton>
                        </Fragment>
                    ) : (
                            <Fragment>
                                <Button color="inherit" component={Link} to="/login" >Connexion</Button>
                                <Button color="inherit" component={Link} to="/" >Home</Button>
                                <Button color="inherit" component={Link} to="/signup" >Rejoins-nous !</Button>
                            </Fragment>
                        )}
                </Toolbar>
            </AppBar>
        )
    }
}

Navbar.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    logoutUser: PropTypes.func.isRequired,

}

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
})

const mapDispatchToProps = (dispatch) => {
    return {
      logoutUser: () => dispatch(logoutUser())
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
