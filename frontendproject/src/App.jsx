import './App.css'
import { MainRouter } from './Router'
import AuthContext from './context/AuthContext'
import { BasketProvider } from './context/BasketContext'




function App() {

  return (



    <AuthContext>
      < BasketProvider>
        <MainRouter />
      </ BasketProvider>
    </AuthContext>




  )
}

export default App
