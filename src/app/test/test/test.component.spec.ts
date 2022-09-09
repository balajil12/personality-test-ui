import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { MockProviders } from 'ng-mocks';
import { of } from 'rxjs';
import { testMock } from '../../core/mocks/test.mock';
import { TestService } from '../../core/services/test.service';

import { TestComponent } from './test.component';

describe('TestComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  const testId = 1;
  let getAllTestSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestComponent ],
      providers: [
        MockProviders(TestService, Router),
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
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;

    const testService = TestBed.inject(TestService);
    getAllTestSpy = spyOn(testService, 'getAllTests').and.returnValue(of([testMock]))
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAllTests on Init', fakeAsync (() => {
    component.ngOnInit();

    tick(200);

    expect(getAllTestSpy).toHaveBeenCalled();
    expect(component.test).toEqual(testMock);
  }));
});
