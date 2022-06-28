import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './component/Home/Home'
import {BlogDetail} from './component/BlogDetail/BlogDetail'
import {CreateNewPost} from './component/NewPost/CreateNewPost'
import { BrowserRouter,Route ,Switch} from 'react-router-dom';
function App() {
  return (
   
    <div className="App">
       <BrowserRouter>
       <Switch>
       <Route component={Home} exact path="/" />
       <Route component={BlogDetail} exact path="/post/:postID" />
       <Route component={CreateNewPost} exact path="/create" />
        </Switch>
    </BrowserRouter>
    </div>
  );
}

export default App;
