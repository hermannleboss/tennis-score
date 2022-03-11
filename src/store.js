import { createStore } from 'redux';
import produce from 'immer';
import { pointScored, setPlaying } from './actions';
// Le state
const initialState = {
  player1:   0,
  player2:   0,
  advantage: null,
  winner:    null,
  playing:   false,
  // historique des jeux joués
  history: [
    // { player1: 15, player2: 40, winner: "player2" }
  ],
};


export const autoplay = (store) => {
  const isPlaying = store.getState().playing;
  if (isPlaying) {
    return;
  }
  // on indique que la partie est en cours
  store.dispatch(setPlaying(true));
  // on utilise setTimeout pour attendre 2 secondes
  window.setTimeout(() => {
    // le jeu est-il toujours en cours ?
    if (store.getState().playing === false) {
      // Si non, on ne fait rien
      return;
    }
    // si oui on marque un point aléatoire
    const pointWinner = Math.random() > 0.5 ? 'player1' : 'player2';
    store.dispatch(pointScored(pointWinner));
    // on remet le jeu en pause
    store.dispatch(setPlaying(false));
  }, 2000);
}

// Les actions creators

// le reducer contient la logique
// c'est une fonction qui reçoit le state et une action
function reducer(state, action) {
  // si l'action est de type "restart"
  if (action.type === 'restart') {
    return produce(state, (draft) => {
      // si le match est terminé, on ajoute un élément à l'historique
      if (draft.winner) {
        draft.history.push({
          player1: draft.player1,
          player2: draft.player2,
          winner:  draft.winner,
        });
      }
      // puis on reset les autres propriétés
      draft.player1 = 0;
      draft.player2 = 0;
      draft.advantage = null;
      draft.winner = null;
      draft.playing = false;
    });
  }
  // dans le reducer
  if (action.type === 'setPlaying') {
    if (state.winner) {
      return state;
    }
    return produce(state, (draft) => {
      draft.playing = action.payload;
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
          draft.winner = player;
        });
        //return { ...state, winner: player };
      }
      // si le joueur a l'avantage
      if (state.advantage === player) {
        // le joueur a gagné !

        return produce(state, draft => {
          draft.winner = player;
        });
      }
      // si personne n'as l'avantage
      if (state.advantage === null) {
        // le joueur a maintenant l'avantage !

        //return { ...state, advantage: player };
        return produce(state, draft => {
          draft.advantage = player;
        });
      }
      // sinon c'est l'autre joueur qui a l'avantage
      // l'autre joueur perd l'avantage
      return produce(state, draft => {
        draft.advantage = null;
      });
    }
  }
  return state;
}


// on crée le store
export const store = createStore(reducer, initialState);

store.subscribe(() => {
  console.log("Nouveau state:");
  console.log(store.getState());
});