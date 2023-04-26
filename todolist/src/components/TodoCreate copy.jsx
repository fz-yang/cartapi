import React, { Component } from "react";

class TodoCreate extends Component {
  state = {
    title: "",
    isComplete: 1,
  };
  render() {
    return (
      <div className="container">
        <h1>待辦事項清單 - 新增</h1>
        <hr />
        <div className="row">
          <div className="col-md-4">
            <form action="/Todo/Create" method="post">
              <div className="form-group">
                <label className="control-label" htmlFor="Name">
                  項目名稱
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="Name"
                  name="Name"
                  value={this.state.title}
                  onChange={this.doTitleChange}
                />
              </div>
              <div className="form-group form-check">
                <label className="form-check-label">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="IsComplete"
                    name="IsComplete"
                    value="1"
                    checked={this.state.isComplete}
                    onChange={this.doIsCompleteChange}
                  />{" "}
                  是否已完工
                </label>
              </div>
              <div className="form-group">
                <input
                  type="submit"
                  value="確定"
                  className="btn btn-outline-primary"
                  onChange={doOkClick}
                />{" "}
                |
                <a href="/Todo/Index" className="btn btn-outline-info">
                  取消
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  doTitleChange = (e) => {
    console.log(e.target.value);
    var newState = { ...this.state };
    newState.title = e.target.value;
    this.setState(newState);
  };

  doIsCompleteChange = (e) => {
    console.log(e.target.value);
    var newState = { ...this.state };
    newState.isComplete = e.target.checked ? 1 : 0;
    this.setState(newState);
  };

  doOkClick = async () => {
    var dataToServer = {
      title: this.state.title,
      isComplete: this.state.isComplete,
    };

    await axios.post("http://localhost:8000/todo/create", dataToServer);
    window.location = "/todo/index";
  };
}

export default TodoCreate;