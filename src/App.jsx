
import GroupsDisplay from './components/GroupsDisplay'
import Group from './components/Group'
import LogIn from './components/LogIn'
import Logout from './components/Logout'
import Movie from './components/Movie'
import MoviesDisplay from './components/MoviesDisplay'
import MovieForm from './components/MovieForm'
import UserDisplay from './components/UserDisplay'
import { Routes, Route, Link, Navigate, useMatch, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { initialMovies } from './reducers/moviesReducer'
import { checkLogged, resetUser } from './reducers/userReducer'
import { initialGroups } from './reducers/groupsReducer'
import { initialUsers } from './reducers/usersReducer'
import { useEffect } from 'react'
import { getToken } from './utils/tokenManager'
import InvitationsDisplay from './components/InvitationsDisplay'

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
  const group = useSelector(state => state.group);
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

  const padding = {
    paddingRight: 5
  }

  const afterLogged = () => {
    return (
      <>     
        <Link style={padding} to='/movies/add'>Add Movie</Link>
        <Link style={padding} to='/invitations'>Invitations</Link>
        <Link style={padding} to='/groups'>Groups</Link>
        { group ? <Link style={padding} to='/group'>{group.name}</Link> : <></> }
        <Link style={padding} to={`/users/${user.username}`}>{user.username}</Link>
        <Logout /> 
      </>
    );
  }

  return (
    <>
      <div>
        <Link style={padding} to='/movies'>Movies</Link>
        { 
          !user 
          ? <Link style={padding} to='/login'>Log In</Link>
          : afterLogged()
        }
      </div>
      <Routes>
        <Route path='/group' element={<Group />} />
        <Route path='/groups' element={<GroupsDisplay />} />
        <Route path='/invitations' element={<InvitationsDisplay />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/movies' element={<MoviesDisplay />} />
        <Route path='/movies/:id' element={<Movie movie={movie}/>} />
        <Route path='/movies/add' element={user ? <MovieForm /> : <Navigate replace to="/login" />} />
        <Route path='/users/:username' element={<UserDisplay user={userTarget}/>} ></Route>
      </Routes>
    </>
  )
}

export default App