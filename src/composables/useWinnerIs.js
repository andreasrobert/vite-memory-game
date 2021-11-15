export default function useWinnerIs(players) {
  let vals = Object.values(players);
  let highScore = Math.max(...vals);
  let tie = vals.filter((x) => x === highScore).length > 1 ? true : false;

  let winner = 0

  function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }

  if(!tie){
    winner = getKeyByValue(players, highScore)
  }
  

  

  return { highScore, tie, winner };
}
