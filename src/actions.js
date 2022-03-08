export const PLAYER = { PLAYER1: 'player1', PLAYER2: 'player2' };
// mettre en pause / reprendre le jeu
export const playPause = () => ({ type: 'playPause' });
// redémarrer le jeu
export const restartGame = () => ({ type: 'restart' });
/**
 * un joueur a marqué un point
 * on passe en paramètre le joueur qui a marqué
 * @param player : PLAYER
 * @return {{payload: {player}, type: string}}
 */
export const pointScored = (player) => ({
  type:    'pointScored',
  payload: { player: player },
});