import { Display } from './components/Display';
import { PlayPauseButton } from './components/PlayPauseButton';
import { Restart } from './components/Restart';
import { Scored } from './components/Scored';
import { PLAYER } from './actions';

export default function App() {
  return (
    <div id={'root'}>
      <Display/>
      <div className={'buttons'}>
        <div className={'buttons-row'}>
          <Scored player={PLAYER.PLAYER1}></Scored>
          <Scored player={PLAYER.PLAYER2}></Scored>
        </div>
        <div className={'buttons-row'}>
          <Restart/>
          <PlayPauseButton/>
        </div>
      </div>
    </div>
  );
}