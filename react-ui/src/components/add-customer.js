import React, { Component } from "react";
import CustomerDataService from "../services/customer.service";

export default class AddCustomer extends Component {
  constructor(props) {
    super(props);

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeDateOfBirth = this.onChangeDateOfBirth.bind(this);
    this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeSuburb = this.onChangeSuburb.bind(this);
    this.onChangePostcode = this.onChangePostcode.bind(this);
    this.saveCustomer = this.saveCustomer.bind(this);
    this.updateCustomer = this.updateCustomer.bind(this);
    this.newCustomer = this.newCustomer.bind(this);    
    this.initialise = this.initialise.bind(this);  
    this.getCustomer = this.getCustomer.bind(this);  
    this.formatDateForCustomer=this.formatDateForCustomer.bind(this);

    this.initialise();
  }

  initialise(){
    this.state = {
      customer: {title: 'Mr.'},      
      id: null,
      published: false,
      submitted: false,
      errorMessage: ''   
    };
  }

  componentDidMount() {
    const customerId = this.props.match.params.id;
    if(customerId){
      this.getCustomer(customerId);
    }
    var test=this.state.customer;
  }

  getCustomer(id) {
    CustomerDataService.get(id)
      .then(response => {
        this.setState({
          customer: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  formatDateForCustomer(customer){
    if(customer.customerId!==undefined && customer.dateOfBirth!==undefined 
      && customer.customerId>0 )
    {
      if(customer.dateOfBirth.includes('T') && customer.dateOfBirth.length>10){
          var stringdate = customer.dateOfBirth;
          var newdate=stringdate.replace("T00:00:00")
          var year=newdate.substr(0,4);
          var month=newdate.substr(5,2);
          var day=newdate.substr(8,2);
          var formattedDate=day + "/" + month + "/" + year
          customer.dateOfBirth=formattedDate;
        return customer;
      }
    }
    return customer;
  }

  setCustomer(customer) {
     this.setState({
      customer: customer
    });
  }

  onChangeTitle(e) {   
    const customer = {...this.state.customer};
    customer.title = e.target.value;
    this.setCustomer(customer);
  }

  onChangeFirstName(e) {
    const customer = {...this.state.customer};
    customer.firstName = e.target.value;
    this.setCustomer(customer);
  }

  onChangeLastName(e) {
    const customer = {...this.state.customer};
    customer.lastName = e.target.value;
    this.setCustomer(customer);
  }

  onChangeEmail(e) {
    const customer = {...this.state.customer};
    customer.emailAddress = e.target.value;
    this.setCustomer(customer);
  }

  onChangeDateOfBirth(e) {
    const customer = {...this.state.customer};
    customer.dateOfBirth = e.target.value;
    this.setCustomer(customer);
  }

  onChangePhoneNumber(e) {
    const customer = {...this.state.customer};
    customer.mobilePhoneNo = e.target.value;
    this.setCustomer(customer);
  }

  onChangeAddress(e) {
    const customer = {...this.state.customer};
    customer.streetAddress = e.target.value;
    this.setCustomer(customer);
  }

  onChangeSuburb(e) {
    const customer = {...this.state.customer};
    customer.suburbCity = e.target.value;
    this.setCustomer(customer);
  }

  onChangePostcode(e) {
    const customer = {...this.state.customer};
    customer.postCode = e.target.value;
    this.setCustomer(customer);
  }

  validateCustomer() {
    var customer = this.state.customer;

    if(customer.firstName === undefined || customer.firstName === '') {
      return {isValid: false, message: 'First Name cannot be empty!'};      
    }
     
    if(!(/^[a-zA-Z ]+$/.test(customer.firstName))) {
      return {isValid: false, message: 'Please enter only alphabetical letters for First Name!'};      
    }

    if(customer.lastName === undefined || customer.lastName === '') {
      return {isValid: false, message: 'Last Name cannot be empty!'};      
    }
     
    if(!(/^[a-zA-Z ]+$/.test(customer.lastName))) {
      return {isValid: false, message: 'Please enter only alphabetical letters for Last Name!'};      
    }

    if(customer.emailAddress === undefined || customer.emailAddress === '') {
      return {isValid: false, message: 'Email cannot be empty!'};      
    }
     
    if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(customer.emailAddress))) {
      return {isValid: false, message: 'Invalid emailAddress!'};      
    }

    if(customer.dateOfBirth === undefined || customer.dateOfBirth === '') {
      return {isValid: false, message: 'Date of Birth cannot be empty!'};      
    }
     
    if(!(/^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/.test(customer.dateOfBirth))) {
      return {isValid: false, message: 'Invalid date of birth!'};      
    }
     
    if(customer.mobilePhoneNo !== undefined && customer.mobilePhoneNo !== '' && !(/^[0-9]+$/.test(customer.mobilePhoneNo))) {
      return {isValid: false, message: 'Please enter only numerics for Phone Number!'};      
    }  

    if(customer.postCode !== undefined && customer.postCode !== '' && !(/^[0-9]+$/.test(customer.postCode))) {
      return {isValid: false, message: 'Please enter only numerics for Postcode!'};      
    } 
    
    return {isValid: true, message: ''};
  }


  updateCustomer() {
    var data = this.state.customer;
    var error = this.validateCustomer();
    var dobArr = data.dateOfBirth.split('/');
    var newData = {...data}
    var jsonDob = dobArr[2] + '-' + dobArr[1] + '-' + dobArr[0] + 'T00:00:00';
    newData.dateOfBirth = jsonDob;

    if(error.isValid) {
      this.setState({errorMessage: ''})   
      CustomerDataService.update (data.customerId, newData)
      .then(response => {
        this.setState({
          published: response.data.published,     
          submitted: true
        });
        console.log(response.data);
        this.props.history.push('/')
      })
      .catch(e => {
        console.log(e);
        this.setState({errorMessage: 'Internal server error!'})
      });
    }
    else {
      this.setState({errorMessage: error.message});
    }
  }

  saveCustomer() {
    var data = this.state.customer;
    var error = this.validateCustomer();
    var dobArr = data.dateOfBirth.split('/');
    var newData = {...data}
    var jsonDob = dobArr[2] + '-' + dobArr[1] + '-' + dobArr[0] + 'T00:00:00';
    newData.dateOfBirth = jsonDob;

    if(error.isValid) {
      this.setState({errorMessage: ''})       
      CustomerDataService.create(newData)
      .then(response => {
        this.setState({
          published: response.data.published,     
          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
        this.setState({errorMessage: 'Internal server error!'})
      });
    }
    else {
      this.setState({errorMessage: error.message});
    }
  }

  newCustomer() {
    this.setState({
      id: null,
      title: "",
      description: "",
      published: false,
      submitted: false
    });
  }

  render() {
    const { errorMessage} = this.state;
    const existingCustomer=this.state.customer

    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>Customer is added!</h4>
            <button className="btn btn-success" onClick={this.newCustomer}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <h4> { existingCustomer.customerId>0? 'Update Customer':'Add Customer' } </h4>
           
            <div className="form-group">
              <label htmlFor="salutation">Title <span className="text-danger">*</span></label>
              <select className="form-control" onChange={this.onChangeTitle} name="salutation">
                <option value="Mr.">Mr.</option>
                <option value="Mrs.">Mrs.</option>
                <option value="Miss.">Miss.</option>
                <option value="Mstr.">Mstr.</option>    
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="firstName">First Name <span className="text-danger">*</span></label>
              <input
                type="text"
                autoComplete="off"
                className="form-control"
                id="firstName"
                required
                value={this.state.customer.firstName}
                onChange={this.onChangeFirstName}
                name="firstName"
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name <span className="text-danger">*</span></label>
              <input
                type="text"
                autoComplete="off"
                className="form-control"
                id="lastName"
                required
                value={this.state.customer.lastName}
                onChange={this.onChangeLastName}
                name="lastName"
              />
            </div>
            <div className="form-group">
              <label htmlFor="emailAddress">Email <span className="text-danger">*</span></label>
              <input
                type="text"
                autoComplete="off"
                className="form-control"
                id="emailAddress"
                required
                value={this.state.customer.emailAddress}
                onChange={this.onChangeEmail}
                name="emailAddress"
              />
            </div>
            <div className="form-group">
              <label htmlFor="dateOfBirth">Date of Birth <span className="text-danger">*</span></label>
              <input
                type="text"
                autoComplete="off"
                className="form-control"
                id="dateOfBirth"
                required
                value={this.formatDateForCustomer(this.state.customer).dateOfBirth}
                onChange={this.onChangeDateOfBirth}
                name="dateOfBirth"
              />
              ex: 15/06/1997
            </div>
            <div className="form-group">
              <label htmlFor="mobilePhoneNo">Phone Number</label>
              <input
                type="text"
                autoComplete="off"
                className="form-control"
                id="mobilePhoneNo"
                required
                value={this.state.customer.mobilePhoneNo}
                onChange={this.onChangePhoneNumber}
                name="mobilePhoneNo"
              />
            </div>
            <div className="form-group">
              <label htmlFor="streetAddress">Address</label>
              <input
                type="text"
                autoComplete="off"
                className="form-control"
                id="streetAddress"
                required
                value={this.state.customer.streetAddress}
                onChange={this.onChangeAddress}
                name="streetAddress"
              />
            </div>
            <div className="form-group">
              <label htmlFor="suburbCity">Suburb</label>
              <input
                type="text"
                autoComplete="off"
                className="form-control"
                id="suburbCity"
                required
                value={this.state.customer.suburbCity}
                onChange={this.onChangeSuburb}
                name="suburbCity"
              />
            </div>			
            <div className="form-group">
              <label htmlFor="postCode">Postcode</label>
              <input
                type="text"
                autoComplete="off"
                className="form-control"
                id="postCode"
                required
                value={this.state.customer.postCode}
                onChange={this.onChangePostcode}
                name="postCode"
              />
            </div>            

            <div className="form-group">

            {existingCustomer.customerId>0  
            ? <button onClick={this.updateCustomer} className="btn btn-success"> Update </button>
            : <button onClick={this.saveCustomer} className="btn btn-success"> Add </button>
      }

            
            </div> 

            <div className="form-group">     
                {errorMessage !== '' ? 
                  <div className="alert alert-danger" role="alert">
                  {errorMessage}
                  </div>
                  : null} 
            </div>
            
          </div>
        )}
      </div>
    );
  }
}
