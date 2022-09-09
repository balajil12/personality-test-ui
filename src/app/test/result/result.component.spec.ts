import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { MockProviders } from 'ng-mocks';
import { of } from 'rxjs';
import { TestService } from '../../core/services/test.service';

import { ResultComponent } from './result.component';

describe('ResultComponent', () => {
  let component: ResultComponent;
  let fixture: ComponentFixture<ResultComponent>;
  const testId = 1;
  let findResultSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultComponent ],
      providers: [
        MockProviders(TestService, Router),
        {
          provide: ActivatedRoute,
          useValue: {
            parent: {
              snapshot: {
                paramMap: convertToParamMap({
                  id: testId,
                })
              }
            },
            queryParams: of({
              a: [1, 2, 3] 
            })
          }
        },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultComponent);
    component = fixture.componentInstance;

    const testService = TestBed.inject(TestService);
    findResultSpy = spyOn(testService, 'findResult');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call findResult method on Init', fakeAsync(()=> {
    component.ngOnInit();


    expect(findResultSpy).toHaveBeenCalledWith(1, [1,2,3]);
  }));
});
