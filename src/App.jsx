import MoviesDisplay from './components/MoviesDisplay'
import MovieForm from './components/MovieForm'
import LogIn from './components/LogIn'
import Logout from './components/Logout'
import GroupsDisplay from './components/GroupsDisplay'
import Movie from './components/Movie'
import { Routes, Route, Link, Navigate, useMatch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { initialMovies } from './reducers/moviesReducer'
import { checkLogged } from './reducers/userReducer'
import { useEffect } from 'react'
import { initialGroups } from './reducers/groupsReducer'

function App() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user);
  const movies = useSelector(state => state.movies);

  // Sets initial data...
  useEffect(() => {
    dispatch(initialMovies());
    dispatch(checkLogged());
    dispatch(initialGroups());
  }, [])

  // Gets the movie at the url id...
  const movieId = useMatch('/movies/:id');
  const movie = movieId ? movies.find((movie) => movie.id === movieId.params.id) : null;

  const padding = {
    paddingRight: 5
  }

  const afterLogged = () => {
    return (
      <>     
        <Link style={padding} to='/groups'>Groups</Link>
        <Logout /> 
      </>
    );
  }

  return (
    <>
      <div>
        <Link style={padding} to='/movies'>Movies</Link>
        <Link style={padding} to='/movies/add'>Add Movie</Link>
        { 
          !user 
          ? <Link style={padding} to='/login'>Log In</Link>
          : afterLogged()
        }
      </div>
      <Routes>
        <Route path='/movies' element={<MoviesDisplay />} />
        <Route path='/movies/:id' element={<Movie movie={movie}/>} />
        <Route path='/movies/add' element={user ? <MovieForm /> : <Navigate replace to="/login" />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/groups' element={<GroupsDisplay />} />
      </Routes>
    </>
  )
}

export default App