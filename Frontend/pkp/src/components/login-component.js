import React, { Component } from "react";//cd
import { Layout } from 'antd';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import AuthService from "../services/auth-service";
import "../styles/styles.css";
import TicketService from "../services/ticketService";

const { Content } = Layout;
const required = value => {
    if (!value) {
        return (
            <div className= "alert alert-danger" role = "alert" >
                This field is required!
                    < /div>
    );
  }
};
export const withNavigation = (Component: Component) => {
    return props => <Component { ...props } navigate = { useNavigate() } />;
}

class Login extends Component {

    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            clickButton: false,
            username: "",
            password: "",
            loading: false,
            message: ""
        };
    }
    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }
    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }
    handleLogin(e) {
        e.preventDefault();

        this.setState({
            message: "",
            loading: true,
            clickButton: true
        }, () => {

            //this.form.validateAll();
            if (this.state.clickButton === true) {
                AuthService.login(this.state.username, this.state.password).then(
                    () => {
                        const ticketCurrent = TicketService.getCurrentTicket();
                        if(ticketCurrent){
                        this.props.navigate('/payment');
                        window.location.reload('/');
                        }else{
                        this.props.navigate('/home');
                        window.location.reload('/');
                        }

                    },
                    error => {
                        const resMessage =
                            (error.response &&
                                error.response.data &&
                                error.response.data.message) ||
                            error.message ||
                            error.toString();

                        this.setState({
                            loading: false,
                            message: resMessage
                        });
                    }
                );
            } else {
                this.setState({
                    loading: false
                });
            }
        });
    }

    render() {

        return (

            <div id= "MainBoxLogin" >
            <div id="wrapper" >
                <div className="text-center m-5-auto" >
                    <h1  style={ { fontWeight: 'bold' } }> Sign in to us < /h1>
                        < form onSubmit = { this.handleLogin }
        ref = { c => {
            this.form = c;
        }
    }
                                    >
    <p>
    <label>Username or email address < /label><br/ >
        <input
                           type="text"
className = "form-control"
name = "username"
value = { this.state.username }
onChange = { this.onChangeUsername }
validations = { [required]}
    />
    </p>
    < p >
    <label>Password < /label>
    < Link to = "/forget-password" > <label className="right-label" > Forget password ? </label></Link >
        <br/>
        < input
                           type = "password"
className = "form-control"
name = "password"
value = { this.state.password }
onChange = { this.onChangePassword }
validations = { [required]}
    />
    </p>
    < p >
    <button className="btn btn-primary btn-block"
disabled = { this.state.loading } >
    {
        this.state.loading && (
            <span className="spinner-border spinner-border-sm"> </span>)}
                                                  Login
            </ button >
    </p>
{
    this.state.message && (
        <div className="form-group" >
            <div className="alert alert-danger" role = "alert" >
                Account doesn`t exist
                < /div>
                < /div>
                             )
}
</form>
    < footer >
    <p>
    <a href="http://localhost:8080/home" class="linkGoogle" >
        <button className="btn btn-primary btn-block" >
            Login in with Google
            < /button>
            < /a>
            < /p>
            < p > First time ? <Link to="/register" > Create an account < /Link>.</p >
                <p><Link to="/" > Back to Homepage < /Link>.</p >
                    </footer>
                    < /div>
                    < /div>
                    < /div>
    );
  }
}

export default withNavigation(Login);