import React from 'react';

import Synonyms from './synonyms.js';

const WordsList = ({ word, definition, synonyms, addFav }) => {
  return (
    <div>
      <h2>{word}</h2>
      {definition}
      <h5>Synonyms:</h5>
      <ul>
        {synonyms.map((word) => {
          console.log(word);
          return <Synonyms addFav={addFav} word={word} key={synonyms[word]} />;
        })}
      </ul>
    </div>
  );
};

export default WordsList;
