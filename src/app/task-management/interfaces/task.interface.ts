export interface Task {
    id: number;
    name: string;
    description: string;
    status: string;
}

export const taskStatuses = [
    'STATUS_TODO', 
    'STATUS_DONE'
]



