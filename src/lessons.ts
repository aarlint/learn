export interface LessonDef {
  id: string
  title: string
  description: string
  icon: string
  accent: string
  tags: string[]
}

export interface GradeDef {
  id: string
  label: string
  shortLabel: string
}

export const users = {
  emma: {
    name: 'Emma',
    emoji: '🦋',
    color: '#a48bdb',
    grades: [
      { id: '3', label: '3rd Grade', shortLabel: '3rd' },
      { id: '4', label: '4th Grade', shortLabel: '4th' },
    ] as GradeDef[],
    defaultGrade: '3',
  },
  owen: {
    name: 'Owen',
    emoji: '🚀',
    color: '#3fc1f0',
    grades: [
      { id: 'k', label: 'Kindergarten', shortLabel: 'K' },
    ] as GradeDef[],
    defaultGrade: 'k',
  },
} as const

// Lessons keyed by "user-grade"
export const lessons: Record<string, LessonDef[]> = {
  // Emma 3rd Grade
  'emma-3': [
    {
      id: 'geometry-galaxy',
      title: 'Geometry Galaxy',
      description: 'Shapes, angles, perimeter, area, and fractions',
      icon: '✨',
      accent: '#a48bdb',
      tags: ['Math', 'Geometry', 'Fractions'],
    },
    {
      id: 'multiplication-quest',
      title: 'Multiplication Quest',
      description: 'Master your times tables with fun challenges',
      icon: '✖️',
      accent: '#3fc1f0',
      tags: ['Math', 'Multiplication'],
    },
    {
      id: 'word-explorer',
      title: 'Word Explorer',
      description: 'Vocabulary, spelling patterns, and word families',
      icon: '📖',
      accent: '#22c55e',
      tags: ['ELA', 'Vocabulary'],
    },
    {
      id: 'reading-adventure',
      title: 'Reading Adventure',
      description: 'Reading comprehension and story elements',
      icon: '📚',
      accent: '#e5a00d',
      tags: ['ELA', 'Reading'],
    },
    {
      id: 'time-money',
      title: 'Time & Money',
      description: 'Telling time and counting coins & bills',
      icon: '🕐',
      accent: '#ec4899',
      tags: ['Math', 'Life Skills'],
    },
    {
      id: 'science-lab',
      title: 'Science Lab',
      description: 'Plants, animals, weather, and the scientific method',
      icon: '🔬',
      accent: '#fb923c',
      tags: ['Science'],
    },
  ],

  // Emma 4th Grade - Core Competencies
  'emma-4': [
    {
      id: 'multi-digit-math',
      title: 'Multi-Digit Math',
      description: 'Multiply and divide multi-digit numbers',
      icon: '🔢',
      accent: '#3fc1f0',
      tags: ['Math', 'Multiplication', 'Division'],
    },
    {
      id: 'fractions-mastery',
      title: 'Fractions Mastery',
      description: 'Add, subtract, and compare fractions with unlike denominators',
      icon: '🥧',
      accent: '#a48bdb',
      tags: ['Math', 'Fractions'],
    },
    {
      id: 'decimals-place-value',
      title: 'Decimals & Place Value',
      description: 'Understand decimals to hundredths and place value',
      icon: '📊',
      accent: '#22c55e',
      tags: ['Math', 'Decimals'],
    },
    {
      id: 'geometry-measurement',
      title: 'Geometry & Measurement',
      description: 'Angles, symmetry, area, and perimeter of complex shapes',
      icon: '📐',
      accent: '#ec4899',
      tags: ['Math', 'Geometry'],
    },
    {
      id: 'reading-informational',
      title: 'Informational Text',
      description: 'Main idea, text structure, and informational reading',
      icon: '📰',
      accent: '#e5a00d',
      tags: ['ELA', 'Reading'],
    },
    {
      id: 'writing-workshop',
      title: 'Writing Workshop',
      description: 'Paragraphs, essays, and opinion writing',
      icon: '✍️',
      accent: '#fb923c',
      tags: ['ELA', 'Writing'],
    },
    {
      id: 'grammar-language',
      title: 'Grammar & Language',
      description: 'Parts of speech, sentence structure, and punctuation',
      icon: '📝',
      accent: '#14b8a6',
      tags: ['ELA', 'Grammar'],
    },
    {
      id: 'science-earth-space',
      title: 'Earth & Space Science',
      description: 'Rocks, minerals, weather patterns, and the solar system',
      icon: '🌍',
      accent: '#8b5cf6',
      tags: ['Science'],
    },
  ],

  // Owen Kindergarten
  'owen-k': [
    {
      id: 'number-heroes',
      title: 'Number Heroes',
      description: 'Counting to 20, recognizing numbers, and comparing amounts',
      icon: '🔢',
      accent: '#3fc1f0',
      tags: ['Math', 'Numbers'],
    },
    {
      id: 'addition-subtraction',
      title: 'Add & Subtract',
      description: 'Addition and subtraction within 10 using pictures and objects',
      icon: '➕',
      accent: '#22c55e',
      tags: ['Math', 'Operations'],
    },
    {
      id: 'phonics-fun',
      title: 'Phonics Fun',
      description: 'Letter sounds, beginning sounds, and simple CVC words',
      icon: '🔤',
      accent: '#a48bdb',
      tags: ['ELA', 'Phonics'],
    },
    {
      id: 'reading-rockets',
      title: 'Reading Rockets',
      description: 'Sight words, rhyming, and simple sentence reading',
      icon: '🚀',
      accent: '#e5a00d',
      tags: ['ELA', 'Reading'],
    },
    {
      id: 'shapes-patterns',
      title: 'Shapes & Patterns',
      description: 'Circles, squares, triangles, and simple patterns',
      icon: '🔷',
      accent: '#ec4899',
      tags: ['Math', 'Geometry'],
    },
    {
      id: 'animal-world',
      title: 'Animal World',
      description: 'Baby animals, animal sounds, and where animals live',
      icon: '🦎',
      accent: '#fb923c',
      tags: ['Science'],
    },
  ],
}

// Helper to get lessons for a user at a specific grade
export function getLessonsForGrade(userId: string, gradeId: string): LessonDef[] {
  return lessons[`${userId}-${gradeId}`] || []
}

// Helper to get user's grade label
export function getGradeLabel(userId: string, gradeId: string): string {
  const user = users[userId as keyof typeof users]
  if (!user) return ''
  const grade = user.grades.find(g => g.id === gradeId)
  return grade?.label || ''
}
