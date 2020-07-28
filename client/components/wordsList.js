import React from 'react';

import Synonyms from './synonyms.js';
// class WordsList extends React.Component {
//   render() {
//     return <div>Hey</div>;
//   }
// }
const WordsList = ({ word, definition, synonyms }) => {
  console.log(synonyms);
  return (
    <div>
      <h2>{word}</h2>
      {definition}
      <h5>Synonyms:</h5>
      <ul>
        {synonyms.map((word) => {
          console.log(word);
          return <Synonyms word={word} key={synonyms[word]} />;
        })}
      </ul>
    </div>
  );
};

export default WordsList;
