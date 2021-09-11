export enum Version {
  lite = 0,
  pro = 1,
}

export enum AutomaticCleanUp {
  lite = 0,
  pro = 1,
}

export enum SaturdayEnabled {
  lite = 0,
  pro = 1,
}

export enum MaxEpics {
  lite = 7,
  pro = 100,
}

export enum MaxTasksPerEpic {
  lite = 3,
  pro = 100,
}

export enum Priority {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
}

export enum Flag {
  Planned = 'Planned',
  WIP = 'WorkInProgress',
  Done = 'Done',
}

export enum IssueType {
  Task = 'task',
  SubTask = 'sub-task',
  Bug = 'bug',
  Epic = 'epic',
  Story = 'story'
}
