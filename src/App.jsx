import './App.css'
import Content from './components/Content'
import Header from './components/Header'
import Footer from './components/Footer'
import TeamList from './components/TeamList'
import AddTeam from './components/AddTeam'
import EditTeam from './components/EditTeam'
import PlayerDetails from './components/PlayerDetails'
import AddPlayer from "./components/AddPlayer";


import { Nav, Navbar, Container } from 'react-bootstrap'
import { Routes, Route, Link } from 'react-router-dom'

function App() {
  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">VTeams</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/teams">Teams</Nav.Link>
            <Nav.Link as={Link} to="/add">Add Team</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<Content />} />
        <Route path="/teams" element={<TeamList />} />
        <Route path="/add" element={<AddTeam />} />
        <Route path="/edit/:id" element={<EditTeam />} />
        <Route path="/teams/:teamId/players/:playerId" element={<PlayerDetails />} />
        <Route path="/teams/:teamId/players/add" element={<AddPlayer />} />

      </Routes>

      <Footer />
    </>
  )
}

export default App
