import { useSelector } from 'react-redux';
import { selectDisplayText } from './selectors';

export function Display() {
  const displayText = useSelector(selectDisplayText);
  return <p className="display" id="score">{displayText}</p>;
}