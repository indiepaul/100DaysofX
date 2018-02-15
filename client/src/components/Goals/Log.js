import React, { Component } from "react";
import { Modal, FormGroup, ControlLabel, FormControl, InputGroup, Button } from 'react-bootstrap';
import { connect } from "react-redux";
import { logAdd, logUpdate } from "../../actions/goals";

const mapDispatchToProps = dispatch => {
    return {
        logAdd: (log, token) => dispatch(logAdd(log, token)),
        logUpdate: (log, token) => dispatch(logUpdate(log, token))
    };
};

class ConnectedForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            goal: '',
            details:  '',
            link:  '',
            day: '',
            id: '',
            tweet: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidUpdate(){
        if(this.props.id !== this.state.id && this.props.show){
            if (this.props.log.hasOwnProperty('details'))
                this.setState({ details: this.props.log.details || '', link: this.props.log.link, id: this.props.id });
            else
                this.setState({ details: '', link: '', id: this.props.id });
        }
    }
    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value });
    }
    handleSubmit(event) {
        event.preventDefault();
        const log = this.state;
        log.goal= this.props.id
        log.day = this.props.day
        this.props.onHide()
        const { getAccessToken } = this.props.auth;
        const token = getAccessToken();
        if(this.props.log.hasOwnProperty('details'))
            this.props.logUpdate(log, token);
        else
            this.props.logAdd(log, token);
    }
    render() {
        const { details, link, tweet} = this.state;
        return (
            <Modal show={this.props.show} onHide={this.props.onHide} aria-labelledby="contained-modal-title-sm">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-sm">Day {this.props.day}: Log</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={this.handleSubmit}>
                        <FormGroup controlId="details">
                            <ControlLabel>What have you been up to today?...</ControlLabel>
                            <FormControl componentClass="textarea" value={details}
                                onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup controlId="link">
                            <ControlLabel>Link</ControlLabel>
                            <InputGroup>
                                <InputGroup.Addon>@</InputGroup.Addon>
                                <FormControl type="text" value={link} onChange={this.handleChange} />
                            </InputGroup>
                        </FormGroup>
                        <FormGroup controlId="tweet">
                            <ControlLabel>Tweet?</ControlLabel>
                            <InputGroup>
                                <InputGroup.Addon>
                                    @ {/* <input type="checkbox" aria-label="..." id="tweet" onChange={this.handleChange}/> */}
                                </InputGroup.Addon>
                                <FormControl type="text" value={tweet} onChange={this.handleChange}/>
                            </InputGroup>
                        </FormGroup>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Close</Button>
                    <Button bsStyle="primary" type="submit" onClick={this.handleSubmit}>Save changes</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

const Log = connect(null, mapDispatchToProps)(ConnectedForm);

export default Log;