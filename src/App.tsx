import { useEffect, useState, useCallback, useRef } from 'react';
import './App.scss';

interface Card {
  id: number;
  src: string;
}

interface CardImage {
  src: string;
}

function App() {
  const [cardImages, setCardImages] = useState<CardImage[]>([]);
  const [cards, setCards] = useState<Card[]>([]);
  const [turns, setTurns] = useState(0);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
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
        setCardImages(result);
        setSuccess(true);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchImages().catch((error) => {
      console.error('Failed to fetch images:', error);
    });
  }, []);

  const performShuffling = useCallback(() => {
    const shuffledCards = [...cardImages, ...cardImages];

    // Fisher-Yates Shuffle
    for (let i = shuffledCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledCards[i], shuffledCards[j]] = [
        shuffledCards[j],
        shuffledCards[i],
      ];
    }

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
