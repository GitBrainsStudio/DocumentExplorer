import { TreeItem } from './treeItem';
import { Folder } from './Folder';
import { File } from './File';

export class FileDetector
{
    static isFolder(item:TreeItem) : boolean { return item instanceof Folder; }
    static isFile(item:TreeItem) : boolean { return item instanceof File; }
}