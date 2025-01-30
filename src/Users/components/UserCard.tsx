import { GoTrash } from "react-icons/go";
import { deleteUser } from "../../store/thunks/deleteUser";
import { User } from "../../types";
import { useAppDispatch } from "../../hooks/hooks";
import { useState } from "react";
import { CgSpinnerAlt } from "react-icons/cg";
import ExpandablePanel from "../../components/UI/ExpandablePanel";
import AlbumList from "../../Albums/components/AlbumList";

type UserCardProps = {
    user: User
}

const UserCard = ({ user }: UserCardProps) => {
    const dispatch = useAppDispatch();

    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    const deleteHandler = (id: number) => {
        setIsDeleting(true);
        dispatch(deleteUser(id))
            .unwrap()
            .then(() => setIsDeleting(false))
    }

    const header = <>

        <button onClick={() => deleteHandler(user.id)} disabled={isDeleting} className="mr-2">
            {
                isDeleting ? <CgSpinnerAlt className="animate-spin h-5 w-5 text-red-500 mx-auto" /> : <GoTrash className="h-5 w-5 text-red-500" />
            }

        </button>

        <div className="flex flex-row items-center justify-between">
            <p>{user.name}</p>
        </div>


    </>


    return (
        <ExpandablePanel header={header}>
           <AlbumList user={user} />
        </ExpandablePanel>
    )
}

export default UserCard