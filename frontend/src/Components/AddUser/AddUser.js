import React, { Component, Fragment } from 'react'
import "./AddUser.css";
import Form from "../Form/Form";

export default class AddUser extends Component {
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
                <Form 
                {...this.state}  
                handleFormInpChange = {this.handleFormInpChange}
                hideSnack = {this.hideSnack}
                validate = {this.validate}
                submitForm = {this.submitForm}
            />
            </Fragment>
        )
    }
}