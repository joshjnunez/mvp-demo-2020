import React from 'react';
import axios from 'axios';
import WordsList from './wordsList.js';

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
    // axios
    //   .get('https://wordsapiv1.p.rapidapi.com/words/happy', {
    //     headers: {
    //       'x-rapidapi-key':
    //         '742d7aef04msh843daabf7474b71p1ecb13jsna0c64caa556a',
    //     },
    //   })
    //   .then((res) => console.log(res))
    //   .catch((err) => console.error(err));
  }

  handleSearch(event) {
    axios
      .get(`https://wordsapiv1.p.rapidapi.com/words/${event.target.value}`, {
        headers: {
          'x-rapidapi-key':
            '742d7aef04msh843daabf7474b71p1ecb13jsna0c64caa556a',
        },
      })
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
          <button>Show Favorites</button> <button>Empty Favorites</button>
        </pre>
        <WordsList word={word} definition={definition} synonyms={synonyms} />
      </div>
    );
  }
}

export default App;
