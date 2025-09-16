import React from 'react'
import ReactDOM from 'react-dom/client'
import { AppProviders } from './providers/AppProviders'
import App from './App'

const rootElement = document.getElementById('root') as HTMLElement

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>
)
