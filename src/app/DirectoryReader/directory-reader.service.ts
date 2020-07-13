import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { TreeItem } from '../Models/treeItem';
import { Folder } from '../Models/Folder';
import { File } from '../Models/File';
import { apiFileSystem } from 'src/environments/environment';

@Injectable({providedIn:"root"})
export class DirectoryReaderService
{
  
    constructor(private http : HttpClient) { }
    
    getRootDirectoryFiles() : Observable<Folder[] | File[]>
    {
        return this.http.get(apiFileSystem).pipe(map((items:TreeItem[]) =>  { return this.mapFiles(items, "root"); }));
    }

    private mapFiles(data:TreeItem[], parent:string)
    {
        return data.map(e => 
            { 
                if (e.type == "folder") {

                    e.files = this.mapFiles(e.files, e.name);
                    return new Folder(e.name, e.files, parent);
                }

                if (e.type == "file") 
                    return new File(e.name, parent);

            });
    }


    openFile : TreeItem;
    openFileChange(item:TreeItem)
    {
       
        this.openFile = item;
        console.log(this.openFile)
    }


}