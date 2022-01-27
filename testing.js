const pokemon = require('pokemon.js');

const init = async () => {
  pokemon.setLanguage('english');

  /* 
  for (let i = 1; i <= 8; i++) {
    const generation = await pokemon.getGeneration(i.toString());
    const games = generation.games;
    console.log(games);
  }
  */
  
  const psyduck = await pokemon.getPokemon('Psyduck')
  console.log(psyduck.types);
}

init();