import { useEffect, useMemo, useState } from 'react';
import { useGetPhotosQuery } from '../../store/apis/photosApis'
import { Photo } from '../../types';

type PhotoListProps = {
    albumId: number
}

const PhotoList = ({ albumId }: PhotoListProps) => {
    const {data, isLoading, error } = useGetPhotosQuery({ albumId });

    const [photos, setPhotos] = useState<Photo[]>([]);

    

    useEffect(() => {
        if (data) {
            setPhotos(data);
        }
    }, [data]);


    const memoizedPhotos = useMemo(() => photos, [photos]);


    if(isLoading) return <div>Loading...</div>

    if(error) return <div>Error: Could not show photos</div>

    return (
        <div className='flex flex-row flex-wrap'>
            {
                memoizedPhotos.length === 0 && <div>No photos found</div>
            }

            {memoizedPhotos.map(photo => (
                <div key={photo.id} className="m-2">
                    <img src={photo.url} alt={`photo${photo.id}`} className="max-w-full max-h-20" />
                </div>
            ))}
        </div>
    )
}

export default PhotoList  