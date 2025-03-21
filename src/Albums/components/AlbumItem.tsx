import ExpandablePanel from '../../components/UI/ExpandablePanel'
import { useRemoveAlbumMutation } from '../../store/apis/albumsApis'
import { Album } from '../../types'
import PhotoList from './PhotoList'

type AlbumProps = {
    album: Album
}


const AlbumItem = ({ album }: AlbumProps) => {

    const mutation = useRemoveAlbumMutation();
    const [removeAlbum, result] = mutation;

    const deleteAlbum = (album: Album) => {
        removeAlbum(album);
    }

    return (
        <ExpandablePanel header={album.title}>
            <div className="bg-gray-100 p-4 rounded-md flex flex-column items-center">
                <button className="bg-red-500 rounded-full w-6 h-6 flex items-center justify-center mr-2"
                    onClick={() => deleteAlbum(album)}
                    disabled={result.isLoading}
                >
                    <span className="text-white font-bold">X</span>
                </button>
                <PhotoList albumId={+album.id} />
            </div>
        </ExpandablePanel>
    )
}

export default AlbumItem