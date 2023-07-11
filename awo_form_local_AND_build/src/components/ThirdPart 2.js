import React from 'react';
//import {  animateScroll as scroll } from 'react-scroll';

import service  from './dataService';


class ThirdPart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showThirdPart: {
        hidden: 'hidden'
      },
    };

    service.onValuesChanged(this.dataCenterDataChange.bind(this));
  }

  dataCenterDataChange(data) {
    this.setState({
      showThirdPart: data.showThirdPart
    });
  }

  imgHandler = (event) => {
    event.preventDefault();
    window.location.href = "https://www.awowebbrands.com";
  };

  render() {
      return (
        <div className={`ThirdPart ${service.data.showThirdPart.hidden}`}>
        <div className='App'>
          <div className='main3'>

            <div className='jumbotron text-center bg-white'>
              <h3 className="display-6">Thank you!</h3>
              <p className='lead'>Check for a confirmation email in your Inbox or SPAM folder</p>
              <div>For any questions, please call: (858) 305-9541. </div>
            </div>

            <div className='jumbotron text-center rounded-0 border-0'>
              <div className='row'>
                <div className="col-md-4 offset-md-4">
                  <img className="img-fluid" src="./assets/img/header/AWO_WB_Logo_250x61.png" alt="awowebbrands" onClick={this.imgHandler} />
                </div>
              </div>
              <p><a href="https://www.awowebbrands.com">www.awowebbrands.com</a></p>
              <h4 className="font-italic">"Awoke Technologies!"</h4>
              <p>
                <small className="text-muted">AWO has 100% 5-Star Reviews on
                  <a href="https://www.google.com/search?q=awo+web+brands&rlz=1C5CHFA_enNG781NG781&oq=awo+web+brands&aqs=chrome..69i57j69i64l3j69i61l2j69i60.462j0j1&sourceid=chrome&ie=UTF-8#lrd=0x80dbf975e03125e7:0xeeb4aeb4338b2397,1,,,"> Google Business!</a>
                </small>
              </p>
            </div>

          </div>
        </div>
        </div>
      );

  }
}

export default ThirdPart;