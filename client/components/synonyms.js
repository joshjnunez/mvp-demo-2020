import React from 'react';

const Synonyms = ({ word, addFav }) => {
  console.log(word);
  return (
    <li id={word} onClick={(e, id) => addFav(e, id)}>
      {word}
    </li>
  );
};
export default Synonyms;
