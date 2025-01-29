import { User } from "../../types";

type UserCardProps = {
    user: User
}

const UserCard = ({ user }: UserCardProps) => {
    return (
        <div className="bg-white border-2 border-black p-4 m-2 full-width">
            <h2 className="text-lg font-semibold">{user.name}</h2>
        </div>
    )
}

export default UserCard