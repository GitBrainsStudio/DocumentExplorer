import {Component, Input} from '@angular/core';
import { FileWithViewData } from 'src/app/DTO/fileWithViewData';
import { FilePreviewService } from 'src/app/file-preview/file-preview.service';
import { Router } from '@angular/router';

@Component({
  selector: 'file',
  templateUrl: './file.component.html',
})
export class FileComponent {
  
    constructor(private filePreviewService:FilePreviewService, private router : Router)
    {

    }

    @Input() file:FileWithViewData;

    openFile()
    {
      this.filePreviewService.setFile(this.file);
      this.router.navigate([this.file.router]);
    }

}
