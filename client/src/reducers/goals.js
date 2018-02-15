import { GOALS_GET, GOALS_SET, GOALS_DONE, GOALS_DELETE, GOALS_ERROR, GOALS_LOADING, LOGS_ADD, LOGS_EDIT } from "../constants/action-types";

export function goalsErrored(state = false, action) {
    switch (action.type) {
        case GOALS_ERROR:
            return action.hasErrored;
        default:
            return state;
    }
}

export function goalsLoading(state = false, action) {
    switch (action.type) {
        case GOALS_LOADING:
            return action.isLoading;
        default:
            return state;
    }
}

export function goals(state = [], action) {
    switch (action.type) {
        case GOALS_GET:
            return action.goals
        case GOALS_SET:
            return [...state, action.goal]
        case GOALS_DELETE:
            return state.filter(goal => (goal._id !== action.goal._id));
        case GOALS_DONE:
            return state.map(goal => {
                if (goal._id === action.goal._id)
                    goal.completed = action.goal.completed;
                return goal
            });
        case LOGS_ADD:
            return state.map(goal => {
                if (goal._id === action.goal){
                    goal.logs = [...goal.logs, action.log]
                    return goal
                }
                return goal
            });
        case LOGS_EDIT:
            return state.map(goal => {
                if (goal._id === action.goal){
                    goal.logs = goal.logs.map(log => {
                        if (log.day === action.log.day-1){
                            log.details = action.log.details
                            log.link = action.log.link
                            return log
                        }
                        return log
                    })
                }
                return goal
            });
        default:
            return state;
    }
}