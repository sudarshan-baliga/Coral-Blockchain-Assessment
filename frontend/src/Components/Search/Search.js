import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import "./Search.css";

export default class Search extends Component {
    render() {
        return (
            <div className="searchContainer">
                <TextField
                    error={!this.props.searchEmailValid}
                    label="Enter email to be seached"
                    type="text"
                    autoComplete="current-password"
                    className="searchBar"
                    value={this.props.userName}
                    onChange={this.props.handleInputChange("searchEmail")}
                />
                <Button variant="contained" color="primary" onClick={this.props.search} >
                    Search
                </Button>
            </div>
        )
    };
}