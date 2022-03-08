//Import useDispatch from redux
import { useDispatch } from 'react-redux';
import { playPause } from '../actions';

export function PlayPauseButton() {
  const dispatch = useDispatch();

  return <button className={"button"}
    onClick={() => {
      dispatch(playPause());
    }}>
    Pause / Reprendre
  </button>;
}