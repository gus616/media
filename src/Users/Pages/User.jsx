import Navbar from "./components/UI/Navbar";



const UserPage = () => {
  return (
    <>
      <Navbar title='Mediafy' Icon={CgAbstract} />
      <div className="container mx-auto w-lg mt-10">
        <UsersLists />
        <ToastContainer />
      </div>
    </>
  );
};

export default UserPage;
