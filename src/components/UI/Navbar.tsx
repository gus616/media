import { IconType } from "react-icons"

type NavbarProps = {
  title: string,
  Icon: IconType
}

const Navbar = ({ title, Icon } : NavbarProps) => {
  return (
    <nav className="bg-teal-500 p-4 top-0 w-full position-fixed z-10">
      <div className="container mx-auto flex items-center">
        <Icon  />
        <h1 className="text-white text-2xl font-bold">{title}</h1>
        <button className="text-white text-2xl ml-auto" onClick={() => console.log('Navbar closed')}>X</button>
      </div>
    </nav>
  )
}

export default Navbar