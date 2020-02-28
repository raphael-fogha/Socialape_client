import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import AppIcon from '../images/icon.png';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress';

//Redux 
import {connect} from 'react-redux'
import {signupUser} from '../redux/actions/userActions';


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
        position:"relative"
    },
    progress:{
        position:"absolute",
    }
}


class SignUp extends Component {
    constructor(){
        super();
        this.state = {
            email:"",
            password:"",
            confirmPassword:"",
            handle:"",
            errors:{}
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({errors: nextProps.UI.errors});
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle
        }
        this.props.signupUser(newUserData, this.props.history);

    }

    handleChange = (e) => {
       this.setState({
           [e.target.name]: e.target.value
       }) 
    }

    render() {
        const { classes, UI:{loading} } = this.props;
        const  { errors } = this.state;
        return (
            <Grid container className={classes.form}>
                <Grid item sm />
                <Grid item sm>
                    <img src={AppIcon} alt="ape" className={classes.image}/>
                    <Typography variant="h3" className={classes.pageTitle}>
                        Inscription
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField
                             id="email"
                             name="email"
                             type="email"
                             label="Email"
                             value={this.state.email}
                             onChange={this.handleChange}
                             className={classes.textField}
                             helperText={errors.email}
                             error={errors.email ? true : false}
                             fullWidth="true"/><br></br>
                        <TextField
                             id="password"
                             name="password"
                             type="password"
                             label="Mot de passe"
                             value={this.state.password}
                             onChange={this.handleChange}
                             className={classes.textField}
                             helperText={errors.password}
                             error={errors.password ? true : false}
                             fullWidth="true"/><br></br>
                        <TextField
                             id="confirmPassword"
                             name="confirmPassword"
                             type="password"
                             label="Confirmez mot de passe"
                             value={this.state.confirmPassword}
                             onChange={this.handleChange}
                             className={classes.textField}
                             helperText={errors.confirmPassword}
                             error={errors.confirmPassword ? true : false}
                             fullWidth="true"/><br></br>
                        <TextField
                             id="handle"
                             name="handle"
                             type="text"
                             label="Pseudo"
                             value={this.state.handle}
                             onChange={this.handleChange}
                             className={classes.textField}
                             helperText={errors.handle}
                             error={errors.handle ? true : false}
                             fullWidth="true"/><br></br>

                             {errors.general && (
                                 <Typography
                                    variant="body2"
                                    className={classes.customError}>
                                        {errors.general}
                                    </Typography>
                             )}
                        <Button 
                            type='submit'
                            variant="contained"
                            color="primary"
                            disabled={loading}
                            className={classes.button}>
                                Sign up
                            {loading && <CircularProgress 
                                            className={classes.progress}
                                            size={30}/>}
                         </Button>
                         <br/>
                         <small>Already have an account ? Sign in to <Link to="/login">here</Link></small>    
                    </form>
                </Grid>
                <Grid item sm />

            </Grid>
        )
    }
}

SignUp.propTypes = {
    classes: PropTypes.object.isRequired,
    signupUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    user : state.user,
    UI: state.UI
});

const mapDispatchToProps = (dispatch) => {
    return {
        signupUser: (newUserData, history) => dispatch(signupUser(newUserData, history))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(SignUp));
