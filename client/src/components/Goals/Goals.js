import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getGoals } from '../../actions/goals';
import TrackGoal from './TrackGoal'
import Loading from '../App/Loading'
class App extends Component{
    constructor(props){
        super(props)
        this.state = {
            done: true,
            isLoading: true
        }
    }
    componentWillMount() {
        const { getAccessToken } = this.props.auth;
        const token = getAccessToken();
        this.props.fetchData(token);
    }
    done(loading){
        this.setState({ isLoading: loading })
        setTimeout(() => {this.setState({ done: loading })},2000)
    }
    componentDidUpdate(){
        if(this.props.isLoading !== this.state.isLoading)
            this.done(this.props.isLoading)
    }
    render(){
        const error = this.props.hasErrored;
        const loading = this.props.isLoading;
        return(
            <div className="row mt-5">
                <div className="col-md-8 offset-md-1">
                    <h2>Goals</h2>
                    {error && <p>Sorry! There was an error loading the items</p>}
                    {(!error && !loading) && <TrackGoal auth={this.props.auth} />}
                    {this.state.done && <Loading in={loading} />}
                </div>
            </div>
        );
    }
}
App.propTypes = {
    // fetchData: PropTypes.function.isRequired,
    // items: PropTypes.array.isRequired,
    // hasErrored: PropTypes.bool.isRequired,
    // isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
    return {
        user: state.user,
        hasErrored: state.goalsErrored,
        isLoading: state.goalsLoading
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (user) => dispatch(getGoals(user))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);