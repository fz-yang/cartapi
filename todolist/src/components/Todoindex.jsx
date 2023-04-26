import React, { Component } from 'react';
import axios from 'axios';
class TodoIndex extends Component {
    state = { 
        todoList:[]
    }
    render() {
        return (
        <div className="mx-5">
            <h1>
            待辦事項清單
            <a href="/todo/create" className="btn btn-outline-success btn-md float-right">
                新增
            </a>
        </h1>
    
        <table id="jobList" className="table table-striped table-hover">
            <thead>
                <tr>
                    <th>
                        項目名稱
                    </th>
                    <th>
                        是否已完工
                    </th>
                    <th>&nbsp;</th>
                </tr>
            </thead>

            <tbody>
                {
                this.state.todoList.map((todoItem) => (
                    <tr key={todoItem.todoTableId}>
                      <td>{todoItem.title}</td>
                      <td>
                        <input
                          className="check-box"
                          disabled="disabled"
                          type="checkbox"
                          checked={todoItem.isComplete ? "checked" : ""}
                        />
                      </td>
                      <td>
                        <span className="float-right">
                          <a href="/Todo/Edit/1" className="btn btn-outline-primary btn-sm">
                            編輯
                          </a>
                          <span> | </span>
                          <a href="/Todo/Delete/1" className="btn btn-outline-danger btn-sm">
                            刪除
                          </a>
                        </span>
                      </td>
                    </tr>
                  ))
                  }
                
            </tbody>
        </table>
            </div>
    );

    
    }
        async componentDidMount() {
            var result = await axios.get("http://localhost:8000/todo/list");
            var newState = {...this.state};
            newState.todoList = result.data;
            this.setState(newState);
        }
    }

 
export default TodoIndex;