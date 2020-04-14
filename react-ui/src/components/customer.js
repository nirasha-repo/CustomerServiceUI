import React, { Component } from "react";
import CustomerDataService from "../services/customer.service";

export default class Customer extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getCustomer = this.getCustomer.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateCustomer = this.updateCustomer.bind(this);
    this.deleteCustomer = this.deleteCustomer.bind(this);

    this.state = {
      currentCustomer: {
        id: null,
        title: "",
        description: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getCustomer(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentCustomer: {
          ...prevState.currentCustomer,
          title: title
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentCustomer: {
        ...prevState.currentCustomer,
        description: description
      }
    }));
  }

  getCustomer(id) {
    CustomerDataService.get(id)
      .then(response => {
        this.setState({
          currentCustomer: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentCustomer.id,
      title: this.state.currentCustomer.title,
      description: this.state.currentCustomer.description,
      published: status
    };

    CustomerDataService.update(this.state.currentCustomer.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentCustomer: {
            ...prevState.currentCustomer,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateCustomer() {
    CustomerDataService.update(
      this.state.currentCustomer.id,
      this.state.currentCustomer
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The Customer was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteCustomer() {    
    CustomerDataService.delete(this.state.currentCustomer.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/Customers')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentCustomer } = this.state;

    return (
      <div>
        {currentCustomer ? (
          <div className="edit-form">
            <h4>Customer</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentCustomer.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentCustomer.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentCustomer.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentCustomer.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteCustomer}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateCustomer}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Customer...</p>
          </div>
        )}
      </div>
    );
  }
}
