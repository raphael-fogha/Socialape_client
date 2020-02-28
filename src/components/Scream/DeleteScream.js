import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
import {connect} from 'react-redux';
import {deleteScream} from '../../redux/actions/dataActions';
//MUI
import{ withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteOutline from '@material-ui/icons/DeleteOutline';

const styles = {

}

 class DeleteScream extends Component {
     state = {
         open: false
     };

     handleOpen = () => {
         this.setState({open:true})
     };
     handleClose = () => {
         this.setState({open:false})
     };
     deleteScream = () => {
         this.props.deleteScream(this.props.screamId);
         this.setState({open:false});

     };
    render() {
        const {classes} = this.props;
        return (
            <Fragment>
                <MyButton 
                    tip="Supprimer le scream"
                    onClick={this.handleOpen}
                    btnClassName={classes.deleteButton}
                    >
                    <DeleteOutline color="secondary"/>
                </MyButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth="true"
                    maxWidth="sm">
                     <DialogTitle>
                         Voulez-vous vraiment supprimer ce scream ?
                     </DialogTitle>
                     <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Annuler
                        </Button> 
                        <Button onClick={this.deleteScream} color="secondary">
                            Supprimer
                        </Button> 
                     </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

DeleteScream.propTypes = {
    deleteScream: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired
}

const mapDispatchToProps = (dispatch) => {
    return{
        deleteScream: (screamId) => dispatch(deleteScream(screamId))
    }
}

export default connect(null, mapDispatchToProps)(withStyles(styles)(DeleteScream));
