import PropTypes from 'prop-types';

const WordleWord = ({ word, hint }) => {
  WordleWord.propTypes = {
    word: PropTypes.string.isRequired,
    hint: PropTypes.string.isRequired,
  };

  const colors = {
    0: '#000000', // black
    1: '#FFA500', // orange
    2: '#008000', // green
  };

  return (
    <div>
      {word.split('').map((letter, i) => (
        <span key={i}>
          <span style={{ color: colors[hint[i]] }}>{letter}</span>
        </span>
      ))}
    </div>
  );
};

export default WordleWord;
