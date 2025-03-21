import { useMemo } from 'react';
import { useGetPhotosQuery } from '../../store/apis/photosApis'
import { Photo } from '../../types';
import { CgSpinnerAlt } from 'react-icons/cg';

type PhotoListProps = {
    albumId: number
}

const PhotoList = ({ albumId }: PhotoListProps) => {
    const {data: photos, isLoading, error } = useGetPhotosQuery({ albumId });


    const memoizedPhotos = useMemo(() => {
        return photos || [];
    }, [photos]);


    if(isLoading) return  <CgSpinnerAlt className="animate-spin h-20 w-20 text-teal-500" /> 

    if(error) return <div>Error: Could not show photos</div>

    if(!photos) return <div>No photos found</div>

    return (
        <div className='flex flex-row flex-wrap'>       
            {memoizedPhotos.map((photo: Photo) => (
                <div key={photo.id} className="m-2">
                    <img src={photo.url} alt={`photo${photo.id}`} className="max-w-full max-h-20" />
                </div>
            ))}
        </div>
    )
}

export default PhotoList  