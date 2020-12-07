import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipsDisplayComponent } from './ships-display.component';

describe('ShipsDisplayComponent', () => {
  let component: ShipsDisplayComponent;
  let fixture: ComponentFixture<ShipsDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipsDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
