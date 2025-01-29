import { GoTrash } from "react-icons/go";
import { deleteUser } from "../../store/thunks/deleteUser";
import { User } from "../../types";
import { useAppDispatch } from "../../hooks/hooks";
import { useState } from "react";
import { CgSpinnerAlt } from "react-icons/cg";

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


    return (
        <div className="bg-white border-2 border-black p-4 m-2 full-width flex flex-row items-center">

            <button onClick={() => deleteHandler(user.id)} disabled={isDeleting} className="mr-2">
                {
                    isDeleting ? <CgSpinnerAlt className="animate-spin h-5 w-5 text-red-500 mx-auto" /> : <GoTrash className="h-5 w-5 text-red-500" />
                }

            </button>

            <h2 className="text-lg font-semibold">{user.name}</h2>
        </div>
    )
}

export default UserCard