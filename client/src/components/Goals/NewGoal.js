import React, { Component } from "react";
import { connect } from "react-redux";
import { setGoal } from "../../actions/goals";
import { Modal, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';

const mapDispatchToProps = dispatch => {
    return {
        setGoal: (goal, token) => dispatch(setGoal(goal,token))
    };
};

class NewGoal extends Component {
    constructor() {
        super();
        
        this.state = {
            goal: "",
            error: false,
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getValidationState() {
        const length = this.state.goal.length;
        if (length > 0) return 'success';
        else if (length === 0 && this.state.error) return 'error';
        return null;
    }

    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value });
    }
    
    handleSubmit(event) {
        event.preventDefault();
        this.setState({ error: true },()=>{
            if(this.getValidationState() !== 'error'){
                const { goal } = this.state;
                const { getAccessToken } = this.props.auth;
                const token = getAccessToken();
                this.props.setGoal(goal, token);
                this.setState({ goal: '', error: false})
                this.props.onHide();
            }
        });        
    }
    
    render() {
        const { goal } = this.state;
        const { onHide, show } = this.props;
        return (
            <Modal onHide={onHide} show={show} aria-labelledby="contained-modal-title-sm">
                <form onSubmit={this.handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-sm">New Goal</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormGroup controlId="goal" validationState={this.getValidationState()}>
                                <ControlLabel>For the next 100 Days I will..</ControlLabel>
                                <FormControl
                                    type="text"
                                    value={goal}
                                    placeholder="Enter text"
                                    onChange={this.handleChange} />
                            <FormControl.Feedback />
                            </FormGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.props.onHide}>Close</Button>
                        <Button bsStyle="primary" type="submit">Save changes</Button>
                    </Modal.Footer>
                </form>
            </Modal>
        );
    }
}

export default connect(null, mapDispatchToProps)(NewGoal);;