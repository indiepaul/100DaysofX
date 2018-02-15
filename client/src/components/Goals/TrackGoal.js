import React from "react";
import { connect } from "react-redux";
import Log from './Log'
import Logs from './Logs'
import NewGoal from './NewGoal'
import Delete from './Delete'
import Completed from './Completed'
import { Row, Col, ListGroup, Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import './Goals.css';


const Fade = ({ children, ...props}) => {
    return (
        <CSSTransition {...props} timeout={400} classNames="fade">
            {children}
        </CSSTransition>
    );
}
const Comp = ({ children }) => {
    return (    
        <li className="list-group-item" onClick={() => { }}>
            {children}
        </li>
    );
}

class TrackGoals extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            logShow: false,
            logsShow: false,
            newShow: false,
            delShow: false,
            daysLog: {},
        };
    }
    delete(id){
        this.setState({ delShow: true, del: id })
    }
    log(id, day, log, logs){
        if (day <= logs)
            this.setState({ logShow: true, log: id, day: day, daysLog: log})
        else
            this.setState({ logShow: true, log: id, day: day, daysLog: {} })
    }
    logs(id){
            this.setState({ logsShow: true, logs: id })
    }
    componentDidMount(){
        // setTimeout(()=>{
        //     if(this.props.goals.length === 0){
        //         this.setState({ newShow: true })
        //     }
        // }, 500);
    }
    render() {
        const { goals } = this.props;
        let logClose = () => this.setState({ logShow: false });
        let logsClose = () => this.setState({ logsShow: false });
        let newClose = () => this.setState({ newShow: false });
        let delClose = () => this.setState({ delShow: false });
        return (
            <div>
                <ListGroup>
                    <TransitionGroup className='goals'>
                    {goals.map(({_id,goal,logs,days}) => (
                        <Fade key={_id} >
                            <Comp componentClass="ul">
                            <Row className="show-grid">
                                <Col xs={4} md={4}>
                                    <h4 className="list-group-item-heading"><Button onClick={() => this.logs(_id)}>{goal}</Button>: Day {days}</h4>
                                </Col>
                                <Col xs={4} md={4}>
                                    <Completed logs={logs} />
                                </Col>
                                <Col xs={4} md={4}>
                                    <ButtonToolbar>
                                        <ButtonGroup>
                                            {(days === logs.length + 1) &&
                                            <Button bsStyle="success" bsSize="small" 
                                                onClick={() => {
                                                    this.log(_id, logs.length)
                                                }}
                                            >
                                                <span aria-hidden="true">&#10003;</span>
                                            </Button>
                                            }
                                            {((days) <= logs.length) &&
                                            <Button bsStyle="primary" bsSize="small"
                                                onClick={() => this.log(_id, days, logs[days-1], logs.length)}
                                            >
                                                Log
                                            </Button>
                                            }
                                        </ButtonGroup>
                                        <Button bsStyle="danger" bsSize="small" className="pull-right" onClick={() => this.delete(_id)}>
                                                &times;
                                        </Button>
                                    </ButtonToolbar>
                                </Col>
                            </Row>
                        </Comp>
                        </Fade>
                    ))}
                    </TransitionGroup>
                </ListGroup>
                <Log show={this.state.logShow} id={this.state.log} day={this.state.day} log={this.state.daysLog} auth={this.props.auth} onHide={logClose} />
                {this.state.logs && <Logs show={this.state.logsShow} id={this.state.logs} onHide={logsClose} />}
                <Delete show={this.state.delShow} id={this.state.del} auth={this.props.auth} onHide={delClose} />
                <NewGoal show={this.state.newShow} auth={this.props.auth} onHide={newClose} />
                {(this.props.goals.length > 0) &&
                    <Button bsStyle="primary" bsSize="large" onClick={() => this.setState({ newShow: true })}>Set More Goals</Button>}
                {!(this.props.goals.length > 0) &&
                    <Button bsStyle="primary" bsSize="large" onClick={() => this.setState({ newShow: true })}>Set A Goal</Button>}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        goals: state.goals,
    };
};

export default connect(mapStateToProps)(TrackGoals);