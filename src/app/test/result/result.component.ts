import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { Result } from 'src/app/core/interfaces/result.interface';
import { TestService } from 'src/app/core/services/test.service';

@UntilDestroy()
@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  $result!: Observable<Result>;

  constructor(private readonly testService: TestService, private readonly route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.parent?.snapshot.paramMap.get('id');

    console.log(id)
    if (id) {
      this.route.queryParams
        .pipe(untilDestroyed(this))
        .subscribe(params => {
          const answers = params['a'];
          this.$result = this.testService.findResult(+id, answers);
        });
    }

  }

}
