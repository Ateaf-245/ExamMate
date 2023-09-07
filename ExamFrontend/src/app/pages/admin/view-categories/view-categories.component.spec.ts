import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCategoriesComponent } from './view-categories.component';

describe('ViewCategoriesComponent', () => {
  let component: ViewCategoriesComponent;
  let fixture: ComponentFixture<ViewCategoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewCategoriesComponent]
    });
    fixture = TestBed.createComponent(ViewCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
