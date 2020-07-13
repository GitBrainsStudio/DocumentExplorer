import {Component, Input} from '@angular/core';
import { File } from '../../Models/File';

@Component({
  selector: 'file',
  templateUrl: './file.component.html',
})
export class FileComponent {
  
    constructor()
    {
      console.log(this.file)
    }

    @Input() file:File;

    openFile()
    {
     /*  this.filePreviewService.setFile(this.file);
      this.router.navigate([this.file.router]); */
    }

}
