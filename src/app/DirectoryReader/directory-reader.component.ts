import { Component, OnInit, Output, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Folder } from '../Models/Folder';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { FileDetector } from '../Models/FileDetector';
import { DirectoryReaderService } from './directory-reader.service';
import { FilesFilter } from '../Models/FilesFilter';
import { File } from '../Models/File';

@Component({
  selector: 'directory-reader',
  templateUrl: './directory-reader.component.html',
  styleUrls: ['./directory-reader.component.css']
})
export class DirectoryReaderComponent implements OnInit {

    constructor (public directoryReaderService : DirectoryReaderService, private activatedRoute:ActivatedRoute, private router:Router) 
                  {  
                      this.detectRoutePath();  
                      this.detectQueryParamsInRoute(); 
                  }

  async ngOnInit() { 

    if (this.searchStr != "") this.searchStrChangeEvent();

    else  this.parseRouteAndOpenFolder();
  }

  detectRoutePath()
  {
    if (!this.route) 
      this.activatedRoute.url.pipe(takeUntil(this.destroy)).subscribe(activeUrl => {
      this.route = window.location.pathname;
     });
  }

  detectQueryParamsInRoute()
  {
    this.activatedRoute.queryParams.pipe(takeUntil(this.destroy)).subscribe(params => {
      let search = params['search']; 
      if (search) 
        this.searchStr = search;
  })}


  async downloadRootDirectoryFromBase()
  {
    await this.directoryReaderService.getRootDirectoryFiles().pipe(takeUntil(this.destroy)).toPromise().then(data =>
      {
        data.forEach(e => 
          {
            this.setUniqRouteInEachItem('/', e);
          })

        this.files = data;
      }
    )
  }

  setUniqRouteInEachItem(baseRoute, v:File|Folder) : any
  {
    v.routerLink = baseRoute + v.name + '/';
    if (v instanceof Folder)
    {
      v.files.forEach(element => {
        {
          this.setUniqRouteInEachItem(v.routerLink, element);
        }
      });
    }
    return v;
  }

  async parseRouteAndOpenFolder()
  {
    await this.downloadRootDirectoryFromBase();

    this.routeArray = this.route.split('/');
    
    this.openFolder(this.files, 1);
  }

  openFolder(filesArray:File[] | Folder[], i)
  {
    filesArray.forEach(element =>{ 
    
      if (element.name == this.routeArray[i]) {
       
        if (this.routeArray[i++])
        {
          if (element instanceof Folder)
          {
            element.opened = true;
            this.openFolder(element.files, i++);
          }
          
           else 
            this.directoryReaderService.openFileChange(element);
        }
    }
  });
  }

  async searchStrChangeEvent()
  {
    await this.downloadRootDirectoryFromBase();

    if (this.searchStr == "") this.router.navigate([this.route]); 

    else
    { 
      this.files = FilesFilter.filterFilesAndFolders(this.files, this.searchStr);
      this.router.navigate(['/'], { queryParams: { search: this.searchStr } });
    }
  }


  isFolder(item:File | Folder) : boolean { return FileDetector.isFolder(item); }

  isFile(item:File | Folder) : boolean { return FileDetector.isFile(item); }

     
  ngOnDestroy() {
    this.destroy.next(null);
    this.destroy.complete();
  }

  get openFile() :File | Folder
  {
    return this.directoryReaderService.openFile;
  }

  destroy: ReplaySubject<any> = new ReplaySubject<any>(1);

  @Input() route:string;

  routeArray:any;

  searchStr:string = "";

  files : File[] | Folder[];

}

