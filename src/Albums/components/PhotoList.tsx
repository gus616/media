import { useMemo, useState } from 'react';
import { useGetPhotosQuery } from '../../store/apis/photosApis'
import { Photo } from '../../types';
import { CgSpinnerAlt } from 'react-icons/cg';
import PhotoViewerModal from './PhotoViewerModal';

type PhotoListProps = {
    albumId: number
}

const PhotoList = ({ albumId }: PhotoListProps) => {
    const { data: photos, isLoading, error } = useGetPhotosQuery({ albumId });
    const [isPhotoViewerOpen, setIsPhotoViewerOpen] = useState<boolean>(false);
    const [photoUrl, setPhotoUrl] = useState<string | null>(null);


    const memoizedPhotos = useMemo(() => {
        return photos || [];
    }, [photos]);


    if (isLoading) return <CgSpinnerAlt className="animate-spin h-20 w-20 text-teal-500" />

    if (error) return <div>Error: Could not show photos</div>

    if (!photos) return <div>No photos found</div>

    const onClickPhotoHandler = (photo: Photo) => {
        console.log('photo', photo);
        setPhotoUrl(photo.url);
        setIsPhotoViewerOpen(true);
    }

    const photoViewerModal = <PhotoViewerModal 
                                isOpen={isPhotoViewerOpen} 
                                onClose={() => setIsPhotoViewerOpen(false)} 
                                photoUrl={photoUrl || ''} 
                                />

    return (
        <div className='flex flex-row flex-wrap'>
            {photoViewerModal}
            {memoizedPhotos.map((photo: Photo) => (
                <div key={photo.id} className="m-2 cursor-pointer hover:scale-105 transition-transform duration-200 ease-in-out"
                    onClick={() => onClickPhotoHandler(photo)}
                >
                    <img src={photo.url} alt={`photo${photo.id}`} className="max-w-full max-h-20" />
                </div>
            ))}
        </div>
    )
}

export default PhotoList  