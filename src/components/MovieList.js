import React, { Component } from 'react'
import { Link } from 'react-router-dom'

const movieListStyles = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "center",
};

const movieCardStyles = {
  maxWidth: "30%",
  minWidth: "150px",
  flex: "1",
  margin: "5px",
};

class MovieList extends Component {
  render() {
    const { movies } = this.props;
    const movieIds = Object.keys(movies);

    return (
      <div>
        <h1 style={{marginBottom: "0.5em"}}>Movies</h1>

        <div style={movieListStyles}>
          {movieIds.map((id) => {
            const movie = movies[id];
            return (
              <div key={id} style={movieCardStyles} className="pt-card pt-elevation-0 pt-interactive">
                <h5><Link to={`/movies/${id}`}>{movie.title}</Link></h5>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default MovieList
