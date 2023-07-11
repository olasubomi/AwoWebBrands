import React from 'react';
import service from './dataService';

const DescribeSavingsAmount = (props) => {
    let system_type = props.system_type;

    switch (system_type) {
      case "Optimal":
        return <h1 className="bigBlue superBold">
          ${Number(service.data.chartData.Optimal.savingsAmount).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</h1>;
      case "Economy":
        return <h1 className="bigBlue superBold">
          ${Number(service.data.chartData.Economy.savingsAmount).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</h1>;
      case "Compact":
        return <h1 className="bigBlue superBold">
          ${Number(service.data.chartData.Compact.savingsAmount).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</h1>;
      case "Intermediate":
        return <h1 className="bigBlue superBold">
          ${Number(service.data.chartData.Intermediate.savingsAmount).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</h1>;
      case "Standard":
        return <h1 className="bigBlue superBold">
          ${Number(service.data.chartData.Standard.savingsAmount).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</h1>;
      case "Premium":
        return <h1 className="bigBlue superBold">
          ${Number(service.data.chartData.Premium.savingsAmount).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</h1>;
      case "Solar + Plug-In Vehicle":
        return <h1 className="bigBlue superBold">
          ${Number(service.data.chartData.Selected_EVPV.savingsAmount).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</h1>;
      case "Plug-In Vehicle":
        return <h1 className="bigBlue superBold">
          ${Number(service.data.chartData.EV_Rate_Charging.savingsAmount).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</h1>;
      default:
        return ;
    }
  };

  export default DescribeSavingsAmount;