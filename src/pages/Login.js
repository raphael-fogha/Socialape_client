import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import AppIcon from '../images/icon.png';

//Material UI
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress';

//Redux 
import {connect} from 'react-redux'
import {loginUser} from '../redux/actions/userActions';

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




class Login extends Component {
    constructor(){
        super();
        this.state = {
            email:"",
            password:"",
            errors:{}
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
        this.setState({errors: nextProps.UI.errors});}
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginUser(userData, this.props.history);
       

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
                        Connexion
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
                             fullwidth="true"/><br></br>
                        <TextField
                             id="password"
                             name="password"
                             type="password"
                             label="Password"
                             value={this.state.password}
                             onChange={this.handleChange}
                             className={classes.textField}
                             helperText={errors.password}
                             error={errors.password ? true : false}
                             fullwidth="true"/><br></br>

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
                                Login
                            {loading && <CircularProgress 
                                            className={classes.progress}
                                            size={30}/>}
                         </Button>
                         <br/>
                         <small>Don't have an account ? Sign up to <Link to="/signup">here</Link></small>    
                    </form>
                </Grid>
                <Grid item sm />

            </Grid>
        )
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired

}

const mapStateToProps = (state) =>({
    user: state.user ,
    UI: state.UI
});

const mapDispatchToProps = (dispatch) =>{
    return {
        loginUser: (userData,history) => dispatch(loginUser(userData, history))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login));
