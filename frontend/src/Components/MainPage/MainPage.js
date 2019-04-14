import React, { Component } from 'react'
import "./MainPage.css";
import Form from "../Form/Form";
import { insertUsr, searchUser } from "../../ServerRequests/userRequest";
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
        phone: "Phone number not valid (10 digits and no characters)\n",
        password: "password not valid (Must have 5+ symbols)\n",
        userName: "user name not valid (Must have 5+ symbols)\n"
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
                phone: /^[0-9]{10}$/,
                password: /(.....).*/,
                userName: /[a-zA-Z0-9]{4,}/
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
                    this.setState({ snackMessage: response.message, snackShow: true, snackClass: "greenBackground" });
                }).catch(err => {
                    console.log(err);
                    this.setState({ snackMessage: "could not talk to server", snackShow: true, snackClass: "redBackground" })
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
            let userData = { email: this.state.searchEmail };
            searchUser(userData).then((userData) => {
                if (userData.exists) {
                    this.setState({
                        snackMessage: userData.message,
                        snackShow: true,
                        snackClass: "greenBackground",
                        email: userData.data.emailId,
                        password: userData.data.password,
                        userName: userData.data.userName,
                        phone: userData.data.phoneNo,
                        emailValid: true,
                        phoneValid: true,
                        passwordValid: true,
                        userNameValid: true
                    })
                }
                else {
                    this.setState({
                        snackMessage: userData.message,
                        snackShow: true,
                        snackClass: "redBackground"
                    })
                }
            }).catch((err) => {
                console.log(err);
                this.setState({ snackMessage: "could not talk to server", snackShow: true, snackClass: "redBackground" })
            });
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