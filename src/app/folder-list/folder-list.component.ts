import { Component, OnInit, Output, Input } from '@angular/core';
import { FolderListService } from './folder-list.service';
import { Folder } from '../DTO/folder';
import { File } from '../DTO/file';
import { ActivatedRoute, Router } from '@angular/router';
import { FilePreviewService } from '../file-preview/file-preview.service';

@Component({
  selector: 'folder-list',
  templateUrl: './folder-list.component.html'
})
export class FolderListComponent implements OnInit {

  constructor(private folderListService : FolderListService, private activatedRoute:ActivatedRoute, 
    private filePreviewService:FilePreviewService, private router:Router) {
    this.apiDetectRoute();

    this.activatedRoute.queryParams.subscribe(params => {

    let search = params['search'];
    if (search) 
    {
      this.searchStr = search;
    }
      
    });
   }

  ngOnInit() { this.downloadFiles(); }


  @Input() route:string;

  filesWithoutFilter:any[];
  filesWithFilter : any[];
  allFiles:any[] = [];
  routeArray:any;
  searchStr:string = "";
  files : any[];
   


  apiDetectRoute()
  {
    if (!this.route) this.activatedRoute.url.subscribe(activeUrl => {
      this.route = window.location.pathname;
     });
  }

  downloadFiles()
  {
    this.folderListService.getFolderList().subscribe(data => {
    this.files = data.map(v => 
      {
        if (v.type == "folder")  v.opened = false;
        this.setRoute('/', v)
        return v;
      });
      this.filesWithoutFilter = this.files;
      this.parseRoute();
      this.parseDirectoryInFileList(this.filesWithoutFilter);
      this.searchStrChanged();
  });
  }

  setRoute(baseRoute, v) : any
  {
    v.router = baseRoute + v.name + '/';
    if (v.files)
    {
      v.files.forEach(element => {
        {
          this.setRoute(v.router, element);
        }
      });
    }
    return v;
  }

  parseRoute()
  {
    this.routeArray = this.route.split('/');
    this.openFolder(this.files, 1);
  }

  openFolder(filesArray, i)
  {
    filesArray.forEach(element =>{ 
    
      if (element.name == this.routeArray[i]) {
       
        element.opened = true; 
    
        if (this.routeArray[i++])
        {
          if (element.type == "folder") this.openFolder(element.files, i++);
          else this.filePreviewService.setFile(element);
        }
    }
  });
  }


  searchStrChanged()
  {
    if (this.searchStr == "") {
      this.files = this.restoreFiles();
      this.router.navigate([this.route]);
    }


   else
   {
    this.router.navigate(['/'], { queryParams: { search: this.searchStr } });
    this.files = this.allFiles.filter(v => { if (v.name.includes(this.searchStr)) return v} ); 
   }

  }

  parseDirectoryInFileList(array)
  {
    array.forEach(element => {
      this.allFiles.push(element);
      {
        if (element.type == "folder")
        {
          this.parseDirectoryInFileList(element.files);
        }
      }
    });
  }

  restoreFiles() { return this.filesWithoutFilter; }
}

