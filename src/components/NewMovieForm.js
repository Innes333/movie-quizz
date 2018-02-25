import React, { Component } from 'react'

const newMovieStyles = {
  padding: '10px'
};

class NewMovieForm extends Component {
  constructor(props) {
    super(props);
    this.createMovie = this.createMovie.bind(this)
  }

  createMovie(event) {
    event.preventDefault();

    const title = this.titleInput.value;
    this.props.addMovie(title);

    this.movieForm.reset();
    this.props.postSubmitHandler();
  }

  render() {
    return (
      <div style={newMovieStyles}>
        <form onSubmit={(event) => this.createMovie(event)} ref={(form) => this.movieForm = form }>
          <label className="pt-label">
            Movie Title
            <input style={{width: "100%"}} className="pt-input" name="title" type="text" ref={(input) => { this.titleInput = input }} placeholder="Don't Stop Believing"></input>
          </label>
          <input style={{width: "100%"}} type="submit" className="pt-button pt-intent-primary" value="Create Movie"></input>
        </form>
      </div>
    )
  }
}

export default NewMovieForm
