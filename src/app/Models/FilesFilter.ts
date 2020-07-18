import { File } from './File';
import { Folder } from './Folder';

export class FilesFilter
{
    static filterFilesAndFolders(files:File[] | Folder[], searchStr: string) : File[] | Folder[]
    {
        
        return files.filter((v:File | Folder) => 
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