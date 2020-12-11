import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export class MovieCard extends React.Component {
    render() {
        // This is given to the <MovieCard/> component by the outer world
        // which, in this case, is 'MainView', as 'MainView' is what's
        // connected to your database via the movies endpoint of your API
        const { movie, onClick } = this.props;

        return (
            <Container>
                <Row>
                    <Col>
                        <Card style={{ width: '16rem' }}>
                            <Card.Img variant="top" src={movie.ImagePath} />
                            <Card.Body>
                                <Card.Title>{movie.Title}</Card.Title>
                                <Card.Text>{movie.Description}</Card.Text>
                                <Button onClick={() => onClick(movie)} variant="link">Open</Button>
                            </Card.Body>
                        </Card>;
                    </Col>
                </Row>
            </Container>
        );
    }
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string
        // Description: PropTypes.string.isRequired,
        // ImagePath: PropTypes.string.isRequired
        // Genre: PropTypes.shape({
        //     Name: ...
        //     ...
        //   })
    }).isRequired,
    onClick: PropTypes.func.isRequired
};