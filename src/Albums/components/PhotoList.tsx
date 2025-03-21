import { useGetPhotosQuery } from '../../store/apis/photosApis'

type PhotoListProps = {
    albumId: number
}

const PhotoList = ({ albumId }: PhotoListProps) => {
    useGetPhotosQuery({ albumId });
    return (
        <div>PhotoList</div>

    )
}

export default PhotoList  