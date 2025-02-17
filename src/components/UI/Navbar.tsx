import { IconType } from "react-icons"
import { useNavigate } from "react-router"

type NavbarProps = {
  title: string,
  Icon: IconType,
  IconStyles: string
}

const Navbar = ({ title, Icon, IconStyles = "container mx-auto flex items-center" }: NavbarProps) => {
  const navigate = useNavigate();
  const handleNavbarClose = () => {
    console.log('Navbar closed')
    navigate('/'); // Redirect to the home page
  };

  return (
    <nav className="bg-teal-500 p-4 top-0 w-full position-fixed z-10 flex justify-between items-center">
      <div className={IconStyles}>
        <Icon className="text-white text-3xl mr-2" />
        <h1 className="text-white text-2xl font-bold">{title}</h1>
      </div>
      <div className="bg-red-500 w-10 h- flex items-center justify-center" onClick={handleNavbarClose}>
        <button className="text-white text-2xl" onClick={handleNavbarClose}>X</button>
      </div>
    </nav>
  )
}

export default Navbar