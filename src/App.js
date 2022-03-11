import { Display } from './components/Display';
import { PlayPauseButton } from './components/PlayPauseButton';
import { Restart } from './components/Restart';
import { Scored } from './components/Scored';
import { PLAYER } from './actions';
import { PlayerScore } from './components/PlayerScore';
import { PlayerPoints } from './components/PlayerPoints';

export default function App() {
  return (
    <div id={'root'}>
      <PlayerPoints playerId="player1" playerName="Player 1" />
      <PlayerPoints playerId="player2" playerName="Player 2" />
      <Display/>
      <PlayerScore playerId="player1" playerName="Player1"/>
      <PlayerScore playerId="player2" playerName="Player2"/>
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