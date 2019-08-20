import React, { Component } from "react"
import "./App.css"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import OtherPage from "./OtherPage"
import Fib from "./Fib"

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container border rounded my-4 bg-light p-3 w-50">
          <h1 className="display-4">Fibonacci Calculator</h1>
          <Link to="/">Home</Link> <Link to="/otherpage">Other Page</Link>
          <div>
            <Route exact path="/" component={Fib} />
            <Route path="/otherpage" component={OtherPage} />
          </div>
        </div>
      </Router>
    )
  }
}

export default App
