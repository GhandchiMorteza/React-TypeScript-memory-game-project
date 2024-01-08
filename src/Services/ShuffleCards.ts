import { useCallback, useEffect, useState } from 'react';
import { CardId, CardImage } from '../types';
import { shuffle } from '../Utils/helperFunctions';

function useShuffleCards(
  cardImages: CardImage[],
  success: boolean,
  resetEn: boolean,
  setResetEn: (value: boolean) => void
) {
  const [cards, setCards] = useState<CardId[]>([]);
  const [turns, setTurns] = useState(0);
  const [isShufflingComplete, setIsShufflingComplete] = useState(false);

  const performShuffling = useCallback(() => {
    setIsShufflingComplete(false);
    let shuffledCards = [...cardImages, ...cardImages];
    shuffledCards = shuffle(shuffledCards);

    const cardsWithId = shuffledCards.map((card, index) => ({
      ...card,
      id: index,
    }));

    setCards(cardsWithId);
    setTurns(0);
    setTimeout(() => {
      setIsShufflingComplete(true);
    }, 0.1);
  }, [cardImages]);

  useEffect(() => {
    if (success) {
      performShuffling();
    }
  }, [success, performShuffling]);

  useEffect(() => {
    if (resetEn) {
      performShuffling();
      setResetEn(false);
    }
  }, [resetEn, performShuffling, setResetEn]);

  return { cards, turns, isShufflingComplete };
}

export default useShuffleCards;
