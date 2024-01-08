import { useState } from 'react';
import './App.scss';
import CardList from './Components/CardList';

function App() {
  const [resetEn, setResetEn] = useState(false);
  function ResetCards(): void {
    setResetEn(true);
  }

  return (
    <>
      <div className="App">
        <h1>بازی جادویی</h1>
        <CardList resetEn={resetEn} setResetEn={setResetEn} />
        <button onClick={ResetCards}>شروع مجدد</button>
      </div>
    </>
  );
}

export default App;
