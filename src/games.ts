export interface GameDef {
  id: string
  title: string
  description: string
  icon: string
  accent: string
  tags: string[]
  minAge?: number // approximate grade level
}

// Games available per user
export const games: Record<string, GameDef[]> = {
  // Emma's games (3rd-4th grade level)
  emma: [
    {
      id: 'angle-cannon',
      title: 'Shape Shooter',
      description: 'Aim and shoot the correct quadrilateral!',
      icon: '🎯',
      accent: '#8b5cf6',
      tags: ['Geometry', 'Shapes'],
    },
    {
      id: 'angle-ace',
      title: 'Angle Ace',
      description: 'Is it acute, right, or obtuse? You decide!',
      icon: '📐',
      accent: '#14b8a6',
      tags: ['Geometry', 'Angles'],
    },
    {
      id: 'math-invaders',
      title: 'Math Invaders',
      description: 'Defend Earth by solving math problems!',
      icon: '👾',
      accent: '#8b5cf6',
      tags: ['Math', 'Arcade'],
    },
    {
      id: 'fraction-frenzy',
      title: 'Fraction Frenzy',
      description: 'Slice pizzas into the correct fractions!',
      icon: '🍕',
      accent: '#f59e0b',
      tags: ['Math', 'Fractions'],
    },
    {
      id: 'word-scramble',
      title: 'Word Scramble',
      description: 'Unscramble words before time runs out!',
      icon: '🔤',
      accent: '#22c55e',
      tags: ['ELA', 'Vocabulary'],
    },
    {
      id: 'times-table-race',
      title: 'Times Table Race',
      description: 'Race to answer multiplication facts!',
      icon: '🏎️',
      accent: '#3b82f6',
      tags: ['Math', 'Multiplication'],
    },
    {
      id: 'multiplication-quest',
      title: 'Multiplication Quest',
      description: 'Cast spells by solving × and ÷ problems!',
      icon: '🧙‍♀️',
      accent: '#f59e0b',
      tags: ['Math', 'Multiplication', 'Division'],
    },
  ],

  // Owen's games (Kindergarten level)
  owen: [
    {
      id: 'number-pop',
      title: 'Number Pop',
      description: 'Pop the balloons with the right numbers!',
      icon: '🎈',
      accent: '#ec4899',
      tags: ['Numbers', 'Counting'],
    },
    {
      id: 'shape-catcher',
      title: 'Shape Catcher',
      description: 'Catch the shapes falling from the sky!',
      icon: '🔷',
      accent: '#3fc1f0',
      tags: ['Shapes', 'Geometry'],
    },
    {
      id: 'letter-launch',
      title: 'Letter Launch',
      description: 'Launch rockets by matching letters!',
      icon: '🚀',
      accent: '#a48bdb',
      tags: ['Letters', 'Phonics'],
    },
    {
      id: 'addition-adventure',
      title: 'Addition Adventure',
      description: 'Cast spells to defeat monsters with addition!',
      icon: '🧙',
      accent: '#8b5cf6',
      tags: ['Math', 'Addition'],
    },
    {
      id: 'color-splash',
      title: 'Color Splash',
      description: 'Paint by matching colors and words!',
      icon: '🎨',
      accent: '#f59e0b',
      tags: ['Colors', 'Reading'],
    },
    {
      id: 'maze-runner',
      title: 'Maze Runner',
      description: 'Guide your guy through the maze to the finish!',
      icon: '🏁',
      accent: '#3b82f6',
      tags: ['Logic', 'Problem Solving'],
    },
  ],
}

export function getGamesForUser(userId: string): GameDef[] {
  return games[userId] || []
}
