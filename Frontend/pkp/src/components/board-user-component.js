import React, { Component } from "react";

import UserService from "../services/user-service";
import EventBus from "../common/EventBus";
import TicketService from "../services/ticketService";
import ConnectionService from "../services/ConnectionsService";
import AuthService from "../services/auth-service";
import PaymentService from "../services/paymentService";

export default class BoardUser extends Component {


  constructor(props) {
    super(props);

    this.state = {
      listConnection: [],
      listConnectionOne: {},
      listPayment: [],

      content: "",
      tickets: [],
    };
  }


  getTicketPDF  = (id, idT, idP) => {
    TicketService.getTicketPDF(id, idT, idP);
  }


  componentDidMount() {

  const userId = AuthService.getCurrentUserId();
   TicketService.removeTicket();


    TicketService.getTicketAccount(userId).then(
         response => {
           this.setState({
             tickets: response.data
           });
         },
         error => {
           this.setState({
             tickets:
               (error.response && error.response.data) ||
               error.message ||
               error.toString()
           });
         }
       );

        ConnectionService.getConnection().then(
          response => {
          this.setState({
           listConnection: response.data,
           });
          },
           error => {
             this.setState({
              listConnection:
                 (error.response && error.response.data) ||
                 error.message ||
                  error.toString()
                 });
               }
             );

             PaymentService.getPayment().then(
                       response => {
                       this.setState({
                        listPayment: response.data,
                        });
                       },
                        error => {
                          this.setState({
                           listPayment:
                              (error.response && error.response.data) ||
                              error.message ||
                               error.toString()
                              });
                            }
                          );





    UserService.getUserBoard().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }

  render() {
    return (
        <div style={{background: '#afccc2', borderRadius: '10px' , marginBottom: '20%'}}>
                 <h2 className="text-center">Tickets List</h2>

                        <br></br>
                        <div className = "row" style={{width: '1200px', marginLeft:'10%'}} >
                               <table className = "table table-striped table-bordered">
                                   <thead>
                                       <tr>
                                           <th> From</th>
                                           <th> To</th>
                                           <th> Date</th>
                                           <th> Time Starting</th>
                                           <th> Time Final</th>
                                            <th> Prize</th>
                                            <th> Site Number</th>
                                            <th> Payment Status</th>
                                            <th> Payment Name</th>
                                           <th> Actions</th>
                                       </tr>
                                   </thead>
                                   <tbody>
                                       {
                                           this.state.tickets.map(
                                               ticket =>

                                               <tr key = {ticket.id}>
                                                {
                                                 this.state.listConnection.map(
                                                 res =>
                                                 res.id === ticket.connection ? (
                                                 <td> {res.stationStarting}</td>
                                                 ):null,
                                                 )}

                                                 {
                                                  this.state.listConnection.map(
                                                  res =>
                                                  res.id === ticket.connection ? (
                                                  <td> {res.stationFinal}</td>
                                                  ):null,
                                                   )}
                                                    <td> {ticket.dates} </td>
                                                {
                                                this.state.listConnection.map(
                                                res =>
                                                res.id === ticket.connection ? (
                                              <td> {res.timeStarting}</td>
                                                ):null,
                                               )}
                                               {
                                                this.state.listConnection.map(
                                                res =>
                                                res.id === ticket.connection ? (
                                                <td> {res.timeFinal}</td>
                                                ):null,
                                               )}

                                                    <td> {ticket.prize} PLN</td>
                                                    <td> {ticket.site}</td>

                                                    {
                                                     this.state.listPayment.map(
                                                    res =>
                                                    res.id === ticket.payments ? (
                                                   <td> {res.status}</td>
                                                   ):null,
                                                   )}
                                            {
                                              this.state.listPayment.map(
                                                res =>
                                              res.id === ticket.payments ? (
                                              <td> {res.name}</td>
                                              ):null,
                                              )}

                                                    <td>
                                                        <button onClick={() => this.getTicketPDF(ticket.connection, ticket.id, ticket.payments)} className="btn btn-primary">Download Ticket </button>

                                                    </td>
                                               </tr>
                                           )
                                       }
                                   </tbody>
                               </table>

                        </div>

                   </div>
    );
  }
}