import './App.scss'
import { getUser, useUser } from './lib/auth'
import { LoginPage } from './pages/LoginPage'

function App() {
  const { user, setUser} = useUser();
  getUser().then(setUser);
  return (
    <>
      <h1>APP</h1>
      <LoginPage />
      <pre>{JSON.stringify(user || 'NOT LOGGED IN', null, 2)}</pre>
    </>
  )
}

export default App
