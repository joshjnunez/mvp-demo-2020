import React from 'react';

const Synonyms = ({ word, addFav }) => {
  console.log(word);
  return (
    <li id="syn" onClick={() => addFav()}>
      {word}
    </li>
  );
};
export default Synonyms;
