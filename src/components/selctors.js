export const slectPlayerHasAdvantage = (playerId) => {
  return (state) => state.advantage === playerId;
};