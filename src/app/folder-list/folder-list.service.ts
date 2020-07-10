import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { File } from '../DTO/file';

@Injectable({providedIn:"root"})
export class FolderListService
{

    constructor(private http : HttpClient)
    {
        
    }
    
    getFolderList() : Observable<any[]>
    {
        return this.http.get('./assets/folder-list.json').pipe(map((data:any[]) => 
            {
                return data;
            }));
    }

}