import { GoTrash } from "react-icons/go";
import { deleteUser } from "../../store/thunks/deleteUser";
import { User } from "../../types";
import { useAppDispatch } from "../../hooks/hooks";
import { useState } from "react";
import { CgSpinnerAlt } from "react-icons/cg";
import ExpandablePanel from "../../components/UI/ExpandablePanel";
import AlbumList from "../../Albums/components/AlbumList";
import Modal from "../../components/UI/Modal";

type UserCardProps = {
    user: User,
    doFetchUsers: () => void
}

const UserCard = ({ user, doFetchUsers }: UserCardProps) => {
    const dispatch = useAppDispatch();
    const [isDeleteUserModalOpen, setIsDeleteUserModalOpen] = useState<boolean>(false);

    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    const deleteHandler = (id: number) => {
        setIsDeleting(true);
        dispatch(deleteUser(id))
            .unwrap()
            .then(() => {
                setIsDeleting(false);
                doFetchUsers();
            })
            .catch(() => {
                setIsDeleting(false);
                setIsDeleteUserModalOpen(false);
            });    
    }

    const header = <>

        <button onClick={() =>setIsDeleteUserModalOpen(true) } disabled={isDeleting} className="mr-2">
            {
                isDeleting ? <CgSpinnerAlt className="animate-spin h-5 w-5 text-red-500 mx-auto" /> : <GoTrash className="h-5 w-5 text-red-500" />
            }

        </button>

        <div className="flex flex-row items-center justify-between">
            <p>{user.name}</p>
        </div>


    </>

    const confirmDeleteUserModal = <Modal isOpen={isDeleteUserModalOpen} onClose={() => setIsDeleteUserModalOpen(false)}>
        <div className="flex flex-col items-center justify-center">
            <p className="mb-5">Are you sure you want to delete this user?</p>
            <div className="flex flex-row items-center justify-between w-full">
                <button className="bg-green-500 text-white p-2 w-full rounded mt-2 mr-5" onClick={() => deleteHandler(+user.id)} disabled={isDeleting}>Yes</button>
                <button className="bg-red-500 text-white p-2 w-full rounded mt-2" onClick={() => setIsDeleteUserModalOpen(false)}>No</button>
            </div>
        </div>
    </Modal>


    return (
        <ExpandablePanel header={header}>
            {confirmDeleteUserModal}
           <AlbumList user={user} />
        </ExpandablePanel>
    )
}

export default UserCard