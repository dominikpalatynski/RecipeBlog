import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeModalDetailComponent } from './recipe-modal-detail.component';

describe('RecipeModalDetailComponent', () => {
  let component: RecipeModalDetailComponent;
  let fixture: ComponentFixture<RecipeModalDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeModalDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeModalDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
