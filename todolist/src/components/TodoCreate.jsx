import React, { Component } from "react";
import axios from "axios";

class Create extends Component {
  state = {
    title: "",
    isComplete: false,
  };

  handleTitleChange = (event) => {
    const title = event.target.value;
    this.setState({ title });
  };

  handleIsCompleteChange = (event) => {
    const isComplete = event.target.checked;
    this.setState({ isComplete });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { title, isComplete } = this.state;
    const dataToServer = { title, isComplete };
    try {
      await axios.post("http://localhost:8000/todo/create", dataToServer);
      window.location = "/todo/index";
    } catch (error) {
      console.error("新增失敗:", error);
    }
  };

  render() {
    const { title, isComplete } = this.state;

    return (
      <div className="container">
        <h1>待辦事項清單 - 新增</h1>
        <hr />
        <div className="row">
          <div className="col-md-4">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">項目名稱</label>
                <input
                  className="form-control"
                  type="text"
                  id="title"
                  name="title"
                  value={title}
                  onChange={this.handleTitleChange}
                />
              </div>
              <div className="form-group form-check">
                <label className="form-check-label">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="isComplete"
                    name="isComplete"
                    checked={isComplete}
                    onChange={this.handleIsCompleteChange}
                  />
                  是否已完工
                </label>
              </div>
              <div className="form-group">
                <input
                  type="submit"
                  value="確定"
                  className="btn btn-outline-primary"
                />
                |
                <a href="/todo/index" className="btn btn-outline-info">
                  取消
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;
