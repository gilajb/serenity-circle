import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.tsx'
import About from './pages/About.tsx'
import Contact from './pages/Contact.tsx'
import Directory from './pages/Directory.tsx'
import Home from './pages/Home.tsx'
import NotFound from './pages/NotFound.tsx'
import Resources from './pages/Resources.tsx'
import Services from './pages/Services.tsx'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="services" element={<Services />} />
            <Route path="directory" element={<Directory />} />
            <Route path="resources" element={<Resources />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
