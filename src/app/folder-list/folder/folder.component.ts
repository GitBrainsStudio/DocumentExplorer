import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Folder } from 'src/app/Models/Folder';

@Component({
  selector: 'folder',
  templateUrl: './folder.component.html',
})

export class FolderComponent  {


    constructor(private router:Router)
    {

    }


    @Input() folder:Folder;

    openFolder()
    {
      /*   this.filePreviewService.setFolder(this.folder);
        if (this.folder.files) this.folder.opened = !this.folder.opened;
        if (this.folder.files.length != 0) this.router.navigate([this.folder.router]) */
    }

}
