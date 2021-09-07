export interface Tag {
    name: string;
    color?: string;
}
export interface Card {
    text: string;
    speaker?: string;
    tags?: Tag[];
    image?: string;
    createdAt?: Date;
    issueType?: IssueType;
}

// export interface Issue {
//     name: IssueType;
//     color: string;
// }

export enum IssueType {
    Task = 'task',
    SubTask = 'sub-task',
    Bug = 'bug',
    Epic = 'epic',
    Story = 'story'
}

export interface List {
    title: string;
    cards: Card[];
    id: string;
}

export interface Board {
    title: string;
    lists: List[];
}
