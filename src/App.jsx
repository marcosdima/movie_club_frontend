import MoviesDisplay from './components/MoviesDisplay'
import MovieForm from './components/MovieForm'
import { Routes, Route, Link, } from 'react-router-dom'

function App() {
  const padding = {
    paddingRight: 5
  }
  return (
    <>
      <div>
        <Link style={padding} to='/movies'>Movies</Link>
        <Link style={padding} to='/movies/add'>Add Movie</Link>
      </div>
      <Routes>
        <Route path='/movies' element={<MoviesDisplay />} />
        <Route path='/movies/add' element={<MovieForm />} />
      </Routes>
    </>
  )
}

export default App