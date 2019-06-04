import React from 'react';

export class MovieCard extends React.Component {
  render() {
  // this is given to the <MovieCard/> component by the outer world
  // which here is 'MainView'.  'MainView' is connected to the
  // database via the movies endpoint of this API
    const { movie, onClick } = this.props;

    return (
      <div onClick={() => onClick(movie)} className="movie-card">{movie.Title}</div>
    );
  }
}
