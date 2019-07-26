import React from 'react';
import { connect } from 'react-redux';
import { Link } from  'react-router-dom';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import './movies-list.scss';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import SortColumnSelection from '../sort-column-selection/sort-column-selection';
import MovieCard from '../movie-card/movie-card';
 
/* converts the store (which contains this application's state) 
into props for the MoviesList component to use.
here the movies are sorted and filtered for this component
*/
const mapStateToProps = state => {
    const { movies, visibilityFilter, sortColumn } = state;
    let moviesToShow = sortColumn === 'Title' ?
        movies.concat().sort((a,b) => { 
            if (a[sortColumn] < b[sortColumn]) return -1;
            if (a[sortColumn] > b[sortColumn]) return 1;
            return 0;
        }): movies.concat().sort((a,b) => {
            const realSort = sortColumn.split('.');
            if (a[realSort[0]][realSort[1]] < b[realSort[0]][realSort[1]]) return -1;
            if (a[realSort[0]][realSort[1]] > b[realSort[0]][realSort[1]]) return 1;
            return 0;
    });

    if (visibilityFilter && visibilityFilter !== '') {
        moviesToShow = moviesToShow.filter(movie => 
            movie.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
    }

    return { movies: moviesToShow};  // sorted, filtered copy of "movies" is return as props
};

function MoviesList(props) {
    const { movies } = props; // sorted filtered copy of "movies" received as props 
                                // from mapStateToProps() due to connect()
    const { user } = props; 
    if (!movies) return <div className="main-view"/>;
    return <div className = "movies-list">
        <Container>
            <Row>
                <Col md={3}></Col>
                <Col xs={12} sm={6}>
                    <Card style={{ width: '20rem' }}>
                        <Link to={`/users/${user}`}>
                            <Button 
                                variant="link" 
                                className = "button-secondary"
                                block>
                                User Profile
                            </Button>
                        </Link>
                        <VisibilityFilterInput/>
                        <SortColumnSelection/>
                        {movies.map(movie => 
                            <MovieCard key={movie._id} movie={movie}/>)}
                    </Card>
                </Col>
                <Col>
                </Col>
            </Row>
        </Container>
    </div>;
}

export default connect(mapStateToProps)(MoviesList);