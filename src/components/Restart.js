import { useDispatch } from 'react-redux';

import {restartGame  } from '../actions';

export function Restart({ player }) {
  const dispatch = useDispatch();
  return <button className={'button'}
                 onClick={() => {
                   dispatch(restartGame());
                 }}>
    Remettre a zéro
  </button>;
}