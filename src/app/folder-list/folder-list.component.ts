import { Component, OnInit } from '@angular/core';
import { FolderListService } from './folder-list.service';

@Component({
  selector: 'folder-list',
  templateUrl: './folder-list.component.html',
  styleUrls: ['./folder-list.component.css']
})
export class FolderListComponent implements OnInit {

  constructor(private folderListService : FolderListService) { }

  ngOnInit(): void {
    this.folderListService.getFolderList().subscribe(data => console.log(data));
  }

}
