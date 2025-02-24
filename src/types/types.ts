//TYPES

type Category = {
    id: number,
    name: string;
}

type Activity = {
    id: string,
    category: number,
    name: string,
    calories: number
}

export type {
    Category,
    Activity
}