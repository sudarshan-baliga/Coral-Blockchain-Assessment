import React, { Component, Fragment } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import "./Form.css";

export default class Form extends Component {
    // global state of this component
    state = {
        userNameValid: true,
        emailValid: true,
        passwordValid: true,
        phoneValid: true,
        userName: "",
        email: "",
        password: "",
        phone: "",
        formValid: false,
        snackShow: false,
        snackMessage: ""
    };
    //different fields in the form
    fields = ["email", "password", "phone", "userName"];
    //error messages to be shown in snackbar
    errMessages = {
        email: "Email not valid\n",
        phone: "Phone number not valid (10 digits)\n",
        password: "password not valid (5+ digits)\n",
        userName: "user name not valid (5+ alphabets)\n"
    }
    //current error message
    errMsg = "";

    //called when the form input element value is changed
    handleFormInpChange = field => event => {
        this.setState({ [field]: event.target.value });
    }

    //validate all the fields of the form
    validate = () => {
        let regex = {
            email: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/,
            phone: /[0-9]{10}/,
            password: /[0-9]{5,}/,
            userName: /[a-zA-Z]{5,}/
        }
        this.errMsg = "";
        this.fields.map(field => {
            let res = this.state[field].match(regex[field])
            let fieldValidity = field + "Valid";
            if (!res) {
                this.errMsg +=  this.errMessages[field];
                this.setState({ [fieldValidity]: false, formValid: false, snackMessage: [this.errMsg] })
            }
            else
                this.setState({ [fieldValidity]: true });
        });
    }

    //called after few seconds to do anything before closing snackbar
    hideSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ snackShow: false });
    }

    //called when submit button is pressed
    submitForm = () => {
        this.setState({ formValid: true, snackMessage: "", snackShow: false });
        console.log(this.state);
        this.validate();
        if (this.state.formValid) {
            //make request to the server
        }
        else
            this.setState({ snackShow: true });
    }

    render() {
        return (
            <Fragment>
                <form className="formContainer">
                    <TextField
                        error={!this.state.userNameValid}
                        label="User name"
                        type="text"
                        autoComplete="current-password"
                        className="inpField"
                        value={this.state.userName}
                        onChange={this.handleFormInpChange("userName")}
                    />
                    <TextField
                        error={!this.state.passwordValid}
                        label="Password"
                        type="password"
                        className="inpField"
                        value={this.state.password}
                        onChange={this.handleFormInpChange("password")}
                    />
                    <TextField
                        error={!this.state.emailValid}
                        label="Email id"
                        type="email"
                        className="inpField"
                        value={this.state.email}
                        onChange={this.handleFormInpChange("email")}
                    />
                    <TextField
                        error={!this.state.phoneValid}
                        label="Phone number"
                        type="tel"
                        className="inpField"
                        value={this.state.phone}
                        onChange={this.handleFormInpChange("phone")}
                    />
                    <Button variant="contained" color="primary" onClick={this.submitForm} >
                        Submit
                </Button>

                </form>
                <Snackbar
                    anchorOrigin={{ horizontal: "left", vertical: "top" }}
                    open={this.state.snackShow}
                    autoHideDuration={10000}
                    onClose={this.hideSnack}
                    message={<span id="snackMsg">{this.state.snackMessage}</span>}
                    className="snackBar"
                />
            </Fragment>
        )
    }
}