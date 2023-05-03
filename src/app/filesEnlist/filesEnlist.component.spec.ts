import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesEnlistComponent } from './filesEnlist.component';

describe('FilesEnlistComponent', () => {
  let component: FilesEnlistComponent;
  let fixture: ComponentFixture<FilesEnlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilesEnlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilesEnlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
