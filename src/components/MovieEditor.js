import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MovieEditor extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const movie = {...this.props.item};
    movie.image = event.target.value;

    this.props.updateMovie(movie);
  }

  render() {
    const { item: movie } = this.props;

    return (
      <div>
        <ul className="pt-breadcrumbs">
          <li><Link to="/movies" className="pt-breadcrumb">Movies</Link></li>
          <li><Link to="#" className="pt-breadcrumb">{movie.title}</Link></li>
        </ul>
        <h2 style={{margin: "0.5em 0"}}>{movie.title}</h2>
        <div className="chord-editor">
          <div className="panel">
            <h3>Upload movie screenshot</h3>
            <input
                type="file"
                style={{width: "100%", height: "100%"}}
                onChange={this.handleChange}
                value={movie.image}/>
          </div>

        </div>
      </div>
    );
  }
}

export default MovieEditor;
