/* eslint-disable react/react-in-jsx-scope */
import LoginPage from '@/app/login/page'
import { BrowserRouter, Route, Routes } from 'react-router'
import RegisterPage from '../app/register/page'
import PageEsperaBusqueda from '../app/tiempo-redireccion/page'
import { Dashboard } from '../page/home/dashboard'
 
export const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage/>}></Route>
        <Route path='/register' element={<RegisterPage/>}></Route>
        <Route path='/time-await' element={<PageEsperaBusqueda/>}></Route>

        <Route path='/dashboard' element={<Dashboard />}></Route>
      </Routes>
    </BrowserRouter>
  )
}