import { Route, Routes, Navigate } from 'react-router-dom';
import { Chats, Register, Login } from './pages';
import { NavBar } from './components';
import { Container } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css"

function App() {
  return (
    <>
      <NavBar />
      <Container className='text-secondary'>
        <Routes>
          <Route path='/' element={<Chats />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='*' element={<Navigate to="/" />} />
        </Routes>
      </Container>
    </>
  )
}

export default App
