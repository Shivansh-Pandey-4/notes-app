

export interface INOTES{
   Notes : {
            id : number | string;
            title : string;
            content : string;
            createdAt : React.ReactNode
            updatedAt : React.ReactNode
        }[]
}

export interface ICard {
    id : string |number;
    title: string;
    content: string;
    createdAt: React.ReactNode;
    updatedAt: React.ReactNode
}
