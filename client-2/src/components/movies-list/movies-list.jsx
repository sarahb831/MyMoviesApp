import React from 'react';
import { connect } from 'react-redux';
import { Link } from  'react-router-dom';
import Button from 'react-bootstrap/Button';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import SortColumnSelection from '../sort-column-selection/sort-column-selection';

import MovieCard from '../movie-card/movie-card';
 
/* converts the store (which contains this application's state) 
into props for the MoviesList component to use.
here the movies are sorted and filtered for this component
*/
const mapStateToProps = state => {
    const { movies, visibilityFilter, sortColumn } = state;

    let moviesToShow = movies.concat().sort((a,b) => { // copies array with "concat()"
        if (a[sortColumn] < b[sortColumn]) return -1;
        if (a[sortColumn] > b[sortColumn]) return 1;
        return 0;
    });

    if (visibilityFilter !== '') {
        moviesToShow = moviesToShow.filter(m => m.title.includes(visibilityFilter));
    }

    return { movies: moviesToShow};  // sorted, filtered copy of "movies" is return as props
};

function MoviesList(props) {
    const { movies } = props; // sorted filtered copy of "movies" received as props 
                                // due to connect()
    const { user } = props;

    if (!movies) return <div className="main-view"/>;

    return <div className = "movies-list">
        <Link to={`/users/${user}`}>
            <Button 
                variant="link" 
                className = "button-primary">
                User Profile
            </Button>
        </Link>
        <VisibilityFilterInput/>
        <SortColumnSelection/>
        {movies.map(movie => <MovieCard key={movie.id} movie={movie}/>)}
    </div>;
}

export default connect(mapStateToProps)(MoviesList);