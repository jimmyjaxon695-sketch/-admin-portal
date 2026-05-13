import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CoffeeProvider } from './context/CoffeeContext'
import Navbar from './components/NavBar'
import Home from './components/Home'
import Shop from './components/Shop'
import AdminPortal from './components/AdminPortal'

function App() {
  return (
    <CoffeeProvider>
      <BrowserRouter>
        <div className="app-shell">
          <Navbar />
          <main className="page-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/admin" element={<AdminPortal />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </CoffeeProvider>
  )
}

export default App
