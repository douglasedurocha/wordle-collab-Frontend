import React from 'react';

const WordleWord = ({ word, hint }) => {
    const colors = {
        0: "#000000", // black
        1: "#FFA500", // orange
        2: "#008000", // green
    };

    return (
        <div>
            {word.split("").map((letter, i) => (
                <span key={i}>
                    <span style={{color: colors[hint[i]]}}>{letter}</span>
                </span>
            ))}
        </div>
    );
};

export default WordleWord;
