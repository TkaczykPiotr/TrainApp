import React, { Component } from "react";

import UserService from "../services/user-service";
import EventBus from "../common/EventBus";

import ConnectionService from "../services/ConnectionsService";

class BoardAdmin extends Component {
    constructor(props) {
        super(props)

        this.state = {
            //id: this.props.match.params.id,
            id: '',
            stationStarting: '',
            timeStarting: '',
            dataStarting: '',
            stationFinal: '',
            timeFinal: '',
            dataFinal: '',
            prize: '',
            train: '',

        }
        this.idHandler = this.idHandler.bind(this);
        this.stationStartingHandler = this.stationStartingHandler.bind(this);
        this.timeStartingHandler = this.timeStartingHandler.bind(this);
        this.dataStartingHandler = this.dataStartingHandler.bind(this);
        this.stationFinalHandler = this.stationFinalHandler.bind(this);
        this.timeFinalHandler = this.timeFinalHandler.bind(this);
        this.dataFinalHandler = this.dataFinalHandler.bind(this);
        this.prizeHandler = this.prizeHandler.bind(this);
        this.trainHandler = this.trainHandler.bind(this);

        this.updateConnection = this.updateConnection.bind(this);
    }

//    componentDidMount(){
//        ConnectionService.getEmployeeById(this.state.id).then( (res) =>{
//            let connection = res.data;
//            this.setState({firstName: employee.firstName,
//                lastName: employee.lastName,
//                emailId : employee.emailId
//            });
//        });
//    }

    updateConnection = (e) => {
        e.preventDefault();
        let connection = {id: this.state.id,
        stationStarting: this.state.stationStarting,
        timeStarting: this.state.timeStarting,
        dataStarting: this.state.dataStarting,
        stationFinal: this.state.stationFinal,
        timeFinal: this.state.timeFinal,
        dataFinal: this.state.dataFinal,
        prize: this.state.prize,
        train: this.state.train,
        };
        console.log('connection => ' + JSON.stringify(connection));
        console.log('id => ' + JSON.stringify(this.state.id));
        ConnectionService.createConnection(connection, this.state.id)
        .then( res => {
           window.location.reload('/');
        });
    }
     idHandler= (event) => {
        this.setState({id: event.target.value});
    }

    stationStartingHandler= (event) => {
        this.setState({stationStarting: event.target.value});
    }

    timeStartingHandler= (event) => {
        this.setState({timeStarting: event.target.value});
    }

    dataStartingHandler= (event) => {
        this.setState({dataStarting: event.target.value});
    }

    stationFinalHandler= (event) => {
            this.setState({stationFinal: event.target.value});
    }
     timeFinalHandler= (event) => {
             this.setState({timeFinal: event.target.value});
     }
     dataFinalHandler= (event) => {
                  this.setState({dataFinal: event.target.value});
     }
     prizeHandler= (event) => {
                       this.setState({prize: event.target.value});
          }
    trainHandler= (event) => {
                       this.setState({train: event.target.value});
          }

//    cancel(){
//        this.props.history.push('/employees');
//    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3" style={{background: '#0000'}}>
                                <h3 className="text-center">Add connections</h3>
                                <div className = "card-body">
                                    <form>

                                        <div className = "form-group">
                                            <label> Station Starting: </label>
                                            <input placeholder="Station Starting" name="stationStarting" className="form-control"
                                                value={this.state.stationStarting} onChange={this.stationStartingHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Station Final: </label>
                                            <input placeholder="Station Final" name="stationFinal" className="form-control"
                                                value={this.state.stationFinal} onChange={this.stationFinalHandler}/>
                                        </div>
                                        <div className = "form-group">
                                              <label> Date Starting: </label>

                                               <input  type='date' placeholder="Date Starting" name="dataStarting" className="form-control"
                                               value={this.state.dataStarting} onChange={this.dataStartingHandler}/>
                                        </div>
                                        <div className = "form-group">
                                             <label> Date Final: </label>
                                             <input type='date' placeholder="Date Final" name="dataFinal" className="form-control"
                                             value={this.state.dataFinal} onChange={this.dataFinalHandler}/>
                                         </div>
                                         <div className = "form-group">
                                               <label> Time Starting: </label>
                                               <input type='time' placeholder="Time Starting" name="timeStarting" className="form-control"
                                                value={this.state.timeStarting} onChange={this.timeStartingHandler}/>
                                         </div>
                                         <div className = "form-group">
                                               <label> Time Final: </label>
                                                <input type='time' placeholder="Time Final" name="timeFinal" className="form-control"
                                                value={this.state.timeFinal} onChange={this.timeFinalHandler}/>
                                         </div>
                                         <div className = "form-group">
                                                <label> Prize: </label>
                                                 <input placeholder="Prize" name="prize" className="form-control"
                                                 value={this.state.prize} onChange={this.prizeHandler}/>
                                          </div>
                                          <div className = "form-group">
                                               <label> Train Number: </label>
                                               <input placeholder="train" name="train" className="form-control"
                                               value={this.state.train} onChange={this.trainHandler}/>
                                          </div>

                                        <button className="btn btn-success" onClick={this.updateConnection}>Save</button>

                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default BoardAdmin;