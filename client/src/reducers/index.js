import { combineReducers } from 'redux';
import { goals, goalsLoading, goalsErrored } from './goals';

export default combineReducers({
    goals, goalsLoading, goalsErrored
});