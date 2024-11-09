import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModAppsComponent } from './mod-apps.component';

describe('ModAppsComponent', () => {
  let component: ModAppsComponent;
  let fixture: ComponentFixture<ModAppsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModAppsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModAppsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
