import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { NoirPage } from './pages/NoirPage'
import { RivieraPage } from './pages/RivieraPage'
import { StudioPage } from './pages/StudioPage'
import { CoverPage } from './pages/CoverPage'
import { VinhoPage } from './pages/VinhoPage'
import { vinhoVariations } from './content/vinhoVariations'

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
        <Route path="/vinho-v1" element={<VinhoPage variation={vinhoVariations.v1} />} />
        <Route path="/vinho-v2" element={<VinhoPage variation={vinhoVariations.v2} />} />
        <Route path="/vinho-v3" element={<VinhoPage variation={vinhoVariations.v3} />} />
        <Route path="/vinho-v4" element={<VinhoPage variation={vinhoVariations.v4} />} />
        <Route path="/vinho-v5" element={<VinhoPage variation={vinhoVariations.v5} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
