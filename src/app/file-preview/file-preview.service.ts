import { Injectable, EventEmitter } from '@angular/core';
import { FileWithViewData } from '../DTO/fileWithViewData';
import { FolderWithViewData } from '../DTO/FolderWithViewData';

@Injectable({providedIn:"root"})
export class FilePreviewService
{
    openedFile:FileWithViewData;
    openedFolder:FolderWithViewData;

    fileUpdated:EventEmitter<FileWithViewData> = new EventEmitter();
    folderUpdated:EventEmitter<FolderWithViewData> = new EventEmitter();

    setFile(openedFile:FileWithViewData) {
        this.openedFile = openedFile;
        this.fileUpdated.emit(this.openedFile);
    }

    setFolder(openedFolder:FolderWithViewData) {
        this.openedFolder = openedFolder;
        this.folderUpdated.emit(this.openedFolder);
    }

}