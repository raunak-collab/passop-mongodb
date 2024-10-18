
import './App.css'
import Navbar from './components/Navbar'
// import Manager from './components/Manager'
import Manager from './components/mongo-manager'
import Footer from './components/footer'

// https://tailwindcss.com/docs/functions-and-directives

function App() {


  return (
    <>
      <div>
        <Navbar />
        <div className=' bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]'>
          <Manager />
        </div>
        <Footer />
      </div>
    </>
  )
}

export default App
