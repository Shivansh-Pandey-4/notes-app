

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
  editState: {
    id: string | number | null;
    title: string;
    content: string;
    updating: boolean;
  };
  setEditState: React.Dispatch<React.SetStateAction<{
    id: string | number | null;
    title: string;
    content: string;
    updating: boolean;
  }>>;
  handleUpdate: (id: string | number) => void;
  cancelEdit: () => void;
}
