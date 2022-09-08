import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PsyTest, PsyTestWithQuestion } from '../interfaces/PsyTest.interface';
import { switchMap, tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class TestService {

  private basePath: string = `${environment.apiUrl}/test`
  private testList!: BehaviorSubject<PsyTest[]>;

  private test!: BehaviorSubject<PsyTest>;

  constructor(private readonly http: HttpClient) { }

  getAllTests(force = false): Observable<PsyTest[]> {
    if (this.testList && !force) {
      return this.testList.asObservable();
    }

    return this.http.get<PsyTest[]>(this.basePath)
      .pipe(
        tap((results: PsyTest[]) => (this.testList = new BehaviorSubject<PsyTest[]>(results))),
        switchMap(() => this.testList.asObservable())
      );
  }

  getById(id: number): Observable<PsyTestWithQuestion> {
    return this.http.get<PsyTestWithQuestion>(`${this.basePath}/${id}`)
  }
}
