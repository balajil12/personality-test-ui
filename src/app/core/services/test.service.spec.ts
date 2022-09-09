import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { testMock, testWithQuestionMock } from '../mocks/test.mock';

import { TestService } from './test.service';

describe('TestService', () => {
  let service: TestService;
  let httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [
        TestService,
        {
          provide: HttpClient,
          useValue: httpClientSpy
        }
      ]
    });
    service = TestBed.inject(TestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call the getAllTests endpoint', () => {
    httpClientSpy.get.and.returnValue(of([testMock]));

    service.getAllTests().subscribe(q=> {
      expect(httpClientSpy.get).toHaveBeenCalled();
      expect(q).toEqual([testMock]);
      httpClientSpy.get.calls.reset();
    });
  });

  it('should call the getById endpoint', () => {
    httpClientSpy.get.and.returnValue(of(testWithQuestionMock));

    service.getById(1).subscribe(q=> {
      expect(httpClientSpy.get).toHaveBeenCalled();
      expect(q).toEqual(testWithQuestionMock);

      httpClientSpy.get.calls.reset();
    });
  });

  it('should call the getAllTests endpoint', () => {
    const obj = {
      conclusion: 'abc',
      description: 'abc'
    };

    httpClientSpy.get.and.returnValue(of(obj));

    service.findResult(1, ["1", "3", "5"]).subscribe(q=> {
      expect(httpClientSpy.get).toHaveBeenCalled();
      expect(q).toEqual(obj);
      httpClientSpy.get.calls.reset();
    });
  });
});
