import React, { useState } from 'react';
import Home from './components/Home';
import MathModule from './components/MathModule';

function App() {
  const [currentModule, setCurrentModule] = useState(null);
  const [score, setScore] = useState(0);

  const navigateTo = (module) => {
    setCurrentModule(module);
  };

  const addScore = (points) => {
    setScore(score + points);
  };

  return (
    <div className="min-vh-100 p-3">
      {currentModule ? (
        <MathModule 
          module={currentModule} 
          navigateTo={navigateTo} 
          addScore={addScore} 
        />
      ) : (
        <Home navigateTo={navigateTo} score={score} />
      )}
    </div>
  );
}

export default App;