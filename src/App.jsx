import MoviesDisplay from './components/MoviesDisplay'
import MovieForm from './components/MovieForm'
import LogIn from './components/LogIn'
import { Routes, Route, Link, } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { initialMovies } from './reducers/moviesReducer'
import { checkLogged } from './reducers/userReducer'
import { useEffect } from 'react'

function App() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user);

  // Sets initial data...
  useEffect(() => {
    dispatch(initialMovies())
    dispatch(checkLogged())
  }, [])

  const padding = {
    paddingRight: 5
  }

  console.log(user);

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