import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingListComponent } from './saving-list.component';

describe('SavingListComponent', () => {
  let component: SavingListComponent;
  let fixture: ComponentFixture<SavingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
