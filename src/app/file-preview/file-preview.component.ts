import { Component, OnInit, Input } from '@angular/core';
import { Folder } from '../Models/Folder';

@Component({
  selector: 'file-preview',
  templateUrl: './file-preview.component.html'
})
export class FilePreviewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  
  }

  @Input() file:File | Folder;

}
