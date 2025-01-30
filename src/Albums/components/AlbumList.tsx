import { User } from "../../types"


type AlbumListsProps = {
  user: User
}

const AlbumList = ({ user }: AlbumListsProps) => {
  return (
    <div>Albums List for {user.name}</div>
  )
}

export default AlbumList