import MoviesDisplay from './components/MoviesDisplay'
import MovieForm from './components/MovieForm'
import LogIn from './components/LogIn'
import { Routes, Route, Link, } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { initialMovies } from './reducers/moviesReducer'
import { useEffect } from 'react'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initialMovies())
  }, [])

  const padding = {
    paddingRight: 5
  }

  return (
    <>
      <div>
        <Link style={padding} to='/movies'>Movies</Link>
        <Link style={padding} to='/movies/add'>Add Movie</Link>
        <Link style={padding} to='/login'>Log In</Link>
      </div>
      <Routes>
        <Route path='/movies' element={<MoviesDisplay />} />
        <Route path='/movies/add' element={<MovieForm />} />
        <Route path='/login' element={<LogIn />} />
      </Routes>
    </>
  )
}

export default App