import { useSelector } from 'react-redux';

export function Display() {
  const gameIsPlaying = useSelector(state => state.playing);
  const playing = useSelector(state => state.playing);
  const winner = useSelector(state => state.winner);
  const player1Score = useSelector(state => state.player1);
  const player2Score = useSelector(state => state.player2);
  const advantage = useSelector(state => state.advantage);
  const score = updateScoreText(playing, winner, player1Score, player2Score, advantage);
  return <p className={'display'} id={'score'}>{score}</p>;
}

function updateScoreText(
  playing,
  winner = null,
  player1Score = 0,
  player2Score = 0,
  advantage = null,
) {
  let score = '';
  if (winner) {
    if (winner === 'player1') {
      score = 'Joueur 1 gagne';
    } else {
      score = 'Joueur 2 gagne';
    }
  } else if (playing === false) {
    score = 'C\'est la pause';
  } else {
    let text = 'Le score est: ' + player1Score + ' - ' + player2Score;
    if (advantage) {
      if (advantage === 'player1') {
        text += ' avantage joueur 1';
      } else {
        text += ' avantage joueur 2';
      }
    }
    score = text;
  }
  return score;
}
