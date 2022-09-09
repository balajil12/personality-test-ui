import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { Question } from '../../core/interfaces/question.interface';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent {
  @Input() question!: Question;

  @Input() index!: number;

  @Input() selectedId?: number;

  @Output() selectedOption = new EventEmitter<number>();

  selectionChanged(change: MatRadioChange): void {
    this.selectedOption.emit(change.value);
  }
}
