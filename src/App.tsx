import { useEffect, useState, useCallback, useRef } from 'react';
import './App.scss';

interface Card {
  id: number;
  src: string;
}

interface CardImage {
  src: string;
}

function shuffle(arr: CardImage[]): CardImage[] {
  // Fisher-Yates Shuffle
  const newArr = [...arr];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

const fetchImages = async () => {
  try {
    const response = await fetch('http://localhost:3001/images', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    const result = (await response.json()) as CardImage[];
    return result;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

function App() {
  const [cardImages, setCardImages] = useState<CardImage[]>([]);
  const [cards, setCards] = useState<Card[]>([]);
  const [turns, setTurns] = useState(0);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchImages()
      .then((result) => {
        setCardImages(result);
        setSuccess(true);
      })
      .catch((error) => {
        console.error('Failed to fetch images:', error);
      });
  }, []);

  const performShuffling = useCallback(() => {
    let shuffledCards = [...cardImages, ...cardImages];
    shuffledCards = shuffle(shuffledCards);

    const cardsWithId = shuffledCards.map((card, index) => ({
      ...card,
      id: index,
    }));

    setCards(cardsWithId);
    setTurns(0);
  }, [cardImages]);

  const performShufflingRef = useRef(performShuffling);

  useEffect(() => {
    performShufflingRef.current = performShuffling;
  });

  useEffect(() => {
    if (success) {
      performShufflingRef.current();
    }
  }, [success]);

  console.log(cards, turns);

  return (
    <>
      <div className="App">
        <h1>بازی جادویی</h1>
        <button onClick={success ? performShuffling : undefined}>
          شروع مجدد
        </button>
      </div>
    </>
  );
}

export default App;
