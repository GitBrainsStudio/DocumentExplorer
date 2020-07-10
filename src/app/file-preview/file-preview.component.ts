import { Component, OnInit, Input } from '@angular/core';
import { File } from '../DTO/file';
import { FilePreviewService } from './file-preview.service';
import { Folder } from '../DTO/folder';

@Component({
  selector: 'file-preview',
  templateUrl: './file-preview.component.html'
})
export class FilePreviewComponent implements OnInit {

  constructor(private filePreviewService : FilePreviewService) { }

  ngOnInit(): void {
    this.filePreviewService.fileUpdated.subscribe(
      (file) => {
        this.file = file;
      }
    );

    this.filePreviewService.folderUpdated.subscribe(
      (folder) => {
        this.folder = folder;
      }
    );
  }

  @Input() file:File;
  @Input() folder:Folder;


}
