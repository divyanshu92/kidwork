import React, { useState, useEffect } from 'react';

function MathModule({ module, navigateTo, addScore }) {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [questionCount, setQuestionCount] = useState(0);
  const [showCrackers, setShowCrackers] = useState(false);

  const generateQuestion = (type) => {
    const shapes = ['🍎', '⭐', '🔵', '🟡', '❤️', '🔶', '🟢', '🟠', '💜', '🔴'];
    
    switch(type) {
      case 'addition':
        const a = Math.floor(Math.random() * 5) + 1;
        const b = Math.floor(Math.random() * 5) + 1;
        const sum = a + b;
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        const wrongOptions = [sum - 2, sum - 1, sum + 1, sum + 2].filter(x => x > 0 && x !== sum);
        const options = [sum, ...wrongOptions.slice(0, 3)].sort(() => Math.random() - 0.5);
        return {
          question: `What is ${a} + ${b}?`,
          image: `${shape.repeat(a)} + ${shape.repeat(b)}`,
          options: options.map(String),
          correct: String(sum)
        };
        
      case 'before':
        const num = Math.floor(Math.random() * 8) + 3;
        const beforeOptions = [num - 2, num - 1, num + 1, num + 2].filter(x => x > 0);
        return {
          question: `What comes before ${num}?`,
          image: `__ ${num}`,
          options: beforeOptions.slice(0, 4).sort(() => Math.random() - 0.5).map(String),
          correct: String(num - 1)
        };
        
      case 'after':
        const afterNum = Math.floor(Math.random() * 8) + 2;
        const afterOptions = [afterNum - 1, afterNum + 1, afterNum + 2, afterNum + 3];
        return {
          question: `What comes after ${afterNum}?`,
          image: `${afterNum} __`,
          options: afterOptions.sort(() => Math.random() - 0.5).map(String),
          correct: String(afterNum + 1)
        };
        
      case 'between':
        const start = Math.floor(Math.random() * 7) + 2;
        const end = start + 2;
        const middle = start + 1;
        const betweenOptions = [start - 1, middle, end + 1, middle + 1].filter(x => x > 0);
        return {
          question: 'What comes between?',
          image: `${start} __ ${end}`,
          options: betweenOptions.slice(0, 4).sort(() => Math.random() - 0.5).map(String),
          correct: String(middle)
        };
        
      case 'missing':
        const missingNum = Math.floor(Math.random() * 150) + 1;
        const position = Math.floor(Math.random() * 5);
        const sequence = [];
        for (let i = 0; i < 5; i++) {
          sequence.push(i === position ? '__' : String(missingNum - 2 + i));
        }
        const missingOptions = [missingNum - 1, missingNum, missingNum + 1, missingNum + 2].filter(x => x > 0 && x <= 150);
        return {
          question: 'What is the missing number?',
          image: sequence.join(' '),
          options: missingOptions.slice(0, 4).sort(() => Math.random() - 0.5).map(String),
          correct: String(missingNum)
        };
        
      default:
        return null;
    }
  };

  const moduleNames = {
    addition: 'Addition',
    before: 'Comes Before',
    after: 'Comes After',
    between: 'Comes Between',
    missing: 'Missing Number'
  };

  useEffect(() => {
    generateNewQuestion();
  }, [module]);

  const generateNewQuestion = () => {
    const newQuestion = generateQuestion(module);
    setCurrentQuestion(newQuestion);
  };

  const playSound = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.2;
      speechSynthesis.speak(utterance);
    }
  };

  const playCrackerSound = () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  };

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    setShowResult(true);
    
    if (answer === currentQuestion.correct) {
      addScore(10);
      playSound('Good job!');
      playCrackerSound();
      setShowCrackers(true);
      setTimeout(() => setShowCrackers(false), 2000);
    } else {
      playSound('Try again!');
    }
    
    setTimeout(() => {
      setQuestionCount(questionCount + 1);
      setShowResult(false);
      setSelectedAnswer('');
      generateNewQuestion();
    }, 2000);
  };

  if (currentQuestion === null) return null;

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card card-custom p-4 text-center">
            <button 
              className="btn btn-secondary btn-custom mb-3"
              onClick={() => navigateTo(null)}
            >
              🏠 Back to Home
            </button>
            
            <h2 className="h3 fw-bold text-primary mb-3">
              {moduleNames[module]}
            </h2>
            
            <div className="h5 mb-3 text-muted">
              Question {questionCount + 1}
            </div>
            
            <div className="h4 fw-semibold mb-3">
              {currentQuestion.question}
            </div>
            
            <div className="display-6 mb-4 p-3 bg-light rounded-3">
              {currentQuestion.image}
            </div>
            
            {!showResult ? (
              <div className="row g-2">
                {currentQuestion.options.map((option, index) => (
                  <div key={index} className="col-6">
                    <button
                      className="btn btn-outline-primary btn-custom w-100 py-3"
                      onClick={() => handleAnswer(option)}
                      style={{ fontSize: '24px', fontWeight: '600' }}
                    >
                      {option}
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="display-6 p-3 position-relative">
                {selectedAnswer === currentQuestion.correct ? (
                  <div className="text-success">
                    🎉 Great job! +10 ⭐
                    {showCrackers && (
                      <div className="position-absolute bottom-0 start-50 translate-middle-x">
                        <div className="cracker-video">
                          <div className="cracker-burst">🎆</div>
                          <div className="cracker-sparks">
                            <span>✨</span><span>✨</span><span>✨</span>
                            <span>✨</span><span>✨</span><span>✨</span>
                          </div>
                          <div className="cracker-text">Crackers!</div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-danger">
                    😊 Try again!<br/>
                    Answer: {currentQuestion.correct}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MathModule;