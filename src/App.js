import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { Spinner } from '@blueprintjs/core';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Logout from './components/Logout';
import MovieEditor from './components/MovieEditor';
import MovieList from './components/MovieList';
import { app, base } from './base';

import './styles/main.css';

function AuthenticatedRoute({component: Component, authenticated, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authenticated === true
          ? <Component {...props} {...rest} />
          : <Redirect to={{pathname: '/login', state: {from: props.location}}} /> } />
  )
}

function ShowRoute({component: Component, items, param, ...rest}) {
  return (
    <Route
      {...rest}
      render={({match, ...props}) => {
        if (rest.requireAuth === true && !rest.authenticated) {
          return (
            <Redirect to={{pathname: '/login', state: {from: props.location}}} />
          )
        }

        const item = items[match.params[param]];
        if (item) {
          return <Component item={item} {...props} match={match} {...rest}/>
        } else {
          return <h1>Not Found</h1>
        }
      }}
    />
  )
}

class App extends Component {
  constructor() {
    super();
    this.setCurrentUser = this.setCurrentUser.bind(this);
    this.addMovie = this.addMovie.bind(this);
    this.updateMovie = this.updateMovie.bind(this);
    this.state = {
      authenticated: false,
      currentUser: null,
      loading: true,
      movies: { }
    };
  }

  addMovie(title) {
    const movies = {...this.state.movies};
    const id = Date.now();
    movies[id] = {
      id: id,
      title: title,
      owner: this.state.currentUser.uid
    };

    this.setState({movies});
  }

  updateMovie(movie) {
    const movies = {...this.state.movies};
    movies[movie.id] = movie;

    this.setState({movies});
  }

  setCurrentUser(user) {
    if (user) {
      this.setState({
        currentUser: user,
        authenticated: true
      })
    } else {
      this.setState({
        currentUser: null,
        authenticated: false
      })
    }
  }

  componentWillMount() {
    this.removeAuthListener = app.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        this.setState({
          authenticated: true,
          currentUser: user,
          loading: false,
        });

        this.moviesRef = base.syncState(`movies/${user.uid}`, {
          context: this,
          state: 'movies'
        });
      } else {
        this.setState({
          authenticated: false,
          currentUser: null,
          loading: false,
        });

        base.removeBinding(this.moviesRef);
      }
    })
  }

  componentWillUnmount() {
    this.removeAuthListener();
    base.removeBinding(this.moviesRef);
  }

  render() {
    if (this.state.loading === true) {
      return (
        <div style={{ textAlign: "center", position: "absolute", top: "25%", left: "50%" }}>
          <h3>Loading</h3>
          <Spinner />
        </div>
      )
    }

    return (
      <div style={{maxWidth: "1160px", margin: "0 auto"}}>
        <BrowserRouter>
          <div>
            <Header addMovie={this.addMovie} user={this.state.currentUser} authenticated={this.state.authenticated} />
            <div className="main-content" style={{padding: "1em"}}>
              <div className="workspace">
                <Route exact path="/login" render={(props) => {
                  return <Login setCurrentUser={this.setCurrentUser} {...props} />
                }} />
                <Route exact path="/logout" component={Logout} />
                <AuthenticatedRoute
                  exact
                  path="/movies"
                  authenticated={this.state.authenticated}
                  component={MovieList}
                  movies={this.state.movies} />
                <ShowRoute
                  path="/movies/:movieId"
                  component={MovieEditor}
                  authenticated={this.state.authenticated}
                  requireAuth={true}
                  param="movieId"
                  updateMovie={this.updateMovie}
                  items={this.state.movies} />
              </div>
            </div>
          </div>
        </BrowserRouter>
        <Footer />
      </div>
    );
  }
}

export default App;
