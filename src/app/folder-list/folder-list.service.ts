import { HttpClient } from '@angular/common/http';

export class FolderListService
{

    constructor(private http : HttpClient)
    {
        
    }
    
    getFolderList()
    {
        return this.http.get('./assets/folder-list.json');
    }

}