import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {postScream, clearErrors} from '../../redux/actions/dataActions';
import MyButton from '../../util/MyButton';
//MUI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
//Icons
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

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
    /*textField:{
        margin: "10px auto 10px auto"
    }*/
    customError:{
        color: "red",
        fontSize:'0.8rem',
        marginTop: "10px"
    },
    button:{
        marginTop: 10,
        position:"relative"
    },
    progress:{
        position:"absolute",
        //left:'90%',
        //top:'10%'
    },
    submitButton:{
        position: 'relative',
        float: 'right',
        marginTop: 5
    },
    closeButton:{
        position:"absolute",
        left:'91%',
        top:'6%'
    }
}

class PostScream extends Component {
    state = {
        open: false,
        body:"",
        errors:{}
    };
    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({
                errors: nextProps.UI.errors
            });
        };
        if(!nextProps.UI.errors && !nextProps.UI.loading){
            this.setState({
                body : '',
                open: false,
                errors:{}
            });
        }
    }
    handleOpen = () => {
        this.setState({open: true});

    }

    handleClose = () => {
        this.props.clearErrors();
        this.setState({
            open:false,
            errors:{}
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        this.props.postScream({body: this.state.body})
    }

    render(){
        const {errors} = this.state;
        const {classes, UI:{loading}} =this.props;

        return (
            <Fragment>
                <MyButton onClick={this.handleOpen} tip="Postez un scream !">
                    <AddIcon/>
                </MyButton>
                <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                fullWidth="true"
                maxWidth="sm">
                    <MyButton 
                        tip="Annuler" 
                        onClick={this.handleClose}
                        tipClassName={classes.closeButton}>
                            <CloseIcon/>
                    </MyButton>
                    <DialogTitle>
                       Postez un nouveau scream ! 
                    </DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.handleSubmit}>
                            <TextField
                                name="body"
                                type="text"
                                label="SCREAM !!"
                                multiline
                                rows="3"
                                placeholder="Exscreamer vous !"
                                error={errors.body ? true : false}
                                helperText={errors.body}
                                className={classes.textField} 
                                onChange={this.handleChange}
                                fullWidth="true"/>
                                <br></br>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className={classes.submitButton}
                                    disabled={loading}>
                                        Poster
                                        {loading && <CircularProgress 
                                            className={classes.progress}
                                            size={30}/>}

                                </Button>

                        </form>
                    </DialogContent>
                </Dialog>
            </Fragment>
            )
        
        
    }
}

PostScream.propTypes = {
    postScream: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) =>({
    UI: state.UI
});

const mapDispatchToProps = (dispatch) =>{
    return {
        postScream: (newScream) => dispatch(postScream(newScream)),
        clearErrors: () => dispatch(clearErrors())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PostScream));
