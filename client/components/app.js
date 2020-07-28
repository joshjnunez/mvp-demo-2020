import React from 'react';
import axios from 'axios';
import WordsList from './wordsList.js';
import Favorites from './favorites.js';
import { callAPI } from '../callAPI.js';
import { getFavs } from '../helpers.js';
import { render } from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      word: '',
      definition: '',
      synonyms: [],
      favorites: [],
      clicked: false,
    };
  }

  componentDidMount() {
    // // axios.post local host server
    // getFavs(axios)
    //   .then((data) => console.log('here is the data from db:', data))
    //   .catch((err) => console.error(err));
    const data = 'DATA IS HERE';
  }

  handleSearch(event) {
    callAPI(axios, event.target.value)
      .then((res) => {
        console.log(res.data);
        this.setState({
          word: res.data.word,
          definition: res.data.results[0].definition,
          synonyms: res.data.results[0].synonyms,
        });
      })
      .catch((err) => console.error(err));
    console.log(event.target.value, 'has been searched');
  }

  showFavs() {
    console.log('showFavs has been clicked!!');
    // axios.get
    this.setState({
      favorites: ['these', 'are', 'my', 'favorites'],
      clicked: !this.state.clicked,
    });
  }

  emptyFavs() {
    console.log('emptyFavs has been clicked!!!');
    //axios.delete ???
  }

  addFav(event) {
    console.log(event.target.id, 'has been added to favs!!');
    event = event.target.id;
    axios
      .post(
        'http://localhost:8080/postFav',
        { data: event },
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      )
      .then(() => console.log('it worked'))
      .catch((err) => console.error('error:', err));
  }

  goBack() {
    console.log('goBack has been clicked!!');
    this.setState({
      clicked: false,
    });
  }

  render() {
    const { word, definition, synonyms, favorites, clicked } = this.state;
    if (clicked) {
      return (
        <div>
          <Favorites favorites={favorites} />
          <button onClick={() => this.goBack()}>Go Back To Home Page</button>
        </div>
      );
    }
    return (
      <div>
        <h1>Dictionary</h1>
        <div>An easy way to learn new words!</div>
        Click on a synonym to add it to your favorites list.
        <pre>
          <input
            placeholder="Enter a word"
            onChange={(e) => this.handleSearch(e)}
          />
        </pre>
        <pre>
          <button onClick={() => this.showFavs()}>Show Favorites</button>{' '}
          <button onClick={() => this.emptyFavs()}>Empty Favorites</button>
        </pre>
        <WordsList
          addFav={this.addFav}
          word={word}
          definition={definition}
          synonyms={synonyms}
          favorites={favorites}
        />
      </div>
    );
  }
}

export default App;