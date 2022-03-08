import { useDispatch } from 'react-redux';

import { pointScored } from '../actions';

export function Scored({ player }) {
  const dispatch = useDispatch();
  return <button className={'button'}
                 onClick={() => {
                   dispatch(pointScored(player));
                 }}>
    Point Joueur {player === 'player1' ? '1' : '2'}
  </button>;
}