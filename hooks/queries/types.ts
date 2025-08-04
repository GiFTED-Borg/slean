export interface Challenge {
  id: string;
  title: string;
  description?: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  content: string;
  solution?: string;
  xpReward: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Course {
  createdAt: string;
  description: string;
  id: string;
  imageUrl: string;
  isActive: boolean;
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "EXPERT";
  title: string;
  updatedAt: string;
  _count: {
    topics: number;
  };
  progresses: [];
  completedTopics: number;
}

export interface UserStats {
  currentStreak: number;
  longestStreak: number;
  totalChallengesCompleted: number;
  totalQuizzesCompleted: number;
  totalTopicsCompleted: number;
  totalXP: number;
}

export interface User {
  stats: UserStats;
  avatar: string | null;
  createdAt: string;
  currentStreak: number;
  email: string;
  id: string;
  longestStreak: number;
  updatedAt: string;
  username: string | null;
  walletAddress: string;
  xp: number;
}

export interface Topic {
  content: string;
  courseId: string;
  createdAt: string;
  description: string;
  id: string;
  isActive: boolean;
  order: number;
  title: string;
  updatedAt: string;
  progresses: TopicProgress[];
  quizzes: Quiz[];
}

export interface Question {
  correctAnswer: number; // index of the correct answer
  explanation: string;
  id: string;
  options: string[];
  question: string;
}

export interface Quiz {
  id: string;
  topicId?: string;
  courseId?: string;
  title: string;
  description?: string;
  questions: Question[];
  xpReward: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TopicProgress {
  id: string;
  userId: string;
  courseProgressId: string;
  topicId: string;
  startedAt: string;
  completedAt?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CourseProgress {
  completedAt: string | null;
  courseId: string;
  createdAt: string;
  id: string;
  isActive: boolean;
  startedAt: string;
  updatedAt: string;
  userId: string;
}
