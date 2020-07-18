import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { Folder } from '../Models/Folder';
import { File } from '../Models/File';
import { apiFileSystem } from 'src/environments/environment';
import { TreeItem } from '../Models/TreeItem';
import { FileTypes } from '../Models/FilesType';

@Injectable({providedIn:"root"})
export class DirectoryReaderService
{
  
    constructor(private http : HttpClient) { }
    
    getRootDirectoryFiles() : Observable<File[] | Folder[]>
    {
        return this.http.get(apiFileSystem).pipe(map((items:TreeItem[]) =>  { return this.mapFiles(items); }));
    }

    private mapFiles(items: TreeItem[]): File[] | Folder[]
    {
        return items.map((e:TreeItem) => 
        { 
            if (e.type == FileTypes.folder) 
            {
                
                let folder = e as Folder;
                folder = new Folder(folder.name, folder.files);
                folder.files = this.mapFiles(folder.files);
                return folder;
            }

            if (e.type == FileTypes.file) 
            {
                let file = e as File;
                file = new File(file.name);
                return file;
            }
        });
    }


    openFile : File | Folder;
    openFileChange(item:File | Folder) { this.openFile = item;}


}