import { useRef, useState } from 'react'
import ExpandablePanel from '../../components/UI/ExpandablePanel'
import { useRemoveAlbumMutation } from '../../store/apis/albumsApis'
import { Album } from '../../types'
import PhotoList from './PhotoList'
import Modal from '../../components/UI/Modal'
import { useAddPhotoMutation, useUploadPhotoMutation } from '../../store/apis/photosApis'

type AlbumProps = {
    album: Album
}


const AlbumItem = ({ album }: AlbumProps) => {

    const mutation = useRemoveAlbumMutation();
    const mutationUpload = useUploadPhotoMutation();
    const mutationSavePhoto = useAddPhotoMutation();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);
    const fileUploaderRef = useRef<HTMLInputElement>(null);
    const [removeAlbum, result] = mutation;
    const [uploadPhoto, resultUpload] = mutationUpload;
    const [savePhoto, resultSavePhoto] = mutationSavePhoto;


    const deleteAlbum = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        removeAlbum(album).unwrap()
            .then(() => setIsDeleteModalOpen(false))
            .catch(() => setIsDeleteModalOpen(false));
    }

    const uploadPhotoHandler = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        console.log('uploading photo')
        console.log(fileUploaderRef.current?.files);

        // upload photo

        if(fileUploaderRef.current?.files) {
            const uploadResponse = await uploadPhoto({
                file: fileUploaderRef.current.files[0]
            }).unwrap();
            
            // save photo
            const saveResponse = await savePhoto({
                album,
                url: uploadResponse.url,
                description: 'Uploaded photo',                
            });

            console.log('saveResponse', saveResponse);
        }

        setIsUploadModalOpen(false);
    }    

    const header = <div className='flex flex-row items-start justify-between'>
        <p>{album.title}</p>
    </div>

    const actionButtons = <div className='flex flex-row items-center'>
        <button
            onClick={() => setIsDeleteModalOpen(true)}
            disabled={result.isLoading}
            className="bg-red-500 rounded-lg w-15 h-6 flex items-center justify-center m-2 p-2 hover:bg-red-600"
        >
            <span className="text-white font-bold">Delete Album</span>
        </button>
        <button className="bg-blue-500 rounded-lg w-15 h-6 flex items-center justify-center m-2 p-2 hover:bg-blue-600"
            onClick={() => setIsUploadModalOpen(true)}
        >
            <span className="text-white font-bold">Add Photo</span>
        </button>
    </div>

    const confirmDeleteModal =
        <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>

            <h2 className="text-xl font-bold mb-4">Are you sure you want to delete this album?</h2>
            <form onSubmit={(e) => deleteAlbum(e)}>

                <div className="flex flex-row space-x-2">
                    <button type="submit" className="bg-green-500 text-white p-2 w-full rounded mt-2"
                        disabled={resultSavePhoto.isLoading && resultUpload.isLoading}
                    >
                        Confirm
                    </button>
                    <button onClick={() => setIsDeleteModalOpen(false)} className="bg-red-500 text-white p-2 w-full rounded mt-2">
                        Cancel
                    </button>
                </div>
            </form>
        </Modal>;

    const uploadPhotoModal = <Modal isOpen={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)}>
        <h2 className="text-xl font-bold mb-4">Upload Photo</h2>
        <form onSubmit={uploadPhotoHandler}>
            <div className='flex flex-col space-x-2'>
                <input
                    type="file"
                    name="photo"
                    placeholder="Photo"
                    onChange={() => { console.log('uploading photo') }}
                    className="border p-2 w-full mb-2"
                    required
                    ref={fileUploaderRef}
                />


                <button type="submit" className="bg-green-500 text-white p-2 w-full rounded mt-2">
                    Upload
                </button>
                <button onClick={() => setIsUploadModalOpen(false)} className="bg-red-500 text-white p-2 w-full rounded mt-2">
                    Cancel
                </button>
            </div>
        </form>
    </Modal>

    return (
        <ExpandablePanel header={header}>
            {actionButtons}
            {confirmDeleteModal}
            {uploadPhotoModal}
            <div className="bg-gray-100 p-4 rounded-md flex flex-column items-center">
                <PhotoList albumId={+album.id} />
            </div>
        </ExpandablePanel>
    )
}

export default AlbumItem