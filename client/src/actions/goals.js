import { GOALS_GET, GOALS_SET, GOALS_DELETE, GOALS_LOADING, GOALS_ERROR, LOGS_ADD,LOGS_EDIT } from "../constants/action-types";

export function goalsLoading(bool) {
    return {
        type: GOALS_LOADING,
        isLoading: bool
    };
}
export function goalsErrored(bool) {
    return {
        type: GOALS_ERROR,
        hasErrored: bool
    };
}
export function setGoal(newGoal, token) {
    return (dispatch) => {
        const headers = { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json', 'Content-Type': 'application/json' };
        fetch('/api/goals', {
            method: 'POST',
            headers,
            body: JSON.stringify({ newGoal })
        })
        .then(res => res.json())
        .then(goal => {
            if (goal.goal)
                dispatch({ type: GOALS_SET, goal })
        })
    }
}
export function getGoals(token) {
    return (dispatch) => {
        dispatch(goalsLoading(true));
        const headers = { 'Authorization': `Bearer ${token}`, 'Accept-Type': 'application/json' };
        fetch('/api/goals', {
            headers
        })
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            dispatch(goalsLoading(false));
            return response;
        })
        .then((response) => response.json())
        .then((goals) => dispatch({ type: GOALS_GET, goals }))
        .catch(() => dispatch(goalsErrored(true)));
    };
}

export function goalDelete(id, token) {
    return (dispatch) => {
        const headers = { 'Authorization': `Bearer ${token}` };
        fetch('/api/goals/' + id, {
            method: 'DELETE',
            headers
        })
        .then(res => res.json())
        .then(goal => dispatch({ type: GOALS_DELETE, goal }))
    }
}

export function logAdd(log, token) {
    return (dispatch) => {
        let { details, goal, link, day } = log;
        const headers = { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json', 'Content-Type': 'application/json' };
        fetch('/api/goals/' + goal + '/log', {
            method: 'POST',
            headers,
            body: JSON.stringify({ details, goal, link, day })
        })
            .then(res => res.json())
            .then(log => {
                if (log.details)
                    dispatch({ type: LOGS_ADD, log, goal })
            })
    }
}

export function logUpdate(log, token) {
    return (dispatch) => {
        let { details, goal, link, day } = log;
        const headers = { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json', 'Content-Type': 'application/json' };
        fetch('/api/goals/' + goal + '/log', {
            method: 'PUT',
            headers,
            body: JSON.stringify({ details, goal, link, day })
        })
        .then(res => res.json())
        .then(newLog => {
            if (newLog.updated) {
                dispatch({ type: LOGS_EDIT, log, goal })
            }
        })
    }
}