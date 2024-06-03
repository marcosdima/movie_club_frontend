
import Bar from './components/Bar'
import GroupsDisplay from './components/GroupsDisplay'
import Group from './components/Group'
import LogIn from './components/LogIn'
import Logout from './components/Logout'
import Movie from './components/Movie'
import MoviesDisplay from './components/MoviesDisplay'
import MovieForm from './components/MovieForm'
import SignIn from './components/SignIn'
import UserDisplay from './components/UserDisplay'
import { Routes, Route, Navigate, useMatch, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { initialMovies } from './reducers/moviesReducer'
import { checkLogged, resetUser } from './reducers/userReducer'
import { initialGroups } from './reducers/groupsReducer'
import { initialUsers } from './reducers/usersReducer'
import { useEffect } from 'react'
import { getToken } from './utils/tokenManager'

const tokenExpired = () => {
  const decodeToken = (token) => {
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    return decodedToken;
  }
  const token = getToken();
  if (!token) return false;
  const decodedToken = decodeToken(token);
  const expirationDate = new Date(decodedToken.exp * 1000);
  const now = new Date();
  return expirationDate < now
}

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.user);
  const movies = useSelector(state => state.movies);
  const users = useSelector(state => state.users);

  // Sets initial data...
  useEffect(() => {
    dispatch(initialMovies());
    dispatch(checkLogged());
  }, [])

  // Sets data that depends on user
  useEffect(() => {
    if (user) {
      dispatch(initialGroups());
      dispatch(initialUsers());
    }
  }, [user])

  // Checks if the token expired...
  if (tokenExpired()) {
    dispatch(resetUser());
    navigate('/login');
  }

  // Gets the movie at the url id...
  const movieId = useMatch('/movies/:id');
  const movie = movieId ? movies.find((movie) => movie.id === movieId.params.id) : null;

  // Gets the username at the url id...
  const username = useMatch('/users/:username');
  const userTarget = username ? users.find((user) => user.username === username.params.username) : null;

  return (
    <div style={{ padding: 10 }}>
      <Bar />
      <Routes>
        <Route path='/group' element={<Group />} />
        <Route path='/groups' element={<GroupsDisplay />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/logout' element={<Logout/>} />
        <Route path='/movies' element={<MoviesDisplay />} />
        <Route path='/movies/:id' element={<Movie movie={movie}/>} />
        <Route path='/movies/add' element={user ? <MovieForm /> : <Navigate replace to='/login' />} />
        <Route path='/sign' element={<SignIn />} />
        <Route path='/users/:username' element={<UserDisplay user={userTarget}/>} ></Route>
      </Routes>
    </div>
  )
}

export default App