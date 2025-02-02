import { CgSpinnerAlt } from "react-icons/cg"
import { useCreateAlbumMutation, useGetAlbumsQuery } from "../../store/apis/albumsApis"
import { User } from "../../types"
import Modal from "../../components/UI/Modal"
import { useRef, useState } from "react"
import AlbumItem from "./AlbumItem"


type AlbumListsProps = {
  user: User
}

const AlbumList = ({ user }: AlbumListsProps) => {
  const { data, error, isFetching } = useGetAlbumsQuery(user);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const mutation = useCreateAlbumMutation();

  const [createAlbum, result] = mutation;
  const createAlbumError = result.error;
  const isCreatingAlbum = result.isLoading;


  const albumRef = useRef<HTMLInputElement>(null);

  const onSubmitHandler = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const albumName = albumRef.current?.value || '';

    if (!albumName) return;

    createAlbum({ id: (Math.floor(Math.random() * 100000) + 1).toString(), userId: user.id, title: albumName });

    setIsModalOpen(false);

  }

  return (
    <div className="mt-10 flex flex-col items-center">
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>

        <h2 className="text-xl font-bold mb-4">Album Add</h2>
        <form onSubmit={onSubmitHandler}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={() => { }}
            className="border p-2 w-full mb-2"
            required
            ref={albumRef}
          />
          <div className="flex flex-row space-x-2">
            <button type="submit" className="bg-green-500 text-white p-2 w-full rounded mt-2" disabled={isCreatingAlbum} >
              Submit
            </button>
            <button onClick={() => setIsModalOpen(false)} className="bg-red-500 text-white p-2 w-full rounded mt-2">
              Cancel
            </button>
          </div>
        </form>

        {createAlbumError && <p>Ops something went wrong</p>}
      </Modal>
      {isFetching ? <CgSpinnerAlt className="animate-spin h-20 w-20 text-teal-500" /> :
        <div className="w-full">
          <div className="flex justify-end w-full mb-5">
            <button className="text-white bg-gray-500 px-2 py-1 rounded-md" onClick={() => setIsModalOpen(true)}>Add Album</button>
          </div>
          {
            error ? <p>Ops something went wrong</p> :
              <div>
                {
                  data?.length === 0 && <p>No albums found</p>
                }
                {
                  data?.length !== 0 && <div className="grid grid-cols-3 gap-4">

                    {data?.map(album => (
                      <AlbumItem key={album.id} album={album} />
                    ))}
                  </div>
                }
              </div>
          }
        </div>
      }
    </div>
  )
}

export default AlbumList