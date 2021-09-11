import {AutomaticCleanUp, IssueType, MaxEpics, MaxTasksPerEpic, Priority, SaturdayEnabled, Version} from './enum.models';

export interface User {
  email: string;
  maxActiveEpics: MaxEpics;
  maxActiveTaskPerEpic: MaxTasksPerEpic;
  automaticCleanUp: AutomaticCleanUp;
  saturdayEnabled: SaturdayEnabled;
  subscription: Version;
  endOfSub?: Date;
}

export interface WeeklyStats {
  hoursWorked: number;
  epicsDone: number;
  tasksDone: number;
}

export interface Board {
  title: string;
  lists: List[];
  epics: Epic[];
  cards: Card[];
  weeklyStats: WeeklyStats;
}

export interface Epic {
  title: string;
  description: string;
  estimatedHours?: number;
  tags?: Tag;
  priority: Priority;
  createdAt: string;
  issueType?: IssueType;
}

export interface List {
  title: string;
  cards: Card[];
  id: string;
}

export interface Card {
  text: string;
  speaker?: string;
  tags?: Tag[];
  image?: string;
  createdAt?: Date;
  issueType?: IssueType;
}


export interface Tag {
  name: string;
  color?: string;
}

