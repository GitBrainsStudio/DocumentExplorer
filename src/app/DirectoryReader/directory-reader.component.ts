import { Component, OnInit, Output, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TreeItem } from '../Models/treeItem';
import { Folder } from '../Models/Folder';
import { File } from '../Models/File';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { FileDetector } from '../Models/FileDetector';
import { DirectoryReaderService } from './directory-reader.service';

@Component({
  selector: 'directory-reader',
  templateUrl: './directory-reader.component.html',
  styleUrls: ['./directory-reader.component.css']
})
export class DirectoryReaderComponent implements OnInit {

    constructor 
    (public directoryReaderService : DirectoryReaderService, private activatedRoute:ActivatedRoute, private router:Router) 
    
    { 
      this.apiDetectRoute(); this.activatedRoute.queryParams.pipe(takeUntil(this.destroy)).subscribe(params => {
      let search = params['search']; 
      if (search) 
        this.searchStr = search;
    }); 
    }

  ngOnInit() { this.downloadRooDirectory(); }

  apiDetectRoute()
  {
    if (!this.route) this.activatedRoute.url.pipe(takeUntil(this.destroy)).subscribe(activeUrl => {
      this.route = window.location.pathname;
     });
  }

  downloadRooDirectory()
  {
  this.directoryReaderService.getRootDirectoryFiles().pipe(takeUntil(this.destroy)).subscribe(data => {

    data.forEach(e => 
      {
        this.setRoute('/', e);
      })

    this.files = data;
    this.filesWithoutFilter = data;
    this.allFiles = [];
    this.parseDirectoryInFileList(data);
    this.parseRoute();
    this.searchStrChanged();
  })
  }

  setRoute(baseRoute, v:TreeItem) : any
  {
    v.routerLink = baseRoute + v.name + '/';
    if (v instanceof Folder)
    {
      v.files.forEach(element => {
        {
          this.setRoute(v.routerLink, element);
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

  openFolder(filesArray:TreeItem[], i)
  {
    filesArray.forEach(element =>{ 
    
      if (element.name == this.routeArray[i]) {
       
        if (this.routeArray[i++])
        {
          if (this.isFolder(element)) 
          {
            element.opened = true;
            this.openFolder(element.files, i++);
          }
          
           else this.directoryReaderService.openFileChange(element);
        }
    }
  });
  }


  get openFile() :TreeItem
  {
    return this.directoryReaderService.openFile;
  }

  searchStrChanged()
  {
    if (this.searchStr == "") { this.restoreFiles(); this.router.navigate([this.route]); }

    else
    {
      this.restoreFiles();
      this.router.navigate(['/'], { queryParams: { search: this.searchStr } });
      this.filterFiles();
      this.restoreFiles();
    }
  }


  filterFiles()
  {
    this.files = this.files.filter(v => { 
      
      if (v.name.includes(this.searchStr)) 
      {
        if (v instanceof File) return v;
        if (v instanceof Folder) 
        {
          v.files = this.filterFolderFiles(v.files);
          v.opened = true;
          return v;
        }
      }

      else
      {
        if (v instanceof Folder)
        {
          v.files = this.filterFolderFiles(v.files);
          if (v.files.length > 0) 
          {
            v.opened = true;
            return v;
          }
        }
      }
    });
  }

  filterFolderFiles(files:TreeItem[]) : TreeItem[]
  {
    return files.filter(v => 
      {
        if (v.name.includes(this.searchStr)) 
        {

          if (v instanceof File) 
          {
            return v;
          }

          if (v instanceof Folder)
          {
            v.files = this.filterFolderFiles(v.files);
            v.opened = true;
            return v;
          }
        }

        else
        {
          if (v instanceof Folder)
          {
            v.files = this.filterFolderFiles(v.files);
            if (v.files.length > 0) 
            {
              v.opened = true;
              return v;
            }
          }
        }
      })
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
  isFolder(item:TreeItem) : boolean { return FileDetector.isFolder(item); }
  isFile(item:TreeItem) : boolean { return FileDetector.isFile(item); }

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

