import { TreeItem } from './TreeItem';

export class File extends TreeItem
{

    constructor(public name, public parent:string)
    {
        super(name, 'file');
    }

    type: string;
    routerLink:string;
    files?: TreeItem[];
    opened?: boolean;
}