
import { ToastContainer } from 'react-toastify';
import Navbar from '../../components/UI/Navbar';
import UsersLists from '../UsersLists';
import { CgAbstract } from 'react-icons/cg';

const Users = () => {
  return (
    <>
      <Navbar title='Mediafy' Icon={CgAbstract} IconStyles={"container mx-auto flex items-center"}/>
      <div className="container mx-auto w-lg mt-10">
        <UsersLists />
        <ToastContainer />
      </div>
    </>
  );
};

export default Users;
