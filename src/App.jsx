import './App.css'
import HomePage from './Pages/HomePage.jsx'
import { Context} from "./AppContext.jsx"

function App() {

  return (
    <Context>
        <HomePage/>
    </Context>
  )
}

export default App
