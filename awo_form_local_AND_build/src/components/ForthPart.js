import React from 'react';
import { Popover, PopoverBody, Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import { ReCaptcha } from 'react-recaptcha-v3'

import service from './dataService';

var firstName;
var lastName;
var nexomReqID = 0;
var availability = new Set();

class ForthPart extends React.Component {

  leadPhoneVerified = false;
  componentDidMount() {

  }

  constructor(props) {
    super(props);

    this.state = {
      privacy_popup_open: false,
      verifyUserModal: false,
      modal: false,
      captchaValue: '',
      clientProfile: service.data.clientProfile
    };

    service.onValuesChanged(this.dataCenterDataChange.bind(this));

  }

  dataCenterDataChange(data) {
    this.setState({
      showForthPart: data.showForthPart
    });
    console.log(this.state);
  }

  privacy_toggle = this.privacy_toggle.bind(this);
  toggleModal = this.toggleModal.bind(this);
  toggleVerifyUserModal = this.toggleVerifyUserModal.bind(this);


  nameRef = React.createRef();
  phoneRef = React.createRef();
  emailRef = React.createRef();
  pinRef = React.createRef();

  verifyCallback = (recaptchaToken) => {
    // Here you will get the final recaptchaToken!!!  
    console.log(recaptchaToken, "<= your recaptcha token")
  }

  toggleWeekdayAvailability(e) {
    console.log(e.currentTarget.checked);
    console.log(e.currentTarget.name);
    console.log(e.currentTarget.name + '_');

    let client = this.state.clientProfile;
    console.log(client.weekly_availability.monday_availability);

    switch (e.currentTarget.name) {
      case 'Monday':
        if (e.currentTarget.checked === true) {
          console.log("sets display to block");
          client.weekly_availability.monday_availability = 'block';
          availability.add("Monday");
        }
        else if (e.currentTarget.checked === false) {
          console.log("sets display to none");
          client.weekly_availability.monday_availability = 'none';
          availability.remove("Monday");
        }
        break;
      case 'Tuesday':
        if (e.currentTarget.checked === true) {
          console.log("sets display to block");
          client.weekly_availability.tuesday_availability = 'block';
          availability.add("Tuesday");

        }
        else if (e.currentTarget.checked === false) {
          console.log("sets display to none");
          client.weekly_availability.tuesday_availability = 'none';
          availability.remove("Tuesday");

        }
        break;
      case 'Wednesday':
        if (e.currentTarget.checked === true) {
          console.log("sets display to block");
          client.weekly_availability.wednesday_availability = 'block';
          availability.add("Wednesday");
        }
        else if (e.currentTarget.checked === false) {
          console.log("sets display to none");
          client.weekly_availability.wednesday_availability = 'none';
          availability.remove("Wednesday");

        }
        break;
      case 'Thursday':
        if (e.currentTarget.checked === true) {
          console.log("sets display to block");
          client.weekly_availability.thursday_availability = 'block';
          availability.add("Thursday");
        }
        else if (e.currentTarget.checked === false) {
          console.log("sets display to none");
          client.weekly_availability.thursday_availability = 'none';
          availability.remove("Thursday");
        }
        break;
      case 'Friday':
        if (e.currentTarget.checked === true) {
          console.log("sets display to block");
          client.weekly_availability.friday_availability = 'block';
          availability.add("Friday");
        }
        else if (e.currentTarget.checked === false) {
          console.log("sets display to none");
          client.weekly_availability.friday_availability = 'none';
          availability.remove("Friday");

        }
        break;
      case 'Saturday':
        if (e.currentTarget.checked === true) {
          console.log("sets display to block");
          client.weekly_availability.saturday_availability = 'block';
          availability.add("Saturday");
        }
        else if (e.currentTarget.checked === false) {
          console.log("sets display to none");
          client.weekly_availability.saturday_availability = 'none';
          availability.remove("Saturday");

        }
        break;
      case 'Sunday':
        if (e.currentTarget.checked === true) {
          console.log("sets display to block");
          client.weekly_availability.sunday_availability = 'block';
          availability.add("Sunday");
        }
        else if (e.currentTarget.checked === false) {
          console.log("sets display to none");
          client.weekly_availability.sunday_availability = 'none';
          availability.remove("Sunday");

        }
        break;
      default:
        break;
    }


    // client.weekly_availability.$[weekday] = e.currentTarget.checked;


    this.setState({ clientProfile: client })

  }

  createWinRateCustomerEmail = (firstName, lastName, phone, email, testUser,
    businessName, communicationPreference) => {

    console.log("SENDING CUSTOMER EMAIL")
    if (phone == '') phone = 'N/A';
    if (businessName == '') businessName = 'N/A';

    var greeting = "";
    var emailBodyIntro = '';
    var emailBodyFooter = '';
    let meetingAvailability = '';
    var customerEmailSubjectTitle = '';
    var adminEmailSubjectTitle = '';
    let client = this.state.clientProfile;

    for (let weekday of availability) {
      switch (weekday) {
        case "Monday":
          meetingAvailability += 'Monday: ' + client.monday_times + ', ';
          break;
        case "Tuesday":
          meetingAvailability += 'Tuesday: ' + client.tuesday_times + ', ';
          break;
        case "Wednesday":
          meetingAvailability += 'Wednesday: ' + client.wednesday_times + ', ';
          break;
        case "Thursday":
          meetingAvailability += 'Thursday,: ' + client.thursday_times + ', ';
          break;
        case "Friday":
          meetingAvailability += 'Friday: ' + client.friday_times + ', ';
          break;
        case "Saturday":
          meetingAvailability += 'Saturday: ' + client.saturday_times + ', ';
          break;
        case "Sunday":
          meetingAvailability += 'Sunday: ' + client.sunday_times;
          break;
      }
    }

    var additionalNotes = document.getElementById("additionalNotes").value;

    if (testUser || this.myReferer === "http://localhost:3000/" || this.myReferer === "http://localhost:5000/") {
      customerEmailSubjectTitle = `Test of Customer Email- Thank you for visiting awowebbrands.com!`;
      adminEmailSubjectTitle = `Test of Customer Email- You have a new potential client!`;
    }
    else {
      customerEmailSubjectTitle = `Thank you for visiting awowebbrands.com!`;
      adminEmailSubjectTitle = `You have a new potential client!!`;
    }
    if (firstName === "") {
      greeting = "Hello from AWO Web Brands!";
    }
    else {
      greeting = "Thank you, " + firstName + "!";
    }

    emailBodyIntro = `You have an appointment booked very soon. Find details below:`
    emailBodyFooter = `
      Disregard this message if you are not the intended recipient.`

    var clientData = `
       - - - - - - - - - - - - - - - - - - - - - - - - -
      Source Page:
      Name: ${firstName} ${lastName} 
      Business name: ${businessName}
      Email: ${email}
      Phone: ${phone}
      Communication preference:  ${communicationPreference} 
      Meet availability: ${meetingAvailability}
      Additional Notes: ${additionalNotes}
      ---------------------------------------------------
      Referer: ${service.data.myReferer}`

    var adminEmailContent = `
    ${emailBodyIntro}
    ${clientData}
    `

    var customerEmailContent = `${greeting}
    ${emailBodyIntro}
    -Cheers,
    The awowebbrands Team
    (858) 305-9541
    https://www.awowebbrands.com
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    "Digital Marketing ● Website Management ● SE Prep 
    ${emailBodyFooter}
    ${clientData}
    If you no longer want to receive communications, reply to unsubscribe.
      `
    fetch('http://awowebbrands.com/api/nodeEmails', {

      // fetch('http://localhost:5000/api/nodeEmails', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        to: `${email}`,
        from: "iamsubomi@gmail.com",
        customerEmailSubjectTitle: customerEmailSubjectTitle,
        adminEmailSubjectTitle: adminEmailSubjectTitle,

        adminEmailContent: adminEmailContent,
        customerEmailContent: customerEmailContent
      })
    })
      .then(response => { console.log(response) })
      .catch(error => { console.log(error) })
  };

  getCommunicationPreference() {
    let communicationPreference = '';
    let tmpCommunicationPreference = document.getElementsByName("selected_choice").value;
    console.log(tmpCommunicationPreference);

    switch (tmpCommunicationPreference) {
      case 'PhoneOrEmail':
        communicationPreference = 'Phone or Email';
        break;
      case 'Phone':
        communicationPreference = "Phone";
        break;
      case 'Email':
        communicationPreference = "Online: Email or Google Meet";
        break;
      default:
        break;
    }
    return communicationPreference;
  }

  submitHandler = (event) => {
    event.preventDefault();
    let fullName = this.state.clientProfile.fullName;
    let email = this.state.clientProfile.email;
    let phone = this.state.clientProfile.phone;
    let businessName = this.state.clientProfile.businessName;
    let communicationPreference = this.getCommunicationPreference();
    let client = this.state.clientProfile;

    let splitName = fullName.split(' ');
    if (splitName.length < 2) {
      event.preventDefault();
      firstName = '';
      lastName = splitName[0];
    }
    else if (splitName.length >= 2 && fullName.length <= 120) {
      firstName = splitName[0];
      // switch to functional programming with list tails
      // let lastName = fullName[1:];
      lastName = splitName[1];

      var i;
      for (i = 2; i <= fullName.length; i++) {
        // update last name
        if (splitName[i] === undefined) {
          continue;
        }
        else {
          lastName += " " + splitName[i];
        }
      }
    }
    else {
      window.alert("Please enter your first and last name only(120 characters max).")
    }

    if (email !== '' && email.includes('@')) {
      var [account, addressDomain] = email.split('@');
      var domainParts = addressDomain.split('.');
      //   Email and phone verification
      if ((
        /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/.test(email) ||
        email === "") && email.length < 256 && account.length < 64 && domainParts.some(function (part) {
          return part.length < 63;
        })
      ) {
        // event.preventDefault();

        if (/^(\+)?([0-9]{1})?[-. ]?(\()?([0-9]{3})(\))?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(phone)) {
          var phoneNumber;
          console.log(" Matches phone number");

          // update phone number to accepted input for verification purposes
          var regex = /[+() .-]/g;
          phoneNumber = phone.replace(regex, '');
          if (phoneNumber.length === 10) {
            phoneNumber = '1' + phoneNumber;
          }

          console.log("Cleaned up number is now: " + phoneNumber);
          var req_id = this.sendVerificationCheck(phoneNumber);

          // console.log("Prinitng request id object IN FIRST PART:" + req_id);
          this.toggleVerifyUserModal();
          event.preventDefault();
          service.hideChanger('showThirdPart');

          this.createWinRateCustomerEmail(firstName, lastName, phone, email,
            true, businessName, communicationPreference);
        }
        else if (phone === '' && !this.state.verifyUserModal) {
          // Change Visible Page To Thank you page if user form is submitted,
          // with no additional info needed from customer.
          service.hideChanger('showThirdPart');

          this.createWinRateCustomerEmail(firstName, lastName, phone, email,
            true, businessName, communicationPreference);
        }
        else {
          event.preventDefault();
          window.alert("Please enter a valid number.");
        }
      }
      else {
        event.preventDefault();
        window.alert("Please enter a valid email address.");
      }
    }
    else {
      event.preventDefault();
      window.alert("Please enter a valid email address.");
    }



  }

  privacy_toggle() {
    this.setState({ privacy_popup_open: !this.state.privacy_popup_open });
  }

  toggleModal() {
    this.setState({
      modal: !this.state.modal
    });
  }

  toggleVerifyUserModal() {
    this.setState({
      verifyUserModal: !this.state.verifyUserModal
    });
  }


  sendVerificationCheck = async (number) => {
    var url = "http://awowebbrands.com/api/vonage/request";
    // console.log(url);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        number: number
      })
    });
    const resData = await response.json();
    // just log ‘json’
    nexomReqID = resData;
    console.log(resData);
    return resData;
  };

  verifyandUpdateView = () => {
    console.log("Verify id is: " + nexomReqID);
    //this.props.setNexomId(nexomReqID);
    var confirmed = this.confirmVerificationCode(this.state.clientProfile.pin, nexomReqID);
    console.log("returned confirmation of verification is: " + confirmed);
  }

  async confirmVerificationCode(code, req_id) {
    console.log("user req id: " + req_id);
    console.log("set top state req id is: " + nexomReqID);
    console.log("Entered PIN: " + code + " of type: " + typeof (code));

    var url = "http://awowebbrands.com/api/vonage/verify";

    let response = await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        request_id: req_id,
        pin: code
      })
    })
    let resData = await response.json();
    console.log(resData.result.status);
    console.log(typeof (resData.result.status));

    if (resData.result.status === "0") {
      console.log("PHP not sending object but successful verication");
      this.setConfirmationStatus();
    }
    else if (resData.result.status === "2") {
      console.log("PHP not sending object but successful verication");
      window.alert("Your request is incomplete and missing a mandatory parameter. If unsure, refresh page and try again.")
    }
    else if (resData.result.status === "5") {
      console.log("  Internal Error");
      window.alert("There was an Internal Error. Please Press Cancel and start over..");
    }
    else if (resData.result.status === "6") {
      console.log("The code provided does not match the expected value");
      window.alert("The request could not be handled. Please Press Cancel and start over..");
    }
    else if (resData.result.status === "9") {
      window.alert("Partner quota exceeded. Kindly Contact awowebbrands to report this problem");
    }
    else if (resData.result.status === "10") {
      console.log("Concurrent verifications to the same number are not allowed");
      window.alert("Concurrent verifications to the same number are not allowed");
    }
    else if (resData.result.status === "16") {
      console.log("The code provided does not match the expected value");
      window.alert("The code provided does not match the expected value. After 3 tries, you will have to cancel and start over.");
    }
    else if (resData.result.status === "17") {
      console.log("The wrong code was provided too many times");
      window.alert("The wrong code was provided too many times, Please click cancel and start over.");
    }
    else {
      console.log("Never comes in here! -TEST");
      console.log("Did not confirm verification code");
      // console.log(resData.error_text);
      window.alert(resData.result.error_text);
    }

    console.log("Lead phone verified: " + this.leadPhoneVerified);
    return this.leadPhoneVerified;
  }

  setConfirmationStatus = () => {
    console.log("Sets phone verified variable to true");
    this.leadPhoneVerified = true;
    let communicationPreference = this.getCommunicationPreference();
    service.hideChanger('showThirdPart');
    // ** Update from ref to state
    this.createWinRateCustomerEmail(firstName, lastName,
      this.state.clientProfile.phone, this.state.clientProfile.email, false,
      this.state.clientProfile.businessName, communicationPreference);
    this.toggleVerifyUserModal();
    console.log("Succes");
  };

  cancelVerificationAndCloseModal = () => {
    // cancel verification request
    this.cancelVerificationRequest();

    //close modal
    this.toggleVerifyUserModal();
  }

  cancelVerificationRequest() {
    console.log("nexom request id: " + nexomReqID);
    var url = "http://awowebbrands.com/api/vonage/cancel";

    fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        request_id: nexomReqID
      })
    })
      .then(response => { response.json() })
      .then(resData => {
        console.log("Checking succesful response to cancel verification request");
        console.log(resData);
        console.log(typeof (resData));

        // if(resData === 0){
        //   this.toggleVerifyUserModal();
        // }
        // else{
        //   window.alert("Can not cancel phone request within the first 30 seconds of pin request.");

        // }
      })
      .catch(function (e) {
        console.warn("Error: Caught a nexmo cancellation error!");
        // if(e === "Verification request ['" +
        //     nexomReqID +
        //     "'] can't be cancelled within the first 30 seconds."){
        //   console.log("Verifies failed cancel");
        //   window.alert("Phone verification can not be cancelled within the first 30 seconds");
        //   return;
        // }
        // else{console.log("Comes here and so passes cancel test");}
        console.log(e);
      })
  }

  onTypedInputsChangeHandler(e, more) {
    let client = this.state.clientProfile;
    client[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ clientProfile: client });
  }

  chooseOption1(value) {
    console.log("Comes in this function");
    // reset all borders to white
    document.getElementsByName("Phone").style = "border : 2px solid white";
    document.getElementsByName("Email").style = "border : 2px solid white";
    document.getElementsByName("PhoneOrEmail").style = "border : 2px solid white";
    //change selected radio border to green
    document.getElementsByName(value).style = "border : 2px solid green";

    // update hidden input selected value
    console.log(document.getElementsByName(value).style);
    document.getElementsByName("selected_choice").value = value;
    console.log(document.getElementsByName("selected_choice").value);
  }

  render() {

    return (
      <div className={`ForthPart ${service.data.showForthPart.hidden}`}>
        <div className="saveMoneyBox">
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <h1 className='text-white text-center mb-3'>To book a Consultation, fill this form and we will reach out to You!</h1>
              <div className="card border-0 rounded-0">
                <div className="card-body">
                  {/* <div className="text-center">
                    <p className='font-weight-bold light mb-2'></p>
                  </div> */}
                  <form>
                    <div className="row">
                      <div className="col-md-10 offset-md-1 col-lg-8 offset-lg-2">
                        <div className="form-group">
                          <input type="name" className="form-control userInput light full-width" placeholder='Full Name' onChange={(e) => this.onTypedInputsChangeHandler(e)} value={this.state.clientProfile.fullName} name="fullName" />
                        </div>
                        <div className="form-group">
                          <input type="name" className="form-control userInput light full-width" placeholder='Business or Preferred name (if other)' onChange={(e) => this.onTypedInputsChangeHandler(e)} value={this.state.clientProfile.businessName} name="businessName" />
                        </div>
                        <div className="form-group">
                          <input value={this.state.clientProfile.email} onChange={(e) => this.onTypedInputsChangeHandler(e)} type="email" className="form-control userInput light full-width" placeholder='Email*' name="email" onInvalid={() => { alert('Please enter a valid email address.') }} ref={this.emailRef} required />
                        </div>
                        <div className="form-group">
                          <input type="text" value={this.state.clientProfile.phone} name="phone" onChange={(e) => this.onTypedInputsChangeHandler(e)} className="form-control userInput light full-width" placeholder='Phone' />
                        </div>
                        <div>
                          <Modal isOpen={this.state.verifyUserModal} toggle={this.toggleVerifyUserModal} centered={true}>
                            <ModalHeader toggle={this.toggle}>Check your phone for a text message verification code</ModalHeader>
                            <ModalBody>
                              <input type="number" onChange={(e) => this.onTypedInputsChangeHandler(e)} name="pin" value={this.state.clientProfile.pin} className="form-control userInput light" id="pin" aria-describedby="pin" placeholder="Enter the code here.. " />
                            </ModalBody>
                            <ModalFooter>
                              <Button color="primary" onClick={() => { this.verifyandUpdateView(); }}>Verify</Button>
                              <Button color="secondary" onClick={() => { this.cancelVerificationAndCloseModal() }}>Cancel</Button>
                            </ModalFooter>
                          </Modal>
                        </div>

                        <div className="form-group">

                          <input className='btn btn-primary' style={{ width: "100%", border: "2px solid white" }} value="I prefer to be reached by phone" id="Phone" name="Phone" onClick={() => this.chooseOption1("Phone")} readOnly /> <br></br>
                          <input className='btn btn-primary' style={{ width: "100%", border: "2px solid white" }} value="I prefer to meet online (email/G-Meet)" id="Email" name="Email" onClick={() => this.chooseOption1("Email")} readOnly /><br></br>
                          <input className='btn btn-primary' style={{ width: "100%", border: "2px solid white" }} value="I prefer to be reached by phone or email" id="PhoneOrEmail" name="PhoneOrEmail" onClick={() => this.chooseOption1("PhoneOrEmail")} readOnly /><br></br>

                          {/* <button type="button" className='btn btn-primary' style={{width: "100%", border: "2px solid white"}}  id="Phone" name="Phone" onClick={()=>this.chooseOption1("Phone")} >I prefer to be reached by phone</button><br></br>
          <button type="button" className='btn btn-primary' style={{width: "100%", border: "2px solid white"}}  id="Email" name="Email" onClick={()=>this.chooseOption1("Email")}>I prefer to meet online (email/G-Meet)</button><br></br>
          <button type="button" className='btn btn-primary' style={{width: "100%", border: "2px solid white"}} id="PhoneOrEmail" name="PhoneOrEmail" onClick={()=>this.chooseOption1("PhoneOrEmail")}  >I prefer to be reached by phone or email</button><br></br> */}
                          {/* type="hidden" */}
                          <input className="form-control userInput light full-width" name="selected_choice" defaultValue="" hidden />
                        </div>

                        <div className='card bg-light mt-5 rounded-1'>
                          <div className="card-body">
                            <div className='styled-select'>
                              <h5 className="text-center">Let us know when to reach you</h5>
                              <div className="form-group mt-4">
                                <label>What days are you available?</label>
                                <br></br>
                                <div>
                                  <table style={{ margin: 'auto' }}>
                                    <tbody>
                                      <tr style={{ display: this.state.clientProfile.weekly_availability.monday_availability }} className="form-group mt-4">
                                        <td>
                                          Monday
                                        </td>
                                        <td style={{ width: '100%' }}>
                                          <input type="text" className="form-control" name="monday_times"
                                            // value={this.state.clientProfile.monday_times}
                                            placeholder="9am-12pm, After 5pm ..."
                                            onChange={(e) => this.onTypedInputsChangeHandler(e)} />
                                        </td>
                                      </tr>
                                      <tr style={{ display: this.state.clientProfile.weekly_availability.tuesday_availability }}>
                                        <td>
                                          Tuesday
                                        </td>
                                        <td style={{ width: '100%' }}>
                                          <input type="text" className="form-control" name="tuesday_times"
                                            // value={this.state.clientProfile.tueday_times}
                                            placeholder="9am-12pm, After 5pm ..."
                                            onChange={(e) => this.onTypedInputsChangeHandler(e)} />
                                        </td>
                                      </tr>
                                      <tr style={{ display: this.state.clientProfile.weekly_availability.wednesday_availability }}>
                                        <td>
                                          Wednesday
                                        </td>
                                        <td style={{ width: '100%' }}>
                                          <input type="text" className="form-control" name="wednesday_times"
                                            // value={this.state.clientProfile.wednesday_times}
                                            placeholder="9am-12pm, After 5pm ..."
                                            onChange={(e) => this.onTypedInputsChangeHandler(e)} />
                                        </td>
                                      </tr>
                                      <tr style={{ display: this.state.clientProfile.weekly_availability.thursday_availability }}>
                                        <td>
                                          Thursday
                                        </td>
                                        <td style={{ width: '100%' }}>
                                          <input type="text" className="form-control" name="thursday_times"
                                            // value={this.state.clientProfile.thursday_times}
                                            placeholder="9am-12pm, After 5pm ..."
                                            onChange={(e) => this.onTypedInputsChangeHandler(e)} />
                                        </td>
                                      </tr>
                                      <tr style={{ display: this.state.clientProfile.weekly_availability.friday_availability }}>
                                        <td>
                                          Friday
                                        </td>
                                        <td style={{ width: '100%' }}>
                                          <input type="text" className="form-control" name="friday_times"
                                            // value={this.state.clientProfile.friday_times}
                                            placeholder="9am-12pm, After 5pm ..."
                                            onChange={(e) => this.onTypedInputsChangeHandler(e)} />
                                        </td>
                                      </tr>
                                      <tr style={{ display: this.state.clientProfile.weekly_availability.saturday_availability }}>
                                        <td>
                                          Saturday
                                        </td>
                                        <td style={{ width: '100%' }}>
                                          <input type="text" className="form-control" name="saturday_times"
                                            // value={this.state.clientProfile.saturday_times}
                                            placeholder="9am-12pm, After 5pm ..."
                                            onChange={(e) => this.onTypedInputsChangeHandler(e)} />
                                        </td>
                                      </tr>
                                      <tr style={{ display: this.state.clientProfile.weekly_availability.sunday_availability }}>
                                        <td>
                                          Sunday
                                        </td>
                                        <td style={{ width: '100%' }}>
                                          <input type="text" className="form-control" name="sunday_times"
                                            // value={this.state.clientProfile.sunday_times}
                                            placeholder="9am-12pm, After 5pm ..."
                                            onChange={(e) => this.onTypedInputsChangeHandler(e)} />
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>

                                <table style={{ margin: 'auto' }}>
                                  <tbody>
                                    <tr >
                                      <td className="customer_weekday_table">Mon</td>
                                      <td className="customer_weekday_table">Tue</td>
                                      <td className="customer_weekday_table">Wed</td>
                                      <td className="customer_weekday_table">Thu</td>
                                      <td className="customer_weekday_table">Fri</td>
                                    </tr>
                                    <tr>
                                      <td><input type="checkbox" name="Monday" onClick={(e) => this.toggleWeekdayAvailability(e)} ></input></td>
                                      <td><input type="checkbox" name="Tuesday" onClick={(e) => this.toggleWeekdayAvailability(e)}></input></td>
                                      <td><input type="checkbox" name="Wednesday" onClick={(e) => this.toggleWeekdayAvailability(e)}></input></td>
                                      <td><input type="checkbox" name="Thursday" onClick={(e) => this.toggleWeekdayAvailability(e)}></input></td>
                                      <td><input type="checkbox" name="Friday" onClick={(e) => this.toggleWeekdayAvailability(e)}></input></td>
                                    </tr>
                                    <tr >
                                      <td className="customer_weekday_table">Sat</td>
                                      <td className="customer_weekday_table">Sun</td>
                                    </tr>
                                    <tr>
                                      <td><input type="checkbox" name="Saturday" onClick={(e) => this.toggleWeekdayAvailability(e)}></input></td>
                                      <td><input type="checkbox" name="Sunday" onClick={(e) => this.toggleWeekdayAvailability(e)}></input></td>
                                    </tr>
                                  </tbody>
                                </table>

                              </div>
                              <div className="form-group"> Additional Notes<br></br>
                                <textarea name="additionalNotes" id="additionalNotes" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <ReCaptcha
                          sitekey="6LcTsfgbAAAAAAHLr7hR3QwOwpq0tStoxMitnBpr"
                          action='login'
                          verifyCallback={this.verifyCallback}
                        />
                        <br></br>
                        <div className="form-group">
                          {/* <input className='btn btn-primary submitButton light' value="Submit" type='submit' onClick={this.submitHandler} /> */}
                          <button className='btn btn-primary submitButton' style={{ width: '100%', color: 'white' }} onClick={this.submitHandler} >Submit</button>
                        </div>
                        <p text-align="center">
                          We will not share your data.
                        </p>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ForthPart;