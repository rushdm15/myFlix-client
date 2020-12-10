import React from 'react';
// import { useHistory } from 'react-router-dom';

export class MovieView extends React.Component {

    constructor() {
        super();

        this.state = {};
    }

    render() {
        const { movie } = this.props;
        if (!movie) return null;

        // const { main } = this.props;

        // const history = useHistory();

        return (
            <div className="movie-view">
                <img className="movie-poster" src={movie.ImagePath} />
                <div className="movie-title">
                    <span className="label">Title: </span>
                    <span className="value">{movie.Title}</span>
                </div>
                <div className="movie-description">
                    <span className="label">Description: </span>
                    <span className="value">{movie.Description}</span>
                </div>

                <div className="movie-genre">
                    <span className="label">Genre: </span>
                    <span className="value">{movie.Genre.Name}</span>
                </div>
                <div className="movie-director">
                    <span className="label">Director: </span>
                    <span className="value">{movie.Director.Name}</span>
                </div>
                {/* onClick={() => onClick(movie)} className="movie-card">{movie.Title}</div>
                <Button onClick={() => onClick(main - view)} variant="link">Back</Button>
                <Button intent="success" text="button content" onClick={incrementCounter} /> */}
                {/* <form>
                    <button onClick={() => history.push('./components/main-view/main-view')}>Back</button>
                </form> */}
            </div>

        );
    }
}