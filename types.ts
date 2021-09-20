export enum LifelineType{
    TWO_CHANCES="TWO_CHANCES",
    FIFTY_FIFTY="FIFTY_FIFTY"
}

export interface Question {
    question: string;
    options: string[] | number[];
    answer: 0 | 1 | 2 | 3;
}