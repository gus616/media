import { useEffect } from "react";
import { useAppSelector } from "../hooks/hooks"
import { fetchUsers } from "../store/thunks/fetchUsers";
import { addUser } from "../store/thunks/addUser";
import { User } from "../types";
import UserCard from "./components/UserCard";
import Button from "../components/UI/Button";
import { CgSpinnerAlt } from "react-icons/cg";
import useThunk from "../hooks/useThunk";


const UsersLists = () => {


  const [doFetchUsers, isLoading, error] = useThunk(fetchUsers) as [() => void, boolean, string | null];

  const [doCreateUser, isAddingUser, isAddingUserError, setIsAddingUserError] = useThunk(addUser) as [() => void, boolean, string | null, React.Dispatch<React.SetStateAction<string | null>>];


  useEffect(() => {
    if (typeof doFetchUsers === 'function') {
      doFetchUsers();
    }
  }, [doFetchUsers])


  const { data } = useAppSelector(state => state.users);


  useEffect(() => {
    setTimeout(() => {
     if (isAddingUserError) {
       setIsAddingUserError(null)
     }
    }, 1000);
  }, [isAddingUserError, setIsAddingUserError])

  if (isLoading) return <CgSpinnerAlt className="animate-spin h-5 w-5 text-blue-500" />

  if (error) return <p>Ops something went wrong</p>

  const addUserHandler = () => {
    doCreateUser();
  }

  return (
    <div className="min-w-500 mx-auto mt-10">
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