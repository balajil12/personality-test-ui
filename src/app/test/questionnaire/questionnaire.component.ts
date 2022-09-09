import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from '../../core/interfaces/question.interface';
import { PsyTestWithQuestion } from '../../core/interfaces/PsyTest.interface';
import { TestService } from '../../core/services/test.service';
import { Answer } from '../../core/interfaces/answer.interface';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit {

  activeIndex = 0;

  test!: PsyTestWithQuestion;

  answers: Answer = {};

  get activeQuestion(): Question {
    return this.test.questions[this.activeIndex];
  }

  get isPreviousButtonActive(): boolean {
    return this.activeIndex > 0;
  }

  get isNextButtonActive(): boolean {
    if (!this.test?.questions?.length) return false;

    return this.activeIndex < (this.test.questions.length - 1);
  }

  get answerValues(): number[] {
    return Object.values(this.answers);
  }

  get answersCount(): number {
    return Object.keys(this.answers).length
  }

  constructor(private readonly testService: TestService,
    private readonly route: ActivatedRoute,
    private readonly router: Router) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.testService.getById(+id).subscribe((test) => {
        this.test = test;
      });
    }
  }

  previous(): void {
    if (this.isPreviousButtonActive) this.activeIndex -=1;
  }

  next(): void {
    if (this.isNextButtonActive) this.activeIndex +=1;
  }

  storeSelections(value: number): void {
    this.answers[this.activeIndex] = value;
  }
}
