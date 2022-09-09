import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { MockProviders } from 'ng-mocks';
import { of } from 'rxjs';
import { testWithQuestionMock } from '../../core/mocks/test.mock';
import { TestService } from '../../core/services/test.service';

import { QuestionnaireComponent } from './questionnaire.component';

describe('QuestionnaireComponent', () => {
  let component: QuestionnaireComponent;
  let fixture: ComponentFixture<QuestionnaireComponent>;
  let getByIdSpy: jasmine.Spy;
  const testId = 1;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionnaireComponent ],
      providers:[
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({
                id: testId,
              })
            }
          }
        },
        MockProviders(TestService, Router)
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnaireComponent);
    component = fixture.componentInstance;

    const testService = TestBed.inject(TestService);
    getByIdSpy = spyOn(testService, 'getById').and.returnValue(of(testWithQuestionMock))
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit() method', () => {
    it('should call getById method', fakeAsync(() => {
      component.ngOnInit();

      tick(100);

      expect(getByIdSpy).toHaveBeenCalledWith(testId);
      expect(component.test).toEqual(testWithQuestionMock);
    }));
  });

  describe('previous() method', () => {
    it('should not update the index if zero', () => {
      component.activeIndex = 0;
      component.previous();

      expect(component.activeIndex).toEqual(0);
    });

    it('should update the index to previous int if greater than zero', () => {
      component.activeIndex = 1;
      component.previous();

      expect(component.activeIndex).toEqual(0);
    });
  });

  describe('next() method', () => {
    it('should not update the index if equalt to question length', () => {
      component.activeIndex = 1;
      component.next();

      expect(component.activeIndex).toEqual(1);
    });

    it('should update the index to next if less then question length', () => {
      component.activeIndex = 0;
      component.next();

      expect(component.activeIndex).toEqual(1);
    });
  });

  
  describe('storeSelections() method', () => {
    it('should store the value', () => {
      component.activeIndex = 1;
      component.storeSelections(4);

      expect(component.answerValues).toEqual([4]);
    });

    it('should not duplicate on continous update', () => {
      component.activeIndex = 1;
      component.storeSelections(4);

      component.activeIndex = 0;
      component.storeSelections(2);

      component.activeIndex = 1;
      component.storeSelections(5);

      expect(component.answerValues).toEqual([2, 5]);
    });
  });
});
