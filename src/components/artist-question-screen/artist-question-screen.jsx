import React from 'react';
import PropTypes from 'prop-types';
import {GameType} from '../../const';

const ArtistQuestionScreen = (props) => {
  const {onAnswer, question, renderPlayer} = props;
  const {song, answers} = question;

  return (
    <section className="game__screen">
      <h2 className="game__title">Кто исполняет эту песню?</h2>
      <div className="game__track">
        <div className="track">{renderPlayer(song.src, 0)}</div>
      </div>

      <form className="game__artist">
        {answers.map((answer, i) => (
          <div key={answer.artist} className="artist">
            <input
              className="artist__input visually-hidden"
              type="radio"
              name="answer"
              value={`answer-${i}`}
              id={`answer-${i}`}
              onChange={(evt) => {
                evt.preventDefault();
                onAnswer(question, answer);
              }}
            />
            <label className="artist__name" htmlFor={`answer-${i}`}>
              <img
                className="artist__picture"
                src={answer.picture}
                alt={answer.artist}
              />
              {answer.artist}
            </label>
          </div>
        ))}
      </form>
    </section>
  );
};

ArtistQuestionScreen.propTypes = {
  onAnswer: PropTypes.func.isRequired,
  question: PropTypes.shape({
    type: PropTypes.oneOf([GameType.ARTIST, GameType.GENRE]),
    song: PropTypes.shape({
      artist: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired,
    }).isRequired,
    answers: PropTypes.arrayOf(
        PropTypes.shape({
          picture: PropTypes.string.isRequired,
          artist: PropTypes.string.isRequired,
        })
    ).isRequired,
  }).isRequired,
  renderPlayer: PropTypes.func.isRequired,
};

export default ArtistQuestionScreen;
