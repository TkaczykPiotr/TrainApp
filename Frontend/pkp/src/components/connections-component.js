import React, { Component } from "react";
import { Navigate} from "react-router-dom";
import AuthService from "../services/auth-service";
import UserService from "../services/user-service";
import TicketService from "../services/ticketService";
import ConnectionService from "../services/ConnectionsService";
import '../styles/connections_style.css';
import { useParams} from 'react-router-dom'
import {useNavigate} from "react-router";
import { RouteComponentProps, withRouter } from 'react-router-class-tools';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';

import {
  Input,
  Button,
  DatePicker,
  InputNumber,
  Card,
} from 'antd';

export const  withNavigation = (Component : Component) => {
    return props => <Component {...props} navigate={useNavigate()} />;
}

class Connections extends Component {
  constructor(props) {
    super(props);

    this.state = {
        doModal: false,
        currentConn: {},
        takeIdConn: null,
        listConnections: []
    }

    this.createTicket = this.createTicket.bind(this);
  }

  onBuyTicket(id)  {
        this.setState({ takeIdConn: id });
    }

    createTicket = (id) => {
            let ticket = {connection: id};
            console.log('ticket => ' + JSON.stringify(ticket));
            TicketService.createTicket(ticket);
        }

  componentDidMount() {
  TicketService.createItemSite();
  const currentConn = ConnectionService.getCurrentConn();
    this.setState({
        currentConn: currentConn
        });


    ConnectionService.getConnection().then(
      response => {
        this.setState({
          listConnections: response.data
        });
      },
      error => {
        this.setState({
          listConnections:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );

  }

  render() {

      const { currentConn, doModal } = this.state;
  return (
  <div>
  {doModal && (<div ><h2>ABY KUPIC BILET MUSISZ SIE ZALOGOWAC</h2>
                 </div>
                      )}
<div className="row" >

            {
             this.state.listConnections.
             filter(conn => conn.dataStarting===currentConn.date
             && conn.stationStarting===currentConn.from
             && conn.stationFinal===currentConn.to).map(
             connection =>
  <div className="col-sm-3" key = {connection.id}  style={{marginLeft: '2%'}}>
    <div className="card" id="cardBody" style={{width: '18rem', borderRadius: '10%'}} >
      <div className="card-body">
      <div className="row" id="rowMain" style={{background: '#f7f7f7'}}>
      <div className="Tiittle" style={{color: '#74918e', margin: '0 auto'}}>From</div>
      <div className="Tiittle" style={{color: '#74918e', margin: '0 auto'}}>To</div>
         </div>

      <div className="row" id="rowMain">
      <div className="col-xs-6" id="innerBox" style={{margin: '2%'}}>

      <div className="City"  style={{color: '#00a34f', margin: '0 auto' , fontSize: '24px'}}> {connection.stationStarting}</div>
      <div className="Time" style={{color: '#00a34f', margin: '0 auto', fontSize: '24px'}}>{connection.timeStarting}</div>
      <div className="Date" style={{color: '#00a34f', margin: '0 auto'}}>{connection.dataStarting}</div>
        </div>
      <div className="col-xs-6" id="innerBox" style={{margin: '2%'}}>

            <div className="City" style={{color: '#00a34f', margin: '0 auto', fontSize: '24px'}}> {connection.stationFinal}</div>
            <div className="Time" style={{color: '#00a34f', margin: '0 auto', fontSize: '24px'}}>{connection.timeFinal}</div>
            <div className="Date" style={{color: '#00a34f', margin: '0 auto'}}>{connection.dataFinal}</div>
       </div>
      </div>
        <div>
         <br/>
        <div className="row" id="rowMain">

        <div style={{margin: '3%'}}>Prize: {connection.prize} zł</div>
        </div>
         </div>
         <div id="btncho" style={{margin: '5%'}}><a href="/ticketForm" className="btn btn-primary" onClick={() =>  this.createTicket(connection.id)}> Choose</a></div>




      </div>

    </div>

  </div>

  )}

</div>

</div>
          );
}
}

export default withRouter(Connections)


