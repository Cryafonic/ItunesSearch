import React, { Component } from "react";
import { FetchParams } from "../fetchMethods/FetchParams";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "../formInput/formInputClass.css";

export default class FormInputClass extends Component{
    state = {
        input: '',
        select: 'all'
    }

    handleValueChange = (e) => {
        console.log(this.state);
        const value = e.target.value
        this.setState({
            ...this.state,
            [e.target.name]: value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.ituneSearch(this.state);
        this.setState({
            input: ''
        });
    }

    render() {
        // console.log(this.state.input);
        return (
            <form onSubmit={this.handleSubmit} >

                        <input 
                            className="search"
                            type="text" 
                            name="input"
                            value={this.state.input}
                            onChange={this.handleValueChange}
                            placeholder="Search"
                            required
                        />

                        <select className="dropDown" onChange={this.handleValueChange} name="select">
                            <option value="all" >All</option>
                            <option value="music" >Music</option>
                            <option value="movie" >Movie</option>
                            <option value="podcast" >Podcast</option>
                            <option value="musicVideo" >Music Video</option>
                            <option value="audiobook" >Audio book</option>
                            <option value="shortFilm" >Short Film</option>
                            <option value="tvShow" >Tv Show</option>
                            <option value="software" >Software</option>
                            <option value="ebook" >Ebook</option>
                        </select>
                        <Button 
                            // className="searchButton"
                            type="submit" 
                            variant="success"
                            value="Search"
                        >Search</Button>
            </form>
        );
    }
}