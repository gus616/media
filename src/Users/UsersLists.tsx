import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks"
import { fetchUsers } from "../store/thunks/fetchUsers";
import { User } from "../types";
import Skeleton from "../components/UI/Skeleton";

const UsersLists = () => {
  const { data, isLoading, error } = useAppSelector(state => state.users);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch])

  if (isLoading) return <Skeleton times={6} className="h-10 w-full" />

  if (error) return <p>Ops something went wrong</p>

  return (
    <div>
      <h1 className="text-2xl text-blue-950">User List</h1>
      <ul>
        {
          data?.map((item: User) => <li key={item.id}>{item.name}</li>)
        }
      </ul>
    </div>
  )
}

export default UsersLists