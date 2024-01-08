import './Card.scss';

interface Props {
  src: string;
  delay: React.CSSProperties;
  isShufflingComplete: boolean;
}

function Card({ src, delay, isShufflingComplete }: Props) {
  return (
    <div className={isShufflingComplete ? 'card' : ''} style={delay}>
      <div>
        <img className="front" src={src} alt="card front-side" />
        {/* <img className="back" src="/img/cover.png" alt="card back-side" /> */}
      </div>
    </div>
  );
}

export default Card;
