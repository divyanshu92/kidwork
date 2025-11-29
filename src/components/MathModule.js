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
        const additionWrongOptions = [sum - 2, sum - 1, sum + 1, sum + 2].filter(x => x > 0 && x !== sum);
        const additionOptions = [sum, ...additionWrongOptions.slice(0, 3)].sort(() => Math.random() - 0.5);
        return {
          question: `What is ${a} + ${b}?`,
          image: `${shape.repeat(a)} + ${shape.repeat(b)}`,
          options: additionOptions.map(String),
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
        
      case 'english':
        const words = {
          3: [
            { word: 'CAT', image: '🐱' },
            { word: 'DOG', image: '🐶' },
            { word: 'SUN', image: '☀️' },
            { word: 'CAR', image: '🚗' },
            { word: 'BAT', image: '🦇' },
            { word: 'HAT', image: '🎩' },
            { word: 'CUP', image: '☕' },
            { word: 'BUS', image: '🚌' }
          ],
          4: [
            { word: 'FISH', image: '🐟' },
            { word: 'BIRD', image: '🐦' },
            { word: 'TREE', image: '🌳' },
            { word: 'BOOK', image: '📚' },
            { word: 'BALL', image: '⚽' },
            { word: 'CAKE', image: '🎂' },
            { word: 'DUCK', image: '🦆' },
            { word: 'FROG', image: '🐸' }
          ]
        };
        
        const wordLength = Math.random() < 0.5 ? 3 : 4;
        const wordList = words[wordLength];
        const correctWord = wordList[Math.floor(Math.random() * wordList.length)];
        
        const wrongWords = wordList
          .filter(w => w.word !== correctWord.word)
          .slice(0, 3)
          .map(w => w.word);
        
        const englishOptions = [correctWord.word, ...wrongWords]
          .sort(() => Math.random() - 0.5);
        
        return {
          question: `What is this ${wordLength}-letter word?`,
          image: correctWord.image,
          options: englishOptions,
          correct: correctWord.word
        };
        
      case 'hindi':
        const hindiWords = {
          3: [
            { word: 'बिल्ली', image: '🐱' },
            { word: 'कुत्ता', image: '🐶' },
            { word: 'सूरज', image: '☀️' },
            { word: 'गाड़ी', image: '🚗' },
            { word: 'पंछी', image: '🐦' },
            { word: 'पेड़', image: '🌳' },
            { word: 'पानी', image: '💧' },
            { word: 'घर', image: '🏠' }
          ],
          4: [
            { word: 'मछली', image: '🐟' },
            { word: 'किताब', image: '📚' },
            { word: 'फूल', image: '🌸' },
            { word: 'खिलौना', image: '🧨' },
            { word: 'सेब', image: '🍎' },
            { word: 'केला', image: '🍌' },
            { word: 'बर्फ', image: '❄️' },
            { word: 'चाँद', image: '🌙' }
          ]
        };
        
        const hindiWordLength = Math.random() < 0.5 ? 3 : 4;
        const hindiWordList = hindiWords[hindiWordLength];
        const correctHindiWord = hindiWordList[Math.floor(Math.random() * hindiWordList.length)];
        
        const wrongHindiWords = hindiWordList
          .filter(w => w.word !== correctHindiWord.word)
          .slice(0, 3)
          .map(w => w.word);
        
        const hindiOptions = [correctHindiWord.word, ...wrongHindiWords]
          .sort(() => Math.random() - 0.5);
        
        return {
          question: `यह क्या है?`,
          image: correctHindiWord.image,
          options: hindiOptions,
          correct: correctHindiWord.word
        };
        
      case 'vyanjan':
        const vyanjans = [
          { letter: 'क', word: 'कमल', image: '🌸' },
          { letter: 'ख', word: 'खरगोश', image: '🐰' },
          { letter: 'ग', word: 'गाय', image: '🐄' },
          { letter: 'घ', word: 'घर', image: '🏠' },
          { letter: 'च', word: 'चाँद', image: '🌙' },
          { letter: 'छ', word: 'छतरी', image: '☂️' },
          { letter: 'ज', word: 'जल', image: '💧' },
          { letter: 'झ', word: 'झंडा', image: '🏴' },
          { letter: 'ट', word: 'टोपी', image: '👑' },
          { letter: 'ठ', word: 'ठंड', image: '❄️' },
          { letter: 'ड', word: 'डाल', image: '🌿' },
          { letter: 'ढ', word: 'ढोल', image: '🥁' },
          { letter: 'त', word: 'तारा', image: '⭐' },
          { letter: 'थ', word: 'थाली', image: '🍽️' },
          { letter: 'द', word: 'दीया', image: '🕯️' },
          { letter: 'ध', word: 'धनुष', image: '🏹' },
          { letter: 'न', word: 'नाव', image: '🚢' },
          { letter: 'प', word: 'पंछी', image: '🐦' },
          { letter: 'फ', word: 'फूल', image: '🌺' },
          { letter: 'ब', word: 'बिल्ली', image: '🐱' },
          { letter: 'भ', word: 'भालू', image: '🐻' },
          { letter: 'म', word: 'मछली', image: '🐟' },
          { letter: 'य', word: 'यंत्र', image: '⚙️' },
          { letter: 'र', word: 'रथ', image: '🚜' },
          { letter: 'ल', word: 'लड़का', image: '👦' },
          { letter: 'व', word: 'वन', image: '🌲' },
          { letter: 'श', word: 'शेर', image: '🦁' },
          { letter: 'ष', word: 'षहद', image: '🍯' },
          { letter: 'स', word: 'सूरज', image: '☀️' },
          { letter: 'ह', word: 'हाथी', image: '🐘' }
        ];
        
        const correctVyanjan = vyanjans[Math.floor(Math.random() * vyanjans.length)];
        
        const wrongVyanjans = vyanjans
          .filter(v => v.letter !== correctVyanjan.letter)
          .slice(0, 3)
          .map(v => v.letter);
        
        const vyanjanOptions = [correctVyanjan.letter, ...wrongVyanjans]
          .sort(() => Math.random() - 0.5);
        
        return {
          question: `${correctVyanjan.word} का पहला अक्षर कौन सा है?`,
          image: correctVyanjan.image,
          options: vyanjanOptions,
          correct: correctVyanjan.letter
        };
        
      case 'alphabet':
        return {
          question: 'Click on letters to hear their sounds!',
          image: 'Interactive Hindi Alphabet',
          options: [],
          correct: '',
          isInteractive: true
        };
        
      case 'missing':
        const startNum = Math.floor(Math.random() * 20) + 5;
        const missingPos = Math.floor(Math.random() * 3) + 1;
        const sequence = [];
        const correctAnswer = startNum + missingPos;
        
        for (let i = 0; i < 5; i++) {
          if (i === missingPos) {
            sequence.push('__');
          } else {
            sequence.push(String(startNum + i));
          }
        }
        
        const missingWrongOptions = [
          correctAnswer - 2,
          correctAnswer - 1, 
          correctAnswer + 1,
          correctAnswer + 2
        ].filter(x => x > 0);
        
        const missingOptions = [correctAnswer, ...missingWrongOptions.slice(0, 3)]
          .sort(() => Math.random() - 0.5);
        
        return {
          question: 'What is the missing number?',
          image: sequence.join(' '),
          options: missingOptions.map(String),
          correct: String(correctAnswer)
        };
        
      case 'comparison':
        const num1 = Math.floor(Math.random() * 20) + 1;
        let num2 = Math.floor(Math.random() * 20) + 1;
        
        while (num1 === num2) {
          num2 = Math.floor(Math.random() * 20) + 1;
        }
        
        const isSmaller = Math.random() < 0.5;
        const correctComp = isSmaller ? Math.min(num1, num2) : Math.max(num1, num2);
        const wrongComp = isSmaller ? Math.max(num1, num2) : Math.min(num1, num2);
        
        const compWrongOptions = [wrongComp];
        while (compWrongOptions.length < 3) {
          const wrongOption = Math.floor(Math.random() * 20) + 1;
          if (wrongOption !== correctComp && !compWrongOptions.includes(wrongOption)) {
            compWrongOptions.push(wrongOption);
          }
        }
        
        const compOptions = [correctComp, ...compWrongOptions.slice(0, 3)]
          .sort(() => Math.random() - 0.5);
        
        return {
          question: `Which number is ${isSmaller ? 'smaller' : 'larger'}?`,
          image: `${num1} ${isSmaller ? '<' : '>'} ${num2}`,
          options: compOptions.map(String),
          correct: String(correctComp)
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
    missing: 'Missing Number',
    comparison: 'Comparison',
    english: 'English Words',
    hindi: 'Hindi Words',
    vyanjan: 'Vyanjan',
    alphabet: 'Hindi Alphabet'
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
    try {
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
    } catch (error) {
      console.log('Audio not supported');
    }
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

  const handleLetterClick = (letter, word) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(`${letter} ${word}`);
      utterance.lang = 'hi-IN';
      utterance.rate = 0.02;
      utterance.pitch = 1.0;
      speechSynthesis.speak(utterance);
    }
    addScore(5);
    playCrackerSound();
  };

  const renderAlphabetGrid = () => {
    const vowels = [
      { letter: 'अ', word: 'अनार' },
      { letter: 'आ', word: 'आम' },
      { letter: 'इ', word: 'इमली' },
      { letter: 'ई', word: 'ईख' },
      { letter: 'उ', word: 'उल्लू' },
      { letter: 'ऊ', word: 'ऊन' },
      { letter: 'ए', word: 'एक' },
      { letter: 'ऐ', word: 'ऐनक' },
      { letter: 'ओ', word: 'ओखली' },
      { letter: 'औ', word: 'औरत' }
    ];
    
    const consonants = [
      { letter: 'क', word: 'कमल' },
      { letter: 'ख', word: 'खरगोश' },
      { letter: 'ग', word: 'गाय' },
      { letter: 'घ', word: 'घर' },
      { letter: 'च', word: 'चाँद' },
      { letter: 'छ', word: 'छतरी' },
      { letter: 'ज', word: 'जल' },
      { letter: 'झ', word: 'झंडा' },
      { letter: 'त', word: 'तारा' },
      { letter: 'द', word: 'दीया' },
      { letter: 'न', word: 'नाव' },
      { letter: 'प', word: 'पंछी' },
      { letter: 'फ', word: 'फूल' },
      { letter: 'ब', word: 'बिल्ली' },
      { letter: 'म', word: 'मछली' },
      { letter: 'य', word: 'यंत्र' },
      { letter: 'र', word: 'रथ' },
      { letter: 'ल', word: 'लड़का' },
      { letter: 'व', word: 'वन' },
      { letter: 'श', word: 'शेर' },
      { letter: 'स', word: 'सूरज' },
      { letter: 'ह', word: 'हाथी' }
    ];

    return (
      <div>
        <h5 className="text-primary mb-3">स्वर (Vowels)</h5>
        <div className="row g-2 mb-4">
          {vowels.map((item, index) => (
            <div key={index} className="col-6 col-md-4 col-lg-3">
              <button
                className="btn btn-success btn-custom w-100 py-2"
                onClick={() => handleLetterClick(item.letter, item.word)}
                style={{ fontSize: '20px', minHeight: '60px' }}
              >
                {item.letter}
              </button>
            </div>
          ))}
        </div>
        
        <h5 className="text-primary mb-3">व्यंजन (Consonants)</h5>
        <div className="row g-2">
          {consonants.map((item, index) => (
            <div key={index} className="col-6 col-md-4 col-lg-3">
              <button
                className="btn btn-warning btn-custom w-100 py-2"
                onClick={() => handleLetterClick(item.letter, item.word)}
                style={{ fontSize: '20px', minHeight: '60px' }}
              >
                {item.letter}
              </button>
            </div>
          ))}
        </div>
      </div>
    );
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
            
            <div className={`mb-4 p-3 bg-light rounded-3 ${
              module === 'english' || module === 'hindi' || module === 'vyanjan' || module === 'alphabet'
                ? 'display-1' 
                : module === 'comparison' 
                ? 'display-5 comparison-display' 
                : 'display-6'
            }`}>
              {currentQuestion.image}
            </div>
            
            {module === 'alphabet' && currentQuestion.isInteractive ? (
              renderAlphabetGrid()
            ) : !showResult ? (
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