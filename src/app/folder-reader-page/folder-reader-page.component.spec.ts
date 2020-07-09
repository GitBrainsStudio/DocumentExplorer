import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FolderReaderPageComponent } from './folder-reader-page.component';

describe('FolderReaderPageComponent', () => {
  let component: FolderReaderPageComponent;
  let fixture: ComponentFixture<FolderReaderPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FolderReaderPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FolderReaderPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
