import {Component, Input, OnInit} from '@angular/core';
import { FolderWithViewData } from 'src/app/DTO/FolderWithViewData';
import { FilePreviewService } from 'src/app/file-preview/file-preview.service';
import { Router } from '@angular/router';

@Component({
  selector: 'folder',
  templateUrl: './folder.component.html',
})

export class FolderComponent  {


    constructor(private filePreviewService:FilePreviewService, private router:Router)
    {

    }


    @Input() folder:FolderWithViewData;

    openFolder()
    {
        this.filePreviewService.setFolder(this.folder);
        if (this.folder.files) this.folder.opened = !this.folder.opened;
        if (this.folder.files.length != 0) this.router.navigate([this.folder.router])
    }

}
