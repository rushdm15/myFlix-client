import React, { useReducer } from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route } from "react-router-dom";

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { Row } from "react-bootstrap";

export class MainView extends React.Component {

    constructor() {
        super();
        // Initial state is set to null
        this.state = {
            movies: null,
            selectedMovie: null,
            user: null
        };
    }

    // One of the "hooks" available in a React Component
    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getMovies(accessToken);
        }
    }

    getMovies(token) {
        axios.get('https://flexnet91.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                // Assign the result to the state
                this.setState({
                    movies: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    /*When a movie is clicked, this function is invoked and updates the state of the
     `selectedMovie` *property to that movie*/

    onMovieClick(movie) {
        this.setState({
            selectedMovie: movie
        });
    }

    /* When a user successfully logs in, this function updates the 
    `user` property in state to that *particular user*/

    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
            user: authData.user.Username
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }
    render() {
        const { movies, selectedMovie, user } = this.state;

        /* If there is no user, the LoginView is rendered. 
        If there is a user logged in, the user details are 
        *passed as a prop to the LoginView*/

        if (!user) return <LoginView onLoggedIn={user =>
            this.onLoggedIn(user)} />;

        // Before the movies have been loaded
        if (!movies) return <div className="main-view" />;

        return (
            <div className="main-view">

                {/* If the state of `selectedMovie` is not null, 
that selected movie will be returned otherwise, 
all *movies will be returned */}

                {selectedMovie ? <MovieView movie={selectedMovie} /> :
                    <Row>
                        {movies.map(movie => (
                            <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)} />
                        ))
                        }
                    </Row>
                }
            </div>
        );
    }
}

