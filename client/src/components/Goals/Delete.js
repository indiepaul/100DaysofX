import React, { Component } from "react";
import { connect } from "react-redux";
import { goalDelete } from "../../actions/goals";
import { Modal, ControlLabel, Button } from 'react-bootstrap';

const mapDispatchToProps = dispatch => {
    return {
        goalDelete: (goal, token) => dispatch(goalDelete(goal, token))
    };
};

class ConnectedForm extends Component {
    delete = () => {
        const { id } = this.props;
        const { getAccessToken } = this.props.auth;
        const token = getAccessToken();
        this.props.goalDelete(id, token);
        this.props.onHide();
    }

    render() {
        const { onHide, show } = this.props;
        return (
            <Modal onHide={onHide} show={show} aria-labelledby="contained-modal-title-sm">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-sm">Quit Challenge?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        <ControlLabel>Do you want to quit on this challenge?</ControlLabel>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Cancel</Button>
                    <Button bsStyle="danger" onClick={this.delete}>Quit</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

const Form = connect(null, mapDispatchToProps)(ConnectedForm);

export default Form;