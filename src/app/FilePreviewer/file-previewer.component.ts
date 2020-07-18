import { Component, OnInit, Input } from '@angular/core';
import { FileDetector } from '../Models/FileDetector';
import { Folder } from '../Models/Folder';
import { File } from '../Models/File';

@Component({
  selector: 'file-previewer',
  templateUrl: './file-previewer.component.html'
})
export class FilePreviewerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

  @Input() file: File | Folder;

  get isFolder() : boolean { return FileDetector.isFolder(this.file); }
  get isFile() : boolean { return FileDetector.isFile(this.file); }

}
