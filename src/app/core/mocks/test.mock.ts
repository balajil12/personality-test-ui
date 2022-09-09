import { PsyTest, PsyTestWithQuestion } from "../interfaces/PsyTest.interface";
import { Question } from "../interfaces/question.interface";

export const testMock: PsyTest = {
    id: 1,
    name: 'Personality Test',
    description:'Personality Test',
};

export const questionMock: Question = {
    id: 1,
    question: 'Test Question',
    options: [
        {
            id: 1,
            option: 'Option A'
        },
        {
            id: 2,
            option: 'Option B'
        },
        {
            id: 3,
            option: 'Option C'
        }
    ]
};

export const questionMock2: Question = {
    id: 2,
    question: 'Test Question',
    options: [
        {
            id: 4,
            option: 'Option A'
        },
        {
            id: 5,
            option: 'Option B'
        },
        {
            id: 6,
            option: 'Option C'
        }
    ]
};

export const testWithQuestionMock: PsyTestWithQuestion = {
    id: testMock.id,
    name: testMock.name,
    description: testMock.description,
    questions: [
        questionMock,
        questionMock2,
    ]
};