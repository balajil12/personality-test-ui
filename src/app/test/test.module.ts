import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from  '../shared/shared.module';
import { TestComponent } from './test/test.component';
import { QuestionComponent } from './question/question.component';
import { TestRoutingModule } from './test-routing.module';
import { ResultComponent } from './result/result.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';

@NgModule({
  declarations: [
    TestComponent,
    QuestionComponent,
    ResultComponent,
    QuestionnaireComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TestRoutingModule,
  ]
})
export class TestModule { }
