

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


export interface ICardProps {
    note: ICard;
    deleteBtn: (id: string | number) => void;
    deleteBtnId: string | number | null;
    startEdit: (note: ICard) => void;
    editBtnId: string | number | null;
    editTitle: string;
    editContent: string;
    setEditTitle: React.Dispatch<React.SetStateAction<string>>;
    setEditContent: React.Dispatch<React.SetStateAction<string>>;
    handleUpdate: (id: string | number) => void;
    updating: boolean;
    cancelEdit: (note: ICard) => void;
}