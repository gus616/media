import { CgAbstract } from "react-icons/cg"

const Navbar = () => {
  return (
    <nav className="bg-teal-500 p-4 top-0 w-full position-fixed z-10">
        <div className="container mx-auto flex items-center">
            <CgAbstract className="text-white text-3xl mr-2"/>
            <h1 className="text-white text-2xl font-bold">Mediafy</h1>
            <button className="text-white text-2xl ml-auto" onClick={() => console.log('Navbar closed')}>X</button>
        </div>
    </nav>
  )
}

export default Navbar