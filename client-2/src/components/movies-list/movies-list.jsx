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

    console.log('movies-list, mSTP, sortColumn:',sortColumn);
    console.log('movies-list, mSTP,movies:',movies);
   console.log('movies[0]:',movies[0]);
    //console.log('movies.movies[0].Director.Name:' ,movies[0].Director.Name);

    let moviesToShow = movies.concat().sort((a,b) => { // copies array with "concat()"
    console.log('a[sortColumn]:',a[sortColumn]);
    console.log('b[sortColumn]:',b[sortColumn]);
        if (a[sortColumn] < b[sortColumn]) return -1;
        if (a[sortColumn] > b[sortColumn]) return 1;
        return 0;
    });

    if (visibilityFilter && visibilityFilter !== '') {
        console.log('M-Link, visF:',visibilityFilter);
        console.log('moviesToShow.:', moviesToShow);
        moviesToShow = moviesToShow.filter(movie => movie.title.includes(visibilityFilter));
    }

    return { movies: moviesToShow};  // sorted, filtered copy of "movies" is return as props
};

function MoviesList(props) {
    const { movies } = props; // sorted filtered copy of "movies" received as props 
                                // from mapStateToProps() due to connect()
    const { user } = props; // passed as prop from MainView

    if (!movies) return <div className="main-view"/>;

    return <div className = "movies-list">
        <Link to={`/users/${user}`}>
            <Button 
                variant="link" 
                className = "button-secondary">
                User Profile
            </Button>
        </Link>
        <VisibilityFilterInput/>
        <SortColumnSelection/>
        {movies.map(movie => <MovieCard key={movie.id} movie={movie}/>)}
    </div>;
}

export default connect(mapStateToProps)(MoviesList);