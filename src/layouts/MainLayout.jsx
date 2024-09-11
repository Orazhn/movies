import { Outlet } from 'react-router-dom'

export default function  MainLayout() {
  return (
    <div className='bg-slate-800 font-sans'>
        <Outlet/>
    </div>
  )
}
