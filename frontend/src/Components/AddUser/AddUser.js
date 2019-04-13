import React, { Component, Fragment } from 'react'
import "./AddUser.css";
import Form from "../Form/Form";
import { insertUsr } from "../../ServerRequests/userRequest";
import SearchBar from "../Search/Search";

export default class AddUser extends Component {
    // global state of this component
    state = {
        userNameValid: true,
        emailValid: true,
        searchEmailValid: true,
        passwordValid: true,
        phoneValid: true,
        userName: "",
        email: "",
        searchEmail: "",
        password: "",
        phone: "",
        formValid: false,
        snackShow: true,
        snackMessage: "Search for the email and edit the form or directly insert data into the form",
        snackClass: "greenBackground"
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
    handleInputChange = field => event => {
        this.setState({ [field]: event.target.value });
    }

    //validate all the fields of the form
    //set state is asynchronous and taking time so used promise
    validate = () => {
        return new Promise((resolve, reject) => {
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
                    this.errMsg += this.errMessages[field];
                    this.setState({ [fieldValidity]: false, formValid: false, snackMessage: [this.errMsg] })
                }
                else
                    this.setState({ [fieldValidity]: true });
            });
            resolve("success");
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
        this.validate().then(result => {
            if (this.state.formValid) {
                let userData = {
                    email: this.state.email,
                    password: this.state.password,
                    userName: this.state.userName,
                    phone: this.state.phone
                }
                insertUsr(userData).then(response => {
                    console.log(response, "in user");
                    this.setState({ snackMessage: response.message, snackShow: true, snackClass: "greenBackground" });
                })
            }
            else
                this.setState({ snackShow: true, snackClass: "redBackground" });

        })
            .catch(err => {
                console.log(err);
            });
    }

    search = () => {
        //validate the search email
        if (!this.state["searchEmail"].match(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/)) {
            this.setState({
                snackShow: true,
                snackClass: "redBackground",
                snackMessage: "search email not valid",
                searchEmailValid: false
            });
        }
        else {
            this.setState({ snackShow: false, searchEmailValid: true });
            console.log(this.state.searchEmail)
        }
    }

    render() {
        return (
            <div className="mainContainer" >
                <SearchBar
                    search={this.search}
                    handleInputChange={this.handleInputChange}
                    searchEmailValid={this.state.searchEmailValid}
                />
                <Form
                    {...this.state}
                    handleInputChange={this.handleInputChange}
                    hideSnack={this.hideSnack}
                    validate={this.validate}
                    submitForm={this.submitForm}
                />
            </div>
        )
    }
}