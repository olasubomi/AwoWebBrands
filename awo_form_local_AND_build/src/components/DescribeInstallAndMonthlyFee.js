import React from 'react';
import service from './dataService';

const DescribeInstallAndMonthlyFee = (props) => {
    let system_type = props.system_type;

    switch (system_type) {
      case "Optimal":
        return <div>
          <p className="regular regular-fontSize" >We selected the optimal {(service.data.chartData.Optimal.system_type)} upgrade package for you!</p>
          <h1 className="bigBlue superBold"> ${Number(service.data.chartData.Optimal.installFee).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}
            <small> or</small>&nbsp;${Number(service.data.chartData.Optimal.monthly_loan_pmt).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}/mo.*</h1>
        </div>;
      case "Economy":
        return <div>
          <p className="regular regular-fontSize" >You selected the Economy upgrade package!</p>
          <h1 className="bigBlue superBold"> ${Number(service.data.chartData.Economy.installFee).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}
            <small> or</small>&nbsp;${Number(service.data.chartData.Economy.monthly_loan_pmt).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}/mo.*</h1>
        </div>;
      case "Compact":
        return <div>
          <p className="regular regular-fontSize" >You selected the Compact upgrade package!</p>
          <h1 className="bigBlue superBold"> ${Number(service.data.chartData.Compact.installFee).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}
            <small> or</small>&nbsp;${Number(service.data.chartData.Compact.monthly_loan_pmt).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}/mo.*</h1>
        </div>;
      case "Intermediate":
        return <div>
          <p className="regular regular-fontSize" >You selected the Intermediate upgrade package!</p>
          <h1 className="bigBlue superBold"> ${Number(service.data.chartData.Intermediate.installFee).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}
            <small> or</small>&nbsp;${Number(service.data.chartData.Intermediate.monthly_loan_pmt).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}/mo.*</h1>
        </div>;
      case "Standard":
        return <div>
          <p className="regular regular-fontSize" >You selected the Standard upgrade package!</p>
          <h1 className="bigBlue superBold"> ${Number(service.data.chartData.Standard.installFee).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}
            <small> or</small>&nbsp;${Number(service.data.chartData.Standard.monthly_loan_pmt).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}/mo.*</h1>
        </div>;
      case "Premium":
        return <div>
          <p className="regular regular-fontSize" >You selected the Premium upgrade package!</p>
          <h1 className="bigBlue superBold"> ${Number(service.data.chartData.Premium.installFee).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}
            <small> or</small>&nbsp;${Number(service.data.chartData.Premium.monthly_loan_pmt).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}/mo.*</h1>
        </div>;
      case "Solar + Plug-In Vehicle":
        return <div>
          <p className="regular regular-fontSize" >You selected the Solar + Plug-In Vehicle upgrade package!</p>
          <h1 className="bigBlue superBold"> ${Number(service.data.chartData.Selected_EVPV.installFee).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}
            <small> or</small>&nbsp;${Number(service.data.chartData.Selected_EVPV.monthly_loan_pmt).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}/mo.*</h1>
        </div>;
      case "Plug-In Vehicle":
        return <div>
          <p className="regular regular-fontSize" >You selected the Plug-In Vehicle upgrade package!</p>
          <h1 className="bigBlue superBold"> ${Number(service.data.chartData.EV_Rate_Charging.installFee).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}
            <small> or</small>&nbsp;${Number(service.data.chartData.EV_Rate_Charging.monthly_loan_pmt).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}/mo.*</h1>
        </div>;
      default:
        break;
    }
  };

  export default DescribeInstallAndMonthlyFee;