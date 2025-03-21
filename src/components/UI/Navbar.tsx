import { IconType } from "react-icons"
import { useAppDispatch } from "../../hooks/hooks"
import { logout } from "../../store/Auth/AuthSlice"
import Modal from "./Modal"
import { useState } from "react"

type NavbarProps = {
  title: string,
  Icon: IconType,
  IconStyles: string
}

const Navbar = ({ title, Icon, IconStyles = "container mx-auto flex items-center" }: NavbarProps) => {

  const dispatch = useAppDispatch();

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false);



  const handleNavbarClose = () => {
    dispatch(logout());
  };

  const confirmLogout = <Modal isOpen={isLogoutModalOpen} onClose={() => setIsLogoutModalOpen(false)}>
    <div className="flex flex-col items-center justify-center">
      <p className="mb-5">Are you sure you want to logout?</p>
      <div className="flex flex-row items-center justify-between w-full">
        <button className="bg-green-500 text-white p-2 w-full rounded mt-2 mr-5" onClick={() => handleNavbarClose()}>Yes</button>
        <button className="bg-red-500 text-white p-2 w-full rounded mt-2" onClick={() => setIsLogoutModalOpen(false)}>No</button>
      </div>
    </div>
  </Modal>

  return (
    <nav className="bg-teal-500 p-4 top-0 w-full position-fixed z-10 flex justify-between items-center">
      {confirmLogout}
      <div className={IconStyles}>
        <Icon className="text-white text-3xl mr-2" />
        <h1 className="text-white text-2xl font-bold">{title}</h1>
      </div>
      <div className="bg-red-500 w-10 h- flex items-center justify-center" onClick={() => setIsLogoutModalOpen(true)}>
        <button className="text-white text-2xl" onClick={()=> setIsLogoutModalOpen(true)}>X</button>
      </div>
    </nav>
  )
}

export default Navbar