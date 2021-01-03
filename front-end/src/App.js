import './App.css';
import { Navigation } from './components/Navigation';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ArtPiecesContainer } from './components/ArtPiecesContainer';
import { Home } from './components/Home';
import { Register } from './components/Register';
import { Login } from './components/Login';
import { ArtUpload } from './components/ArtUpload';

function App() {
  return (
    <Router>
      <Navigation />
      <Route path='/art' component={ArtPiecesContainer} />
      <Route path='/addart' component={ArtUpload} />
      <Route path='/register' component={Register} />
      <Route path='/login' component={Login} />
      <Route exact path='/' component={Home} />
    </Router>
  );
}

export default App;
