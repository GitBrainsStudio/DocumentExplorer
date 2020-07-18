import { TreeItem } from './TreeItem';
import { FileTypes } from './FilesType';

export class File extends TreeItem
{

    constructor(name)
    {
        super(name, FileTypes.file);
    }

    routerLink:string;
}