import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css"
import TodoIndex from './components/Todoindex.jsx';
 import TodoCreate from "./components/TodoCreate.jsx";
class App extends Component {
  render() {
    return (      
       <BrowserRouter>
        <div>
          <Switchxs>
             <Route path="/" component={TodoIndex} exact/>
             <Route path="/todo/index" component={TodoIndex} exact/>
             <Route path="/todo/create" component={TodoCreate} exact/>
          </Switchxs>
        </div>
      </BrowserRouter>
    );
  }
}
 
export default App;