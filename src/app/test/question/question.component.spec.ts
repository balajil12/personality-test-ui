import { ComponentFixture, TestBed } from '@angular/core/testing';
import { questionMock } from '../../core/mocks/test.mock';

import { QuestionComponent } from './question.component';

describe('QuestionComponent', () => {
  let component: QuestionComponent;
  let fixture: ComponentFixture<QuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionComponent);
    component = fixture.componentInstance;

    component.index = 0;
    component.question = questionMock;
    component.selectedId = 1;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the selected option id', () => {
    const emitterSpy = spyOn(component.selectedOption, 'emit');
    component.selectionChanged({
      value: 1,
      source: {} as any
    });

    expect(emitterSpy).toHaveBeenCalledWith(1);    
  });
});
