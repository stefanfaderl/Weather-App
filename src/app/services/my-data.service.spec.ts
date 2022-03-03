import { TestBed } from '@angular/core/testing';
import { MyDataService } from './my-data.service';
import { HttpClientModule } from '@angular/common/http';


describe('MyDataService', () => {
  let service: MyDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
      ]
    });
    service = TestBed.inject(MyDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
