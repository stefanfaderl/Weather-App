import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherComponent } from './weather.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MyDataService } from '../services/my-data.service';


describe('WeatherComponent', () => {
  let component: WeatherComponent;
  let fixture: ComponentFixture<WeatherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WeatherComponent],
      imports: [
        HttpClientModule,
        MatSnackBarModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should use the user name from the service', () => {
    let fixture = TestBed.createComponent(WeatherComponent);
    let component = fixture.componentInstance;
    let dataService = fixture.debugElement.injector.get(MyDataService);
    fixture.detectChanges();
    expect(dataService.user.name).toEqual(component.user.name);
  });


});
