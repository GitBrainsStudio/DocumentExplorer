import { TreeItem } from './treeItem';

export class Folder extends TreeItem
{
    constructor(public name: string, public files:TreeItem[], public parent:string)
    {
        super(name, "folder");
    }

    opened:boolean = false;
    routerLink: string;
    type: string;  
}