import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/caveat'
import '@fontsource-variable/lora'
import '@fontsource-variable/nunito-sans'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
