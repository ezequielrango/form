import './App.css';
import { useEffect, useState } from 'react';
import Board from './components/Board/Board';
const emojiList = [...'💣🧤🎩🌮🎱🌶🍕🦖🍉🏈🍩🍓🍎🥑🍪🍰🍔⚽🚜🚀⌚💰🔫🎊'];

const App = () => {

    // 1 Para guardar las imagenes - 2 Para modificar ésta variable luego
  const [shuffledMemoBlocks, setShuffledMemoBlocks ] = useState([]);
  const [selectedMemoBlock,setSelectedMemoBlock] = useState(null)
  const [animating, setAnimating] = useState(false);


  useEffect( () => { // se ejecuta la 1era vez que se renderiza
    // a la función se le pasan 2 array, porque cada elemento tiene su coincidencia
    const shuffledEmojiList = shuffleArray([...emojiList, ...emojiList]);
    setShuffledMemoBlocks(shuffledEmojiList.map( (emoji, i) => ({ index: i, emoji, flipped: false}) ));
  }, []);
  

  const shuffleArray = a => {  // Recibe un array, y lo retorna con sus posiciones aleatorias
    
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  const handleMemoClick = memoBlock => {
    const flippedMemoBlock = { ...memoBlock, flipped: true };
    let shuffledMemoBlocksCopy = [...shuffledMemoBlocks];
    shuffledMemoBlocksCopy.splice(memoBlock.index, 1, flippedMemoBlock);
    setShuffledMemoBlocks(shuffledMemoBlocksCopy);
    if(selectedMemoBlock === null) {
      setSelectedMemoBlock(memoBlock);
    } else if(selectedMemoBlock.emoji === memoBlock.emoji) {
      setSelectedMemoBlock(null);
    } else {
      setAnimating(true);
      setTimeout(() => {
        shuffledMemoBlocksCopy.splice(memoBlock.index, 1, memoBlock);
        shuffledMemoBlocksCopy.splice(selectedMemoBlock.index, 1, selectedMemoBlock);
        setShuffledMemoBlocks(shuffledMemoBlocksCopy);
        setSelectedMemoBlock(null);
        setAnimating(false);
      }, 1000);
    }
  }

  return (
    <Board memoBlocks={shuffledMemoBlocks} animating={animating}  handleMemoClick={handleMemoClick} />
  );
}

export default App;