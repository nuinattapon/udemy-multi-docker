import React from "react"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

import "./App.css"

import Fib from "./Fib"
import OtherPage from "./OtherPage"

const App = () => {
  return (
    <Router>
      <div className="App">
        <header>
          <h1>Welcome to React</h1>
          <Link to="/">Home</Link>
          <Link to="/otherpage">Other Page</Link>
        </header>
        <div>
          <Route exact path="/" component={Fib} />
          <Route path="/otherpage" component={OtherPage} />
        </div>
      </div>
    </Router>
  )
}

export default App
