import './App.css';
import Header from './common/header/Header';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Pages from './pages/Pages';

function App() {
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route path='/' exact>
            <Pages />
          </Route>
        </Switch>
      </Router>
      

    </>
  );
}

export default App;
