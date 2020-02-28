import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {editUserDetails} from '../../redux/actions/userActions';
import MyButton from '../../util/MyButton';
//MUI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

//Icons
import EditIcon from '@material-ui/icons/Edit';

const styles = {
    form: {
        textAlign: "center"
    },
    image:{
        margin: "20px auto 20px auto"
    },
    pageTitle:{
        margin: "10px auto 10px auto"
    },
    textField:{
        margin: "10px auto 10px auto"
    },
    customError:{
        color: "red",
        fontSize:'0.8rem',
        marginTop: "10px"
    },
    button:{
        marginTop: 10,
        position:"relative",
        float: "right"
    },
    progress:{
        position:"absolute",
    }
}
 

class EditDetails extends Component {

    state = {
        bio: "",
        website: "",
        location: "",
        open: false
    };

    mapUserDetailsToState = (credentials) => {
        this.setState({
            bio: credentials.bio ? credentials.bio : "",
            website: credentials.website ? credentials.website : "",
            location: credentials.location ? credentials.location : ""
        });    
};

    handleOpen = () => {
        this.setState({open: true});
        this.mapUserDetailsToState(this.props.credentials);

    }

    handleClose = () => {
        this.setState({open:false})
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = () => {
        const userDetails = {
            bio: this.state.bio,
            website: this.state.website,
            location: this.state.location
        }

        this.props.editUserDetails(userDetails);
        this.handleClose();
    }
    
    componentDidMount(){
        const {credentials} = this.props;
        this.mapUserDetailsToState(credentials);
    }

   
  
    render() {
        const {classes} = this.props;
        return (
            <Fragment> 
               <MyButton 
                tip="Modifier vos informations"
                onClick={this.handleOpen}
                btnClassName={classes.button}>
                    <EditIcon color="primary"/>
                </MyButton>

               <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                fullWidth="true"
                maxWidth="sm">
                    <DialogTitle>Modifier vos informations</DialogTitle>
                     <DialogContent>
                         <form>
                             <TextField
                                name="bio"
                                type="text"
                                label="Bio"
                                multiline
                                rows="3"
                                placeholder="Décrivez-vous en quelques mots ;)"
                                className={classes.textField}
                                value={this.state.bio}
                                onChange={this.handleChange}
                                fullWidth="true"/>
                             <TextField
                                name="website"
                                type="text"
                                label="Website"
                                placeholder="Avez-vous un site web ?"
                                className={classes.textField}
                                value={this.state.website}
                                onChange={this.handleChange}
                                fullWidth="true"/>
                             <TextField
                                name="location"
                                type="text"
                                label="Location"
                                placeholder="Ou habitez-vous ?"
                                className={classes.textField}
                                value={this.state.location}
                                onChange={this.handleChange}
                                fullWidth="true"/>
                         </form>
                     </DialogContent>
                     <DialogActions>
                         <Button onClick={this.handleClose} color="primary">
                             Fermer
                         </Button>
                         <Button onClick={this.handleSubmit} color="primary">
                             Enregistrer
                         </Button>
                     </DialogActions>
                </Dialog>

            </Fragment>
        )
    }
}

EditDetails.propTypes = {
    editUserDetails: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    credentials: PropTypes.object.isRequired

}

const mapStateToProps = (state) => ({
    credentials: state.user.credentials
  })
  
  const mapDispatchToProps = (dispatch) => {
    return{
      editUserDetails: (userDetails) => dispatch(editUserDetails(userDetails))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EditDetails));
