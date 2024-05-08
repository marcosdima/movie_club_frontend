import MoviesDisplay from './components/MoviesDisplay'
import MovieForm from './components/MovieForm'
import LogIn from './components/LogIn'
import Logout from './components/Logout'
import { Routes, Route, Link, Navigate } from 'react-router-dom'
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

  return (
    <>
      <div>
        <Link style={padding} to='/movies'>Movies</Link>
        <Link style={padding} to='/movies/add'>Add Movie</Link>
        { 
          !user 
          ? <Link style={padding} to='/login'>Log In</Link>
          : <Logout /> 
        }
      </div>
      <Routes>
        <Route path='/movies' element={ <MoviesDisplay /> } />
        <Route path='/movies/add' element={ user ? <MovieForm /> : <Navigate replace to="/login" /> } />
        <Route path='/login' element={ <LogIn /> } />
      </Routes>
    </>
  )
}

export default App