import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import "./Form.css";

// form structure
export default class AddUser extends Component {
    render() {
        return (
            <Fragment>
                <form className="formContainer">
                    <TextField
                        error={!this.props.userNameValid}
                        label="User name"
                        type="text"
                        autoComplete="current-password"
                        className="inpField"
                        value={this.props.userName}
                        onChange={this.props.handleInputChange("userName")}
                    />
                    <TextField
                        error={!this.props.passwordValid}
                        label="Password"
                        type="password"
                        className="inpField"
                        value={this.props.password}
                        onChange={this.props.handleInputChange("password")}
                    />
                    <TextField
                        error={!this.props.emailValid}
                        label="Email id"
                        type="email"
                        className="inpField"
                        value={this.props.email}
                        onChange={this.props.handleInputChange("email")}
                    />
                    <TextField
                        error={!this.props.phoneValid}
                        label="Phone number"
                        type="tel"
                        className="inpField"
                        value={this.props.phone}
                        onChange={this.props.handleInputChange("phone")}
                    />
                    <Button variant="contained" color="primary" onClick={this.props.submitForm} >
                        Insert/Update
                </Button>

                </form>
                <Snackbar
                    anchorOrigin={{ horizontal: "left", vertical: "top" }}
                    open={this.props.snackShow}
                    autoHideDuration={10000}
                    onClose={this.props.hideSnack}
                    message={<span id="snackMsg">{this.props.snackMessage}</span>}
                    className={ "snackBar " + this.props.snackClass } 
                />
            </Fragment>
        )
    }
}