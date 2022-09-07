import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PsyTest } from '../../core/interfaces/PsyTest.interface';
import { TestService } from '../../core/services/test.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  $testList!: Observable<PsyTest[]>;

  constructor(private readonly testService: TestService) { }

  ngOnInit(): void {
    this.$testList = this.testService.getAllTests();
  }
}
