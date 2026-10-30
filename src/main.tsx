import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import '@fontsource-variable/fraunces/index.css'
import '@fontsource-variable/fraunces/wght-italic.css'
import '@fontsource-variable/manrope/index.css'
import './index.css'
import App from './App'

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)
// Em produção o HTML já vem pré-renderizado (scripts/prerender.mjs): só hidrata.
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
