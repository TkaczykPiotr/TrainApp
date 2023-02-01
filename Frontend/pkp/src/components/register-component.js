import React, { Component } from "react";
import { isEmail } from "validator";
import "../styles/Register.css";
import { Layout } from "antd";
import { Link } from "react-router-dom";
import AuthService from "../services/auth-service";
import { useNavigate } from "react-router";
import { FormErrors } from './FormErrors';
import { RouteComponentProps, withRouter } from "react-router-class-tools";
const { Content } = Layout;
const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

export const withNavigation = (Component: Component) => {
    return (props) => <Component {...props} navigate={useNavigate()} />;
};

class Register extends Component {
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);

        this.state = {
            clickButton: false,
            username: "",
            email: "",
            password: "",
            terms: "",
            usernameValid: false,
            emailValid: false,
            passwordValid: false,
            termsValid: false,
            successful: false,
            message: "",
            formErrors: {email: '', password: '', username: '', terms:'', message:''}
        };
    }
    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name] : value},
            () =>{ this.validateField(name, value)});
    }

    handleCheckBox = (e) => {
        const name = e.target.name;
        this.setState({
            termsValid: !this.state.termsValid // flip boolean value
        });
        const value = this.termsValid;
        this.setState({[name] : value},
            () =>{ this.validateField(name, value)});
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
        let usernameValid = this.state.usernameValid;
        let termsValid = this.state.termsValid;

        switch(fieldName) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : ' is invalid';
                break;
            case 'password':
                passwordValid = value.length >=6;
                fieldValidationErrors.password = passwordValid ? '': ' is to short';
                break;
            case 'username':
                usernameValid = value.length >=6;
                fieldValidationErrors.username = usernameValid ? '': ' is to short';
                break;
            case 'terms':
                fieldValidationErrors.terms = termsValid ? '': ' needs to be accepted';
                break;
            case 'message':
                fieldValidationErrors.message= value;
                break;
            default:
                break;
        }
        this.setState({formErrors: fieldValidationErrors,
            emailValid: emailValid,
            passwordValid: passwordValid,
            usernameValid: usernameValid,
            termsValid: termsValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({formValid: this.state.emailValid && this.state.passwordValid && this.state.usernameValid && this.state.termsValid});
    }
    errorClass(error) {
        return(error.length ===0 ? '': 'has-error');
    }


    handleRegister(e) {

        e.preventDefault();

        this.setState(
            {
                message: "",
                successful: false,
                clickButton: true,
            },
            () => {
                if (this.state.clickButton === true) {
                    AuthService.register(
                        this.state.username,
                        this.state.email,
                        this.state.password
                    ).then(
                        () => {
                            this.props.navigate("/login");
                            window.location.reload("/");
                        },
                        response => {
                            console.log(response.response.data.message);
                            this.validateField("message", response.response.data.message)
                            this.setState({
                                message: response.response.data.message,
                                successful: true
                            });
                        },
                        (error) => {
                            const resMessage =
                                (error.response &&
                                    error.response.data &&
                                    error.response.data.message) ||
                                error.message ||
                                error.toString();

                            this.setState({
                                successful: false,
                                message: resMessage,
                            });
                        }
                    );
                }
            }
        );
    }

    render() {
        return (
            <div id="MainBoxRegister">
                <div id="wrapper">
                    <div className="text-center m-5-auto">
                        <h2>Join us</h2>
                        <h5>Create your personal account</h5>

                        <form onSubmit={this.handleRegister}
                              ref={c => {
                                  this.form = c;}}
                        >
                            <h2>Sign up</h2>
                            <div className="panel panel-default">
                                <FormErrors formErrors={this.state.formErrors} />
                            </div>
                            <div className={`form-group ${this.errorClass(this.state.formErrors.username)}`}>
                                <label>Username</label>
                                <input type="text" required className="form-control" name="username"
                                       placeholder="Username"
                                       value={this.state.username}
                                       onChange={this.handleUserInput}  />
                            </div>
                            <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
                                <label>Email address</label>
                                <input type="email" required className="form-control" name="email"
                                       placeholder="Email"
                                       value={this.state.email}
                                       onChange={this.handleUserInput}  />
                            </div>
                            <div className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
                                <label>Password</label>
                                <input type="password" required className="form-control" name="password"
                                       placeholder="Password"
                                       value={this.state.password}
                                       onChange={this.handleUserInput}  />
                            </div>
                            <div className={`form-group ${this.errorClass(this.state.formErrors.terms)}`}>
                                <span><input type="checkbox" required className="checkbox" name="terms"
                                             value={this.state.terms}
                                             checked={this.state.termsValid}
                                             onChange={this.handleCheckBox} />
                                I agree all statements in <a href="https://google.com" target="_blank" rel="noopener noreferrer">terms of service</a></span>.
                            </div>
                            <button id="sub_btn" type="submit" className="btn btn-primary" disabled={!this.state.formValid}>Sign up</button>
                        </form>
                        <footer>
                            <p>
                                <Link to="/">Back to Homepage</Link>.
                            </p>
                        </footer>
                    </div>
                </div>
            </div>
        );
    }
}

export default withNavigation(Register);
