import { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {

  const navigate = useNavigate()

  const [showMenu, setShowMenu] = useState(false)
  const { token, setToken, userData } = useContext(AppContext)

  const logout = () => {
    localStorage.removeItem('token')
    setToken(false)
    navigate('/login')
  }

  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 shadow-xl'>
      <img onClick={() => navigate('/')} className='w-44 pl-5 cursor-pointer' src={assets.logo1} alt="" />
      <ul className='md:flex items-start gap-12 font-medium hidden'>
        <NavLink to='/' >
          <li className='py-2'>HOME</li>
          <hr className='border-none outline-none h-1 rounded-md bg-black w-5/5 m-auto hidden' />
        </NavLink>
        <NavLink to='/doctors' >
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full group-hover:transition-all"></span>
          <li className='py-2'>DOCTORS</li>
          <hr className='border-none outline-none h-1 rounded-md bg-black w-5/5 m-auto hidden hover:' />
        </NavLink>
        <NavLink to='/about' >
          <li className='py-2'>ABOUT US</li>
          <hr className='border-none outline-none h-1 rounded-md bg-black w-5/5 m-auto hidden' />
        </NavLink>
        <NavLink to='/contact' >
          <li className='py-2'>CONTACT  US</li>
          <hr className='border-none outline-none h-1 rounded-md bg-black w-5/5 m-auto hidden' />
        </NavLink>
        
          <a href="https://health-connect-tqsj.vercel.app/" className="py-2 px-3 border border-black rounded-2xl">Admin Panel</a>
        
      </ul>

      <div className='flex items-center gap-4 pr-5'>
        {
          token && userData
            ? <div className='flex items-center gap-2 cursor-pointer group relative'>
              <img className='w-8 rounded-full' src={userData.image} alt="" />
              <img className='w-2.5' src={assets.dropdown_icon} alt="" />
              <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                <div className='min-w-48 bg-gray-50 rounded flex flex-col gap-4 p-4'>
                  <p onClick={() => navigate('/my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                  <p onClick={() => navigate('/my-appointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
                  <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
                </div>
              </div>
            </div>
            : <button onClick={() => navigate('/login')} className='bg-orange-500 text-white px-8 py-3 rounded-full font-light hidden transition-all ease-in-out shadow-md hover:shadow-xl md:block hover:delay-150 hover:bg-white hover:text-orange-500 hover:shadow-orange-200 hover:outline hover:outline-1'>Create account</button>
        }
        <img onClick={() => setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="" />

        {/* ---- Mobile Menu ---- */}
        <div className={`md:hidden ${showMenu ? 'fixed w-full' : 'h-0 w-0'} right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
          <div className='flex items-center justify-between px-5 py-6'>
            <img src={assets.logo1} className='w-36' alt="" />
            <img onClick={() => setShowMenu(false)} src={assets.cross_icon} className='w-7' alt="" />
          </div>
          <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
            <NavLink onClick={() => setShowMenu(false)} to='/'><p className='px-4 py-2 rounded full inline-block'>HOME</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/doctors' ><p className='px-4 py-2 rounded full inline-block'>ALL DOCTORS</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/about' ><p className='px-4 py-2 rounded full inline-block'>ABOUT</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/contact' ><p className='px-4 py-2 rounded full inline-block'>CONTACT</p></NavLink>
            <a href="https://health-connect-tqsj.vercel.app/" className="py-2 px-4 border border-black rounded-2xl inline-block">Admin Panel</a>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar