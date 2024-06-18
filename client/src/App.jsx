import { Route, Routes, Navigate } from 'react-router-dom';
import { Chats, Register, Login } from './pages';
import { NavBar } from './components';
import { Container } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css"
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

function App() {
  const { user } = useContext(AuthContext)
  return (
    <>
      <NavBar />
      <Container className='text-secondary'>
        <Routes>
          <Route path='/' element={user ? <Chats /> : <Login />} />
          <Route path='/login' element={user ? <Chats /> : <Login />} />
          <Route path='/register' element={user ? <Chats /> : <Register />} />
          <Route path='*' element={<Navigate to="/" />} />
        </Routes>
      </Container>
    </>
  )
}

export default App
