import { useSelector } from 'react-redux';
import { slectPlayerHasAdvantage } from './selctors';

export function PlayerScore({ playerId, playerName }) {
  const score = useSelector((state) => state[playerId]);
  const hasAdvantage = useSelector(slectPlayerHasAdvantage(playerId));

  return (
    <div className="player-score">
      <p>{playerName}</p>
      <p>{(hasAdvantage ? 'Avantage - ' : ' ') + score}</p>
    </div>
  );
}