import { useRemoveAlbumMutation } from '../../store/apis/albumsApis'
import { Album } from '../../types'

type AlbumProps = {
    album: Album
}


const AlbumItem = ({ album }: AlbumProps) => {

    const mutation = useRemoveAlbumMutation();
    const [removeAlbum, result] = mutation;

    const deleteAlbum = (album: Album ) => {
       removeAlbum(album);
    }

    return (
        <div className="bg-gray-100 p-4 rounded-md flex flex-row items-center">
            <button className="bg-red-500 rounded-full w-6 h-6 flex items-center justify-center mr-2" 
                onClick={() => deleteAlbum(album)}
                disabled={result.isLoading}
                >
                <span className="text-white font-bold">X</span>
            </button>
            <h1 className="text-lg text-teal-500">{album.title}</h1>
        </div>
    )
}

export default AlbumItem