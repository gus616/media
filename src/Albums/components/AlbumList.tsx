import { useGetAlbumsQuery } from "../../store/apis/albumsApis"
import { User } from "../../types"


type AlbumListsProps = {
  user: User
}

const AlbumList = ({ user }: AlbumListsProps) => {

  const {data, error, isLoading} = useGetAlbumsQuery();

  console.log(data);
  console.log(error);

  if(isLoading) {
    return <div>Loading...</div>
  }
  return (
    <div>Albums List for {user.name}</div>
  )
}

export default AlbumList