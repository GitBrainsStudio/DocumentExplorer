import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Folder } from 'src/app/Models/Folder';
import { FileDetector } from 'src/app/Models/FileDetector';
import { DirectoryReaderService } from '../directory-reader.service';

@Component({
  selector: 'folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.css'],
})

export class FolderComponent  {


    constructor(private router : Router, public directoryReaderService : DirectoryReaderService) { }

    isFolder(item:File | Folder) : boolean { return FileDetector.isFolder(item); }
    isFile(item:File | Folder) : boolean { return FileDetector.isFile(item); }

    @Input() folder:Folder;

    openFolder()
    {
        this.directoryReaderService.openFileChange(this.folder);
        this.router.navigate([this.folder.routerLink])
        if (this.folder.files) this.folder.opened = !this.folder.opened;

    }

}
