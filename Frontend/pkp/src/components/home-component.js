import React, { Component } from "react";
import '../styles/Home.css';
import { useNavigate } from "react-router";
import { RouteComponentProps, withRouter } from 'react-router-class-tools';
import TicketService from "../services/ticketService";
import {
    Form,
    Input,
    Button,
    Select,
    Option,
} from 'antd';
//import UserService from "../services/user-service";
import img1 from '../images/img1.jpg'
import img2 from '../images/img2.jpg'
import img3 from '../images/img3.jpg'
import img4 from '../images/img4.jpg'

export const withNavigation = (Component: Component) => {
    return props => <Component { ...props } navigate = { useNavigate() } />;
}

class Home extends Component {
    constructor(props) {
        super(props);
        var curr = new Date();
        curr.setDate(curr.getDate());
        var dateN = curr.toISOString().substr(0,10);

        this.handleFrom = this.handleFrom.bind(this);
        this.handleTo = this.handleTo.bind(this);
        this.handleDate = this.handleDate.bind(this);


        this.state = {
            dateNow:  dateN,
            from: "Kielce",
            to: "Radom",
            date: dateN,
            message: ""
        };
    }
    handleFrom(e) {
        this.setState({
            from: e.target.value
        });
    }
    handleTo(e) {
        this.setState({
            to: e.target.value
        });
    }
    handleDate(e) {
        this.setState({
            date: e.target.value
        });
    }
    viewConnection() {
        let conn ={
        from: this.state.from,
        to: this.state.to,
        date: this.state.date
        };
        localStorage.setItem("conn", JSON.stringify(conn));

        this.props.navigate('/connections');

    }
    render() {

    const onClick = () => this.props.navigate('/information');
        return (
            <div className= "BoxHome" style={{marginBottom: '10%'}}>
            <div id="mainBox" >
                <div className="row" >
                    <Form id="formRadius" labelCol = {{ span: 4,}
    } wrapperCol = {{ span: 14,}} layout = "horizontal"
initialValues = {{ size: '20' }}
onValuesChange = '50'
size = '50'
>
    <Form.Item label="FROM" value = { this.state.from } onChange = { this.handleFrom } >
        <Input type='text' defaultValue="Kielce"/>
            </Form.Item>
            <Form.Item label = "TO:" value = { this.state.to } onChange = { this.handleTo } >
                <Input type='text' defaultValue="Radom"/>
                    </Form.Item>
                    < Form.Item label = "DATE:" value = { this.state.date } onChange = { this.handleDate } >
                        <Input type='date' defaultValue={this.state.dateNow}/>
                            </Form.Item>
                            < br />
                            <Form.Item>
                            <Button type="primary" size = "large" id = "searchbtn"   onClick = { () => this.viewConnection()} >
                                Search
                                < /Button>
                                < /Form.Item>
                                < /Form>
                                < div id = "boxdispaly" style = {{ backgroundImage: `url("https://www.rynek-kolejowy.pl//img/20201211172144plr.jpg_900-528.jpg")` }}> </div>
                                    < /div>
                                    < /div>
                                    < div id = "boxII" onClick={onClick} aria-hidden="true"> <img id="img" alt="" src = { img1 } style = {{ borderRadius: '10%' }} /> </div >
                                    <div id="boxII" onClick={onClick}> <img alt="" src={ img2 } style = {{ borderRadius: '10%' }}/> </div >
                                    <div id="boxII" onClick={onClick}> <img alt="" src={ img3 } style = {{ borderRadius: '10%' }}/> </div >
                                    <div id="boxII" onClick={onClick}> <img alt="" src={ img4 } style = {{ borderRadius: '10%' }}/> </div >
          </div>

    );
  }
}

export default withNavigation(Home);