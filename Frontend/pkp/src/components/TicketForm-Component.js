import React, { Component} from "react";
import '../styles/Home.css';
import {useNavigate} from "react-router";
import { RouteComponentProps, withRouter } from 'react-router-class-tools';
import Site from "./Site.js"
import Payment from "./Payment.js"
import SiteModal from "./siteModal"
import TicketService from "../services/ticketService";
import ConnectionService from "../services/ConnectionsService";
import AuthService from "../services/auth-service";
import SiteService from "../services/sitesService";
import {
  Layout,
  Form,
  Input,
  Button,
  Select,
} from 'antd';


export const  withNavigation = (Component : Component) => {
    return props => <Component {...props} navigate={useNavigate()} />;
}

class TicketForm extends Component {
  constructor(props) {
    super();
     this.state = {
    currentUser: '',
    show: false,
    showSite: false,
    reduction: null,
    listConnection: [],
    stationStarting: '',
    timeStarting: '',
    dataStarting: '',
    stationFinal: '',
    timeFinal: '',
    dataFinal: '',
    prize: null,
    train: '',
    name: '',
    surname: '',
    dates: '',
     };
     this.reductionHandler  = this.reductionHandler.bind(this);
     this.nameHandler  = this.nameHandler.bind(this);
     this.surnameHandler  = this.surnameHandler.bind(this);
     this.showModal = this.showModal.bind(this);
     this.hideModal = this.hideModal.bind(this);

  }
  reductionHandler = (event) => {
    var prize = this.state.prize*event.target.value;
     prize = prize.toFixed(2);
     this.setState({prize: prize});
     this.setState({reduction: event.target.value});
   }
  nameHandler = (event) => {
    var todayDate = new Date().toISOString().slice(0, 10);
    this.setState({name: event.target.value, dates: todayDate});
   }
 surnameHandler = (event) => {
   this.setState({surname: event.target.value});
   }

  showSite = () => {
  this.setState({ showSite: true });
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {

    this.setState({ show: false });


  };
  updateTicket = () => {
              let ticket = {
               id: TicketService.getCurrentTicketId(),
               reduction: this.state.reduction,
               userSurname: this.state.surname,
               userName: this.state.name,
               dates: this.state.dates,
               site: TicketService.getItemSite(),
               prize: this.state.prize
               };

              console.log('ticket => ' + JSON.stringify(ticket));
              TicketService.updateTicketSecond(TicketService.getCurrentTicketId(), ticket).then( res => {
              localStorage.setItem("ticket", JSON.stringify(ticket));
              if(this.state.currentUser){
                this.props.navigate('/payment');
              }else{
               this.props.navigate('/login');
              }

                });
  }



 componentDidMount() {

   const currentUser = AuthService.getCurrentUser();
   const ticketsDataConn = JSON.stringify(TicketService.getCurrentTicketConn());

   this.setState({ currentUser: currentUser});
    ConnectionService.getConnectionById(ticketsDataConn).then(
            response => {
            let connection = response.data;
              this.setState({
                stationStarting: connection.stationStarting,
                stationFinal: connection.stationFinal,
                dataStarting: connection.dataStarting,
                dataFinal: connection.dataFinal,
                timeStarting: connection.timeStarting,
                timeFinal: connection.timeFinal,
                prize: connection.prize,
                train: connection.train
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


 }


  render() {

const { showSite } = this.state;

  return (
<div className="MainBoxTicket" >

<div id="ticketBox">


<div id="wrapper2">
<h2>Information about Ticket</h2>
<div>

 <div className="row" id="rowMain">

      <div className="col-xs-6" id="innerBox" style={{margin: '2%'}}>

      <div className="City"  style={{color: '#00a34f', margin: '0 auto' , fontSize: '24px'}}> {this.state.stationStarting}</div>
      <div className="Time" style={{color: '#00a34f', margin: '0 auto', fontSize: '24px'}}>{this.state.timeStarting}</div>
      <div className="Date" style={{color: '#00a34f', margin: '0 auto'}}>{this.state.dataStarting}</div>
        </div>
         <div className="col-xs-6" id="innerBox" style={{margin: '2%'}}>
         <br/>
         <h2> ----> </h2>
         </div>
      <div className="col-xs-6" id="innerBox" style={{margin: '2%'}}>
            <div className="City" style={{color: '#00a34f', margin: '0 auto', fontSize: '24px'}}> {this.state.stationFinal}</div>
            <div className="Time" style={{color: '#00a34f', margin: '0 auto', fontSize: '24px'}}>{this.state.timeFinal}</div>
            <div className="Date" style={{color: '#00a34f', margin: '0 auto'}}>{this.state.dataFinal}</div>
       </div>
      </div>

</div>


<Form id="formRadius" labelCol={{span: 4,}} wrapperCol={{span: 14,}} style={{marginLeft: '10%'}} layout="horizontal"
      initialValues={{size: '20'}}
      onValuesChange='50'
      size='50'>
      <Form.Item label="NAME" >
        <Input type='text'  value={this.state.name} onChange={this.nameHandler}/>
      </Form.Item>
      <Form.Item label="SURNAME" value={this.state.surname} onChange={this.surnameHandler}>
        <Input type='text' />

       </Form.Item>

        <Form.Item label="REDUCTION"  >
        <select className="custom-select" id="inputGroupSelect01" defaultValue={this.state.reduction} onChange={this.reductionHandler}>
            <option value='1' >brak</option>
            <option value={0}>100% Dla dziecka do 4 lat</option>
            <option value={0.7}>30% Bilet dla seniora</option>
            <option value={0.67}>33% Honorowy dawca krwi</option>
            <option value={0.63}>37% Dzieci/młodzież</option>
            <option value={0.63}>37% inwalidzi</option>
            <option value={0.63}>37% weterani</option>
            <option value={0.49}>51% studenci i doktoranci</option>
             <option value={0.22}>78% ofiary wojny</option>
          </select>
       </Form.Item>
        <Form.Item label="SITE" >
        <Site show={this.state.show} handleClose={this.hideModal}>
                  <p>Modal</p>
                </Site>
                   <Button type="primary" size="large" id="searchbtn"  onClick={this.showModal}>
                     Choose
                    </Button>
         </Form.Item>
      <Form.Item>
      <br />
        <Button type="primary" size="large" id="searchbtn"   onClick={ () => this.updateTicket()} >
              Buy Ticket
            </Button>
      </Form.Item>
     <Form.Item>
        <h2>Site: {TicketService.getItemSite()} </h2>
        <h2>Prize: {this.state.prize} PLN</h2>
      </Form.Item>
    </Form>
</div>
</div>
</div>
    );
  }
}

export default withNavigation(TicketForm)

//{showSite && (
//                  <SiteModal></SiteModal>
//                )}