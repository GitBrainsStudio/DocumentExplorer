import {Component, Input} from '@angular/core';
import { File } from '../../Models/File';
import { DirectoryReaderService } from '../directory-reader.service';

@Component({
  selector: 'file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent {

    constructor(public directoryReaderService : DirectoryReaderService) { }
    @Input() file:File;
}
