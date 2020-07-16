
import { Folder } from './Folder';
import { TreeItem } from './TreeItem';

export class FilesFilter
{
    static filterFilesAndFolders(files:TreeItem[], searchStr: string) : TreeItem[]
    {
        return files.filter(v => 
        {
            if (v.name.includes(searchStr)) return v;
        
            else
            {
            if (v instanceof Folder)
            {
                let data = FilesFilter.filterFilesAndFolders(v.files, searchStr);
                if (data.length > 0) 
                {
                v.files = data;
                v.opened = true;
                return v;
                }
            }
            }
        })
    }
}