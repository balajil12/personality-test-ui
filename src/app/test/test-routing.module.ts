import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { ResultComponent } from './result/result.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  {
    path: ':id',
    component: TestComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: QuestionnaireComponent
      },
      {
        path: 'result',
        component: ResultComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestRoutingModule { }
