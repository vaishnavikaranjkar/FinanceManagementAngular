import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmiComponent } from './emi.component';

describe('EmiComponent', () => {
  let component: EmiComponent;
  let fixture: ComponentFixture<EmiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
