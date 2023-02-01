
import React, { Component } from "react";
import AuthService from "../services/auth-service";
import UserService from "../services/user-service";
import { CheckOutlined,CheckCircleOutlined  } from '@ant-design/icons';
import TicketService from "../services/ticketService";
import ConnectionService from "../services/ConnectionsService";
import SiteService from "../services/sitesService";
import '../styles/siteModal.css';
import {
  Button,
} from 'antd';


class SiteModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
    number: null,
    content: "",
    sites: [],
    };
  }

  takeNumber = (numberSite) =>{
        this.setState({
                number: numberSite
              });
              SiteService.updateSite(TicketService.getItemSite());
               localStorage.setItem("site", JSON.stringify({"site":numberSite}));

  }



  componentDidMount() {

  const conn = TicketService.getCurrentTicketConn();

SiteService.getSiteAllByConn(conn).then(
      response => {
        this.setState({
          sites: response.data
        });
      },
      error => {
        this.setState({
          sites:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );



  }



  render() {
  const {sites} = this.state
  return (
      <div id="mainBoxB"  style={{marginTop: '10%'}} >
       <div id="mainBoxA">
       <div id="wrapper1">  <div className="row" style={{color: '#fff'}} >  <h2 > Wybierz swoje miejsce </h2> </div> </div>

       <div className="row" id="row11" >
       {
               sites.map(
               sit =>
           <div id="boxA" key = {sit.id}><div className="a" > <h2>{sit.id}</h2> </div> {sit.status && ( <Button type="primary" size="large" id="btnK2"  onClick={ () => this.takeNumber(sit.id)}><CheckOutlined /></Button>)}</div>
                  )}
         </div>

                <form id="form111">
                     <label id="label11" style={{color: '#fff'}}>
                       Wybrano Siedzenie Numer:
                        <input type="text" disabled value={this.state.number}   style={{color: '#fff'}}/>

                     </label>
                      <input type="submit" id="btnOK1" value='choose'  />

                   </form>




            </div>

             </div>
          );
}
}
export default SiteModal;