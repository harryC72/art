import './App.css';
import { Navigation } from './components/Navigation';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ArtPiecesContainer } from './components/ArtPiecesContainer';
import { Blog } from './components/Blog';
import { RegisterUser } from './components/RegisterUser';
import { Login } from './components/Login';
import { ArtUpload } from './components/ArtUpload';
import { UserTable } from './components/UserTable';
import { UpdateUser } from './components/UpdateUser';

function App() {
  return (
    <Router>
      <Navigation />
      <Route path='/art' component={ArtPiecesContainer} />
      <Route path='/addart' component={ArtUpload} />
      <Route path='/register' component={RegisterUser} />
      <Route path='/users' component={UserTable} />
      <Route path='/user/:id' component={UpdateUser} />
      <Route path='/login' component={Login} />
      <Route exact path='/' component={Blog} />
    </Router>
  );
}

export default App;
