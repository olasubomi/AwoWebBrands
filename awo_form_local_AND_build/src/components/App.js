import React from 'react';
import Header from './Header';
import ThirdPart from './ThirdPart';
import ForthPart from './ForthPart';
import FooterComponent from './FooterComponent';
import { loadReCaptcha } from 'react-recaptcha-v3'

import service from './dataService';



class App extends React.Component {
    constructor(props) {
        super(props);

        let campaign_type = "";
        var view_type = "";
        let campaign = {
            name: "",
            BackgroundImage: "",
            OverlayText: "",
            Video: ""
        };


        if (window.location.href.indexOf("campaign") > -1) {
            campaign_type = this.getUrlVars()["campaign"];
        }        
        if(window.location.href.indexOf("view") > -1){
            view_type = this.getUrlVars()["view"];
        }
        
        console.log("Title is: " + document.getElementsByTagName('title')[0].innerHTML);
        var allMetaElements = document.getElementsByTagName('meta');
        var metaIndex = 0;
        //loop through and find the element you want
        for (var i=0; i<allMetaElements.length; i++) { 
          if (allMetaElements[i].getAttribute("name") === "description") { 
              metaIndex = i;
             //no need to continue loop after making changes.
             break;
          } 
        }

        console.log("Title is: " + document.getElementsByTagName('title')[0].innerHTML);

        if(view_type === "RequestQuote"){
            service.showForthPart();
        }
        this.state = {
            campaign,
            userId: 0,
            resolution: window.innerWidth
        };

        service.onValuesChanged(this.dataCenterDataChange.bind(this));
    }

    componentDidMount(){
        // loadReCaptcha("6LcTsfgbAAAAAAHLr7hR3QwOwpq0tStoxMitnBpr");

        if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() {
              navigator.serviceWorker.register('/service-worker.js');
            });
          }
          service.updateReferer();
    }

    dataCenterDataChange(data) {
        console.log("APP component rerenders");
        // console.log("APP component rerenders", data);
      }

    getUrlVars() {
        var vars = {};
        window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
            vars[key] = value;
        });

        return vars;
    }

    render() {
        // var StyleWidth = service.showHeader ? {maxWidth: "100%"} : {};
        return (
            <div className="container">
                <div className="bg-white">
                    <Header video={this.state.campaign.Video}/>
                    <ThirdPart />
                    <ForthPart />
                    <FooterComponent />
                </div>
            </div>
        );
    }
}

export default App;