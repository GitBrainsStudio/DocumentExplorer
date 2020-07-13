import { Component, OnInit, Output, Input } from '@angular/core';
import { FolderListService } from './folder-list.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TreeItem } from '../Models/treeItem';
import { Folder } from '../Models/Folder';
import { File } from '../Models/File';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Component({
  selector: 'folder-list',
  templateUrl: './folder-list.component.html'
})
export class FolderListComponent implements OnInit {

  constructor(private folderListService : FolderListService, private activatedRoute:ActivatedRoute, 
   private router:Router) {
    this.apiDetectRoute();

    this.activatedRoute.queryParams.pipe(takeUntil(this.destroy)).subscribe(params => {

    let search = params['search'];
    if (search) 
    {
      this.searchStr = search;
    }
    });
   }

  ngOnInit() { this.downloadFiles(); }



  apiDetectRoute()
  {
    if (!this.route) this.activatedRoute.url.pipe(takeUntil(this.destroy)).subscribe(activeUrl => {
      this.route = window.location.pathname;
     });
  }

  downloadFiles()
  {
 /*    this.folderListService.getFolderList().subscribe(data => {
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
  }); */

  this.folderListService.getRootDirectoryFiles().pipe(takeUntil(this.destroy)).subscribe(data => {

    this.files = data;
    this.filesWithoutFilter = data;
    this.allFiles = [];
    this.parseDirectoryInFileList(data);
  })
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
          if (element.type == "folder") 
            this.openFolder(element.files, i++);
        /*   else this.filePreviewService.setFile(element); */
        }
    }
  });
  }


  searchStrChanged()
  {
    if (this.searchStr == "") { this.restoreFiles(); this.router.navigate([this.route]); }

    else
    {
      this.router.navigate(['/'], { queryParams: { search: this.searchStr } });
      this.files = this.allFiles.filter(v => { if (v.name.includes(this.searchStr)) return v} ); 
    }
  }

  parseDirectoryInFileList(array:TreeItem[])
  {
    array.forEach(element => {  
      this.allFiles.push(element);
      {
        if (element instanceof Folder)
        {
          this.parseDirectoryInFileList(element.files);
        }
      }
    });
  }

  restoreFiles() { this.files = this.filesWithoutFilter; }
  isFolder(item:TreeItem) : boolean { return item instanceof Folder; }
  isFile(item:TreeItem) : boolean { return item instanceof File; }



  destroy: ReplaySubject<any> = new ReplaySubject<any>(1);
  @Input() route:string;
  filesWithoutFilter:TreeItem[];
  allFiles:TreeItem[];
  routeArray:any;
  searchStr:string = "";
  files : TreeItem[];
   
  ngOnDestroy() {
    this.destroy.next(null);
    this.destroy.complete();
  }
}

