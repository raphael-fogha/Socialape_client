import React, { Component } from 'react'
import MyButton from '../../util/MyButton';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// Icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
// Redux
import { connect } from 'react-redux';
import { likeScream, unlikeScream } from '../../redux/actions/dataActions';

export class LikeButton extends Component {
    
/*likedScream = () => {
    let result;
    if(this.props.user.likes && this.props.user.likes.find((like) => like.screamId === this.props.screamId ))
    {return true}
    else {return false}

};*/
likedScream = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        (like) => like.screamId === this.props.screamId
      )
    )
      return true;
    else return false;
  };

likeScream = () => {
    this.props.likeScream(this.props.screamId);
}
unlikeScream = () => {
    this.props.unlikeScream(this.props.screamId);
}
    render() {
        const {authenticated} = this.props.user;
        const likeButton = !authenticated ? (
          <Link to="/login">
            <MyButton tip="J'aime">
                   <FavoriteBorder color="primary"/>         
            </MyButton>
          </Link>
        ) : 
            this.likedScream() ? (
                <MyButton tip="Je n'aime plus" onClick={this.unlikeScream}>
                   <FavoriteIcon color="primary"/> 
            </MyButton>
            ) : (     
                    <MyButton tip="J'aime" onClick={this.likeScream}>
                       <FavoriteBorder color="primary"/> 
                </MyButton>
         
        );
        return likeButton
    }
}

LikeButton.propTypes = {
    likeScream: PropTypes.func.isRequired,
    unlikeScream: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired
  };

  const mapStateToProps = (state) => ({
      user: state.user
  })
  
  const mapDispatchToProps = (dispatch) =>{
      return{
        likeScream: (screamId) => dispatch(likeScream(screamId)),
        unlikeScream: (screamId) => dispatch(unlikeScream(screamId))

      }
  }
export default connect(mapStateToProps, mapDispatchToProps)(LikeButton);
