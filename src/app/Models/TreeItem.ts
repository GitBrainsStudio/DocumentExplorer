export abstract class TreeItem {
    
    constructor(_name:string, _type:string)
    {

    }

    abstract name :string;
    abstract type:string;
    abstract routerLink : string;
    abstract files? : TreeItem[];
    abstract parent:string;
}