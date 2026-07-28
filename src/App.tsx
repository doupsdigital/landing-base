import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { NoirPage } from './pages/NoirPage'
import { RivieraPage } from './pages/RivieraPage'
import { StudioPage } from './pages/StudioPage'
import { CoverPage } from './pages/CoverPage'
import { VinhoPage } from './pages/VinhoPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/noir" element={<NoirPage />} />
        <Route path="/riviera" element={<RivieraPage />} />
        <Route path="/studio" element={<StudioPage />} />
        <Route path="/cover" element={<CoverPage />} />
        <Route path="/vinho" element={<VinhoPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
