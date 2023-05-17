import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './components/pages/Home/Home'
import Company from './components/pages/Company/Company'
import Contact from './components/pages/Contact/Contact'
import NewProject from './components/pages/NewProject/NewProject'
import Container from './components/layouts/Container/Container'
import NavBar from './components/layouts/NavBar/NavBar'
import Footer from './components/layouts/Footer/Footer'
import Projects from './components/pages/Projects/Projetcts'


function App() {
  return (
    <Router>
      <NavBar/>
      <Container customClass="min-height">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/company" element={<Company />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/newProject" element={<NewProject />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
