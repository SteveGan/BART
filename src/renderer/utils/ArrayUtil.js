// Fisher-Yates shuffle
export const shuffleArray = function(array){
  for(let i = array.length - 1; i > 0; i--){
    const j = Math.floor(Math.random()*(i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}