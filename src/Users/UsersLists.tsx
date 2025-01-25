import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks"
import { fetchUsers } from "../store/thunks/fetchUsers";
import { addUser } from "../store/thunks/addUser";
import { User } from "../types";
import UserCard from "./components/UserCard";
import Button from "../components/UI/Button";
import { CgSpinnerAlt } from "react-icons/cg";

const UsersLists = () => {
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [loadingUsersError, setLoadingUsersError] = useState<string | null>(null);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [isAddingUserError, setIsAddingUserError] = useState<string | null>(null);

  const { data } = useAppSelector(state => state.users);


  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsLoadingUsers(true);
    dispatch(fetchUsers())
      .unwrap()
      .then(() => setIsLoadingUsers(false))
      .catch((error) => {
        setIsLoadingUsers(false);
        setLoadingUsersError(error);
      })

  }, [dispatch])

  useEffect(() => {
    setTimeout(() => {
     if (isAddingUserError) {
       setIsAddingUserError(null)
     }
    }, 2000);
  }, [isAddingUserError])

  if (isLoadingUsers) return <CgSpinnerAlt className="animate-spin h-5 w-5 text-blue-500" />

  if (loadingUsersError) return <p>Ops something went wrong</p>

  const addUserHandler = () => {
    // Add user logic here
    setIsAddingUser(true);
    dispatch(addUser())
      .unwrap()
      .then(() => setIsAddingUser(false))
      .catch((error) => {
        setIsAddingUser(false);
        console.log(error);
        setIsAddingUserError(error.message);
      })
  }

  return (
    <div className="max-w-700 min-w-500 mx-auto mt-10">
         {
          isAddingUserError && <p className="text-red-500">{isAddingUserError}</p>
        }
      <div className="flex flex-row justify-between items-center">
        <h1 className="m-2 text-xl">User List</h1>

     

        {
          isAddingUser && <CgSpinnerAlt className="animate-spin h-5 w-5 text-blue-500 mx-auto" />
        }

        {
          !isAddingUser  && <Button onClick={addUserHandler} disabled={isAddingUser}>+ Add User</Button>
        }


      </div>

      <ul>
        {
          data?.map((item: User) => <UserCard key={item.id} user={item} />)
        }
      </ul>
    </div>
  )
}

export default UsersLists