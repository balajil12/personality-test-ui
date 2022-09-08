import { Question } from "./question.interface";

export interface PsyTest {
    id: number;
    name: string;
    description: string;
}

export interface PsyTestWithQuestion {
    id: number;
    name: string;
    description: string;
    questions: Question[];
}
