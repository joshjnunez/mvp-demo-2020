import React from 'react';
import axios from 'axios';
import WordsList from './wordsList.js';
import { callAPI } from '../callAPI.js';
import { getFavs } from '../helpers.js';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      word: '',
      definition: '',
      synonyms: [],
    };
  }

  componentDidMount() {
    // // axios.post local host server
    // getFavs(axios)
    //   .then((data) => console.log('here is the data from db:', data))
    //   .catch((err) => console.error(err));
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
  }

  emptyFavs() {
    console.log('emptyFavs has been clicked!!!');
    //axios.post
  }

  addFav() {
    console.log('has been added to favs!!');
  }

  render() {
    const { word, definition, synonyms } = this.state;
    return (
      <div>
        <h1>Dictionary</h1>
        An easy way to learn new words!
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
        />
      </div>
    );
  }
}

export default App;
