import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PsyTest } from '../../core/interfaces/PsyTest.interface';
import { TestService } from '../../core/services/test.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  test?: PsyTest

  constructor(private readonly testService: TestService,
    private readonly route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.testService.getAllTests().subscribe((testList) => {
        this.test = testList.find(q=> q.id === +id);
      });
    }
  }

}
