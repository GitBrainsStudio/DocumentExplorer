import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({providedIn:"root"})
export class FolderListService
{

    constructor(private http : HttpClient)
    {
        
    }
    
    getFolderList() : Observable<any[]>
    {
        return this.http.get<any[]>('./assets/folder-list.json');
    }

}