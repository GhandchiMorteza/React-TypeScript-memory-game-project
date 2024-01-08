import { useEffect, useState } from 'react';
import { CardImage } from '../types';

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

function useFetchCardImages() {
  const [cardImages, setCardImages] = useState<CardImage[]>([]);
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

  return { cardImages, success };
}

export default useFetchCardImages;
