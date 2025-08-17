import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErdComponent } from './erd.component';

describe('ErdComponent', () => {
  let component: ErdComponent;
  let fixture: ComponentFixture<ErdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ErdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
