import { createStore } from 'redux';
import produce from 'immer';
// Le state
const initialState = {
  // Le score de chacun des joueurs
  player1: 0,
  player2: 0,
  // Si il y a 40-40 quel joueur a l'avantage
  // On utilise null si pas d'avantage
  advantage: null,
  // Qui a gagné ?
  // Si la partie est en cours on utilise null
  winner: null,
  // La partie est-elle en cours ?
  playing: true,
};

// Les actions creators

// le reducer contient la logique
// c'est une fonction qui reçoit le state et une action
function reducer(state, action) {
  // si l'action est de type "restart"
  if (action.type === 'restart') {
    // on retourne le state initial
    return initialState;
  }
  // si l'action est de type "playPause"
  if (action.type === 'playPause') {
    // on retourne un nouvel objet
    return produce(state, draft => {
      draft.playing = !draft.playing;
    });
  }
  // lorsqu'un joueur marque un point
  if (action.type === 'pointScored') {
    const player = action.payload.player;
    const otherPlayer = player === 'player1' ? 'player2' : 'player1';
    if (state.winner) {
      // le jeu est fini, on ne peut pas marquer
      // on retourne le state
      return state;
    }
    if (state.playing === false) {
      // le jeu est en pause, on ne peut pas marquer
      // on retourne le state
      return state;
    }
    const currentPlayerScore = state[player];
    if (currentPlayerScore <= 15) {
      // le joueur qui a marqué est à 0 ou 15 => on ajoute 15

      return produce(state, draft => {
        draft[player] = currentPlayerScore + 15;
      });
      //return { ...state, [player]: currentPlayerScore + 15 };
    }
    if (currentPlayerScore === 30) {
      // le joueur qui a marqué est à 30 => on passe à 40

      return produce(state, draft => {
        draft[player] = 40;
      });
      //return { ...state, [player]: 40 };
    }
    // si le joueur est déjà à 40
    if (currentPlayerScore === 40) {
      // si l'autre joueur n'est pas à 40
      if (state[otherPlayer] !== 40) {
        // le joueur a gagné !

        return produce(state, draft => {
          draft.winner= player;
        });
        //return { ...state, winner: player };
      }
      // si le joueur a l'avantage
      if (state.advantage === player) {
        // le joueur a gagné !

        return produce(state, draft => {
          draft.winner= player;
        });
      }
      // si personne n'as l'avantage
      if (state.advantage === null) {
        // le joueur a maintenant l'avantage !
        produce(state, draft => {
          draft.advantage= player;
        });
      }
      // sinon c'est l'autre joueur qui a l'avantage
      // l'autre joueur perd l'avantage
      produce(state, draft => {
        draft.advantage= null;
      });
    }
  }

  return state;
}

// on crée le store
export const store = createStore(reducer, initialState);
store.subscribe(() => {
  console.log('Nouveau state:');
  console.log(store.getState());
});