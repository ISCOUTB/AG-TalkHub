import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyToModComponent } from './apply-to-mod.component';

describe('ApplyToModComponent', () => {
  let component: ApplyToModComponent;
  let fixture: ComponentFixture<ApplyToModComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplyToModComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplyToModComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
