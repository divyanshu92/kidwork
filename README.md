# UKG Math Learning App

A React-based educational app for UKG (Upper Kindergarten) students to learn basic math concepts with interactive gameplay and visual feedback.

## Features

- **5 Math Modules**: Addition, Comes Before, Comes After, Comes Between, Missing Number
- **Interactive Scoring**: Star-based reward system (10 points per correct answer)
- **Visual Effects**: Animated crackers and confetti for correct answers
- **Audio Feedback**: Text-to-speech encouragement and sound effects
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Glass-morphism design with smooth animations

## Math Modules

### Addition ➕
- Visual addition with emoji shapes (🍎, ⭐, 🔵, etc.)
- Numbers 1-5 addition problems
- Interactive multiple choice questions
- Example: "What is 3 + 2?" with visual representation

### Comes Before ⬅️
- Number sequence understanding
- "What comes before X?" questions
- Numbers 3-10 range
- Visual format: "__ 5"

### Comes After ➡️
- Forward number sequence
- "What comes after X?" questions
- Numbers 2-9 range
- Visual format: "5 __"

### Comes Between ↔️
- Number pattern recognition
- "What comes between X and Y?" questions
- Sequential number understanding
- Visual format: "3 __ 5"

### Missing Number ❓
- Advanced number sequence patterns
- Find missing numbers in sequences of 5
- Numbers 1-150 range
- Visual format: "12 13 __ 15 16"

## Getting Started

### Installation
```bash
npm install
```

### Development
```bash
npm start
```

### Build
```bash
npm run build
```

### Deploy to GitHub Pages
```bash
npm run deploy
```

## Technologies Used

- **React 18** - Modern React with hooks
- **CSS3** - Advanced styling with glass-morphism effects
- **Web Speech API** - Text-to-speech feedback
- **Web Audio API** - Custom sound effects
- **GitHub Pages** - Deployment platform
- **Responsive Design** - Mobile-first approach

## Project Structure

```
src/
├── components/
│   ├── Home.js          # Main module selection with scoring display
│   └── MathModule.js    # Interactive math question interface
├── App.js               # Main app component with state management
├── index.js             # React entry point
└── index.css            # Advanced CSS with animations and effects
public/
└── index.html           # HTML template
package.json             # Dependencies and GitHub Pages config
```

## Key Features

### Scoring System
- Earn 10 points for each correct answer
- Star display (1 star per 10 points, max 10 stars)
- Persistent score tracking during session

### Visual Feedback
- Animated crackers with sparks for correct answers
- Smooth button hover effects with 3D transforms
- Glass-morphism card design with backdrop blur
- Gradient backgrounds and modern typography

### Audio Features
- Text-to-speech "Good job!" for correct answers
- "Try again!" encouragement for wrong answers
- Custom cracker sound effects using Web Audio API

### Question Generation
- Dynamic question generation for each module
- Randomized multiple choice options
- Visual representations using emojis and symbols
- Progressive difficulty within number ranges

## Deployment

The app is configured for GitHub Pages deployment at: https://divyanshudhiman.github.io/kidwork

To deploy updates:
1. Update the `homepage` field in package.json with your repository URL
2. Run `npm run deploy`

## Development Notes

- Uses modern React patterns with functional components and hooks
- Implements responsive design with Bootstrap-like grid system
- Features advanced CSS animations and transitions
- Includes accessibility considerations with proper contrast and font sizes
- Optimized for touch interactions on mobile devices