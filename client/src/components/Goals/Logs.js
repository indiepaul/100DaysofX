import React from "react";
import { connect } from "react-redux";
import { Modal, ListGroup, Button } from 'react-bootstrap';
import './Logs.css';

const mapStateToProps = state => {
    return { goals: state.goals };
};

const ConnectedLogs = ({ goals, id, onHide, show }) => (
    <Modal onHide={onHide} show={show} aria-labelledby="contained-modal-title-sm">
        {goals.filter(({ _id }) => _id === id).length > 0 &&
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-sm">{goals.filter(({ _id }) => _id === id)[0].goal || ''}</Modal.Title>
        </Modal.Header>
        }
        {goals.filter(({ _id }) => _id === id).length > 0 &&
        <Modal.Body>
            <div className="Log list-group list-group-flush">
                <LogList goal={goals.filter(({ _id }) => _id === id)[0]} />
            </div >
        </Modal.Body>
        }
        <Modal.Footer>
            <Button onClick={onHide}>Close</Button>
        </Modal.Footer>
    </Modal>
);
const LogList = ({ goal }) => (
    <ListGroup className="Logs">
        {goal.logs.map(({_id, details, link, goal, day }) =>
            <li className="list-group-item" key={_id}>
                <h4 className="list-group-item-heading">Day {day + 1}</h4>
                {details} <br />
                {link && <span>Link: <a href={link}>{link}</a></span>}
            </li>
        )}
    </ListGroup>
)
const Logs = connect(mapStateToProps)(ConnectedLogs);

export default Logs;