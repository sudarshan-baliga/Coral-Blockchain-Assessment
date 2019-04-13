import React, { Component, Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import "./Search.css";

export default class Search extends Component {
    render() {
        return (
            <div className = "searchContainer">
                <TextField
                    // error={!this.props.userNameValid}
                    label="Enter email to be seached"
                    type="text"
                    autoComplete="current-password"
                    className="searchBar"
                    value={this.props.userName}
                    // onChange={this.props.handleFormInpChange("userName")}
                />
                <Button variant="contained" color="primary"  >
                        Search
                </Button>
            </div>
        )
    };
}