import { TreeItem } from './TreeItem';
import { File } from './File';
import { FileTypes } from './FilesType';


export class Folder extends TreeItem
{
    constructor(name: string, public files:File[] | Folder[])
    {
        super(name, FileTypes.folder);
    }

    opened:boolean = false;
    routerLink: string;
}