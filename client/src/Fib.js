import React, { Component } from "react"
import axios from "axios"

class Fib extends Component {
  state = {
    seenIndexes: [],
    values: {},
    index: ""
  }

  componentDidMount() {
    this.fetchValues()
    this.fetchIndexes()
  }

  async fetchValues() {
    const values = await axios.get("/api/values/current")
    this.setState({ values: values.data })
  }

  async fetchIndexes() {
    const seenIndexes = await axios.get("/api/values/all")
    this.setState({
      seenIndexes: seenIndexes.data
    })
  }

  handleSubmit = async (event) => {
    event.preventDefault()

    await axios.post("/api/values", {
      index: this.state.index
    })
    this.setState({ index: "" })
    this.fetchValues()
    this.fetchIndexes()
  }

  renderSeenIndexes() {
    return this.state.seenIndexes.map(({ number }) => number).join(", ")
  }

  renderValues() {
    const entries = []
    // eslint-disable-next-line
    for (let key in this.state.values) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {this.state.values[key]}
        </div>
      )
    }

    return entries
  }

  render() {
    return (
      <div>
        <form className="form-group" onSubmit={this.handleSubmit}>
          <label>Enter your index:</label>
          <input
            type="number"
            className="form-control mb-2"
            id="number"
            name="number"
            placeholder="Please give me a number"
            value={this.state.index}
            onChange={(event) => this.setState({ index: event.target.value })}
          />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>

        <h6>Indexes I have seen:</h6>
        {this.renderSeenIndexes()}

        <h6>Calculated Values:</h6>
        {this.renderValues()}
      </div>
    )
  }
}

export default Fib
