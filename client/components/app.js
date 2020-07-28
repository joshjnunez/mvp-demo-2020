import React from 'react';
import axios from 'axios';
import WordsList from './wordsList.js';
import Favorites from './favorites.js';
import { callAPI } from '../callAPI.js';
import { getFavs } from '../helpers.js';
// import '../styles.css';

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
    this.heardIt = this.heardIt.bind(this);
    this.addFav = this.addFav.bind(this);
  }

  componentDidMount() {
    // // axios.post local host server
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
    getFavs(axios).then((data) => {
      console.log(data);
      const synArr = data.data.map((word) => {
        return word.synonym;
      });
      console.log(synArr);
      this.setState({
        favorites: synArr,
        clicked: !this.state.clicked,
      });
    });
  }

  emptyFavs() {
    console.log('emptyFavs has been clicked!!!');
    //axios.delete ???
    axios
      .delete(
        'http://localhost:8080/delete',
        { data: {} },
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

  heardIt(e, id) {
    console.log(e.target.id, id, 'heard it!');
    if (e.target.id === id.toString()) {
      axios
        .put('http://localhost:8080/update', {
          heardIt: true,
        })
        .then((res) => console.log(res))
        .catch((err) => console.error(err));
    }
  }

  render() {
    const { word, definition, synonyms, favorites, clicked } = this.state;
    if (clicked) {
      return (
        <div>
          <Favorites favorites={favorites} heardIt={this.heardIt} />
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
