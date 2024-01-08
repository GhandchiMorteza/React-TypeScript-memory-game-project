import './CardList.scss';
import Card from './Card';
import useFetchCardImages from '../Services/FetchCardImages';
import useShuffleCards from '../Services/ShuffleCards';

interface Props {
  resetEn: boolean;
  setResetEn: (value: boolean) => void;
}

function CardList({ resetEn, setResetEn }: Props) {
  const { cardImages, success } = useFetchCardImages();
  const { cards, turns, isShufflingComplete } = useShuffleCards(
    cardImages,
    success,
    resetEn,
    setResetEn
  );

  return (
    <>
      <div className="card-grid">
        {isShufflingComplete
          ? cards.map((card) => (
              <Card
                key={card.id}
                src={card.src}
                delay={{ animationDelay: `${card.id * 100}ms` }}
                isShufflingComplete={isShufflingComplete}
              />
            ))
          : ''}
      </div>
      <div>{turns}</div>
    </>
  );
}

export default CardList;
