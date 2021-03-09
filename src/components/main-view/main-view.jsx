import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route } from "react-router-dom";

// #0
import { setMovies } from '../../actions/actions';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
// import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import MoviesList from '../movies-list/movies-list';
import { Row } from "react-bootstrap";

class MainView extends React.Component {

    constructor() {
        super();

        this.state = {
            movies: null,
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
        console.log("=====token===", token)
        axios.get('https://flexnet91.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {

                // #1
                this.props.setMovies(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    onLoggedIn(authData) {
        // console.log(authData);
        this.setState({
            user: authData.user.Username
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }

    render() {

        // #2
        let { movies } = this.props;
        let { user } = this.state;

        return (
            <Router>
                <div className="main-view">
                    <Route exact path="/" render={() => {
                        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
                        return <MoviesList movies={movies} />;
                    }} />
                    <Route path="/register" render={() => <RegistrationView />} />
                    <Route path="/movies/:movieId" render={({ match }) => <MovieView movie={movies.find(m => m._id === match.params.movieId)} />} />
                </div>
            </Router>
        );
    }
}

// #3
let mapStateToProps = state => {
    return { movies: state.movies }
}

// #4
export default connect(mapStateToProps, { setMovies })(MainView);