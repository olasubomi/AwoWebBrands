import React from 'react';
import service from './dataService';

const min_slider_value = 50;
const max_slider_value = 2000;
const slider_increment_step = 25;


class FirstPart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            popoverOpen1: false,
            popoverOpen2: false,
            popoverOpen3: false,
            modal: false,
            lightboxDisplayed: false,
            showFirstPart: {
                hidden: ''
            },
            showTooltip: {
                hidden: ''
            },
            clientProfile: { ...service.data.clientProfile },
            chartData: { ...service.data.chartData }
        };

        this.toggleModal = this.toggleModal.bind(this);
        service.onValuesChanged(this.dataCenterDataChange.bind(this));

    }

    dataCenterDataChange(data) {
        this.setState({
            lightboxIsOpen: { ...data.lightboxIsOpen },
            clientProfile: { ...data.clientProfile },
            chartData: { ...data.chartData },
            showFirstPart: data.showFirstPart
        });
    }

    getChartData(monthlyBill) {
        service.resetOptimalSystem()
        var bill_input = Number(monthlyBill);
        var annual_bill = bill_input * 12;
        var bucket = 500;
        if (annual_bill < 1000)
            bucket = 500;
        else
            bucket = Math.floor(annual_bill / 1000) * 1000;

        this.setChartSeriesData(bucket);
    };

    setChartSeriesData(bucket, chartData) {
        var url = "../api2/chartdata.php/?input_bill=" + bucket;
        fetch(url).then((response) => {
            return response.text()
        }).then((response_in_text) => {
            return JSON.parse(response_in_text)
        }).then((data) => {
            console.log("Returned data from php: " + data);
            var chartDataTmp = { ...this.state.chartData };

            var row;
            for (row = 0; row < 8; row++) {
                var series = {
                    system_type: "",
                    bucket: bucket,
                    data: [],
                    loanData: [],
                    vehicleData: [],
                    payback: 0,
                    loan_payback: 0,
                    savingsAmount: 0,
                    installFee: 0,
                    monthly_loan_pmt: 0,
                    system_cost: 0
                };

                series.system_type = data['rows'][row]['system_type'];
                console.log("System type: " + series.system_type);

                // add all cash,loan and vehicle data to series
                var j;
                // console.log(data);
                for (j = 0; j <= 29; j++) {
                    var indexed_loan_yr = 'ccfloanyr' + j;
                    // var indexed_vehicle_fuel_yr = 'avg_vehiclefuel_yr'+j;


                    //console.log(data['rows'][row][indexed_loan_yr]);
                    var arraylength = series.loanData.push(data['rows'][row][indexed_loan_yr]);
                    //console.log(arraylength);
                    if (arraylength <= 26) {
                        var indexed_cash_flow_yr = 'avg_cumulative_cash_flow_yr' + j;
                        //console.log(indexed_cash_flow_yr);
                        //console.log(data['rows'][row][indexed_cash_flow_yr]);
                        series.data.push(data['rows'][row][indexed_cash_flow_yr])
                    }

                    // console.log(data['rows'][row][indexed_vehicle_fuel_yr]);
                    // series.vehicleData.push(data['rows'][row][indexed_vehicle_fuel_yr])
                }


                // get loanpayback for current system type
                var loanYear;
                for (loanYear in series.loanData) {
                    //console.log(series.loanData[loanYear]+" and "+ loanYear);
                    if (series.loanData[loanYear] > 0 && loanYear > 0) {
                        // console.log("Sets loan year to: "+loanYear);
                        // console.log(typeof(loanYear));
                        var prevYearLoanValue = series.loanData[loanYear - 1];
                        var breakEvenYearLoanValue = series.loanData[loanYear];
                        var decimal = (prevYearLoanValue / (prevYearLoanValue + breakEvenYearLoanValue));
                        console.log("Decimal is: " + decimal);
                        console.log(typeof (decimal));
                        var loanplusdecimal = Number(loanYear) + decimal
                        console.log("Payback is " + loanYear + " + " + decimal + " = " + loanplusdecimal);
                        series.loan_payback = Number(loanYear) + decimal;
                        //break at the first true expression in if.
                        break;
                    }
                }

                //series.loanData = series.loanData.slice(0,15);

                // get data for display on Second Part
                series.system_cost = Number(data['rows'][row]['avg_cumulative_cash_flow_yr0']);
                series.payback = Number(data['rows'][row]['avg_payback']);

                series.savingsAmount = Number(data['rows'][row]['you_save_100re']);
                series.installFee = -Number(data['rows'][row]['avg_system_cost_yr0']) - Number(data['rows'][row]['avg_incentive_yr1']);
                series.monthly_loan_pmt = Number(data['rows'][row]['monthly_loan_payment']);

                switch (series.system_type) {
                    case "Baseline":
                        chartDataTmp.Baseline.data = series.data.map(element => Number(element));
                        //console.log(chartDataTmp.Baseline.data);
                        chartDataTmp.Baseline.loanData = series.loanData.map(element => Number(element));
                        chartDataTmp.Baseline.payback = series.payback;
                        break;
                    case "Economy":
                        chartDataTmp.Economy.data = series.data.map(element => Number(element));
                        //console.log(chartDataTmp.Economy.data);
                        chartDataTmp.Economy.loanData = series.loanData.map(element => Number(element));
                        chartDataTmp.Economy.loan_payback = series.loan_payback;
                        //console.log("Economy Loan payback is :"+series.loan_payback);
                        chartDataTmp.Economy.payback = series.payback;
                        chartDataTmp.Economy.savingsAmount = series.savingsAmount;
                        chartDataTmp.Economy.installFee = series.installFee;
                        chartDataTmp.Economy.monthly_loan_pmt = series.monthly_loan_pmt;
                        this.checkOptimalDisplayValues(series, chartDataTmp);
                        break;
                    case "Compact":
                        chartDataTmp.Compact.data = series.data.map(element => Number(element));
                        //console.log(chartDataTmp.Compact.data);
                        chartDataTmp.Compact.loanData = series.loanData.map(element => Number(element));
                        chartDataTmp.Compact.loan_payback = series.loan_payback;
                        chartDataTmp.Compact.payback = series.payback;
                        chartDataTmp.Compact.savingsAmount = series.savingsAmount;
                        chartDataTmp.Compact.installFee = series.installFee;
                        chartDataTmp.Compact.monthly_loan_pmt = series.monthly_loan_pmt;
                        this.checkOptimalDisplayValues(series, chartDataTmp);
                        break;
                    case "Intermediate":
                        chartDataTmp.Intermediate.data = series.data.map(element => Number(element));
                        //console.log(chartDataTmp.Intermediate.data);
                        chartDataTmp.Intermediate.loanData = series.loanData.map(element => Number(element));
                        chartDataTmp.Intermediate.loan_payback = series.loan_payback;
                        chartDataTmp.Intermediate.payback = series.payback;
                        chartDataTmp.Intermediate.savingsAmount = series.savingsAmount;
                        chartDataTmp.Intermediate.installFee = series.installFee;
                        chartDataTmp.Intermediate.monthly_loan_pmt = series.monthly_loan_pmt;
                        this.checkOptimalDisplayValues(series, chartDataTmp);
                        break;
                    case "Standard":
                        chartDataTmp.Standard.data = series.data.map(element => Number(element));
                        //console.log(chartDataTmp.Standard.data);
                        // console.log("prints standard rate:");
                        // console.log(chartDataTmp.Standard.data);
                        chartDataTmp.Standard.loanData = series.loanData.map(element => Number(element));
                        chartDataTmp.Standard.loan_payback = series.loan_payback;
                        chartDataTmp.Standard.payback = series.payback;
                        chartDataTmp.Standard.savingsAmount = series.savingsAmount;
                        chartDataTmp.Standard.installFee = series.installFee;
                        chartDataTmp.Standard.monthly_loan_pmt = series.monthly_loan_pmt;
                        this.checkOptimalDisplayValues(series, chartDataTmp);
                        break;
                    case "Premium":
                        chartDataTmp.Premium.data = series.data.map(element => Number(element));
                        //console.log(chartDataTmp.Premium.data);
                        chartDataTmp.Premium.loanData = series.loanData.map(element => Number(element));
                        chartDataTmp.Premium.loan_payback = series.loan_payback;
                        chartDataTmp.Premium.payback = series.payback;
                        chartDataTmp.Premium.savingsAmount = series.savingsAmount;
                        chartDataTmp.Premium.installFee = series.installFee;
                        chartDataTmp.Premium.monthly_loan_pmt = series.monthly_loan_pmt;
                        this.checkOptimalDisplayValues(series, chartDataTmp);
                        break;
                    case "Selected EVPV":
                        chartDataTmp.Selected_EVPV.data = series.data.map(element => Number(element));
                        chartDataTmp.Selected_EVPV.loanData = series.loanData.map(element => Number(element));
                        chartDataTmp.Selected_EVPV.loan_payback = series.loan_payback;
                        chartDataTmp.Selected_EVPV.payback = series.payback;
                        chartDataTmp.Selected_EVPV.savingsAmount = series.savingsAmount;
                        chartDataTmp.Selected_EVPV.installFee = series.installFee;
                        chartDataTmp.Selected_EVPV.monthly_loan_pmt = series.monthly_loan_pmt;
                        this.checkOptimalDisplayValues(series, chartDataTmp);
                        break;
                    case "EV Rate Charging":
                        chartDataTmp.EV_Rate_Charging.data = series.data.map(element => Number(element));
                        chartDataTmp.EV_Rate_Charging.loanData = series.loanData.map(element => Number(element));
                        chartDataTmp.EV_Rate_Charging.loan_payback = series.loan_payback;
                        chartDataTmp.EV_Rate_Charging.payback = series.payback;
                        chartDataTmp.EV_Rate_Charging.savingsAmount = series.savingsAmount;
                        chartDataTmp.EV_Rate_Charging.installFee = series.installFee;
                        chartDataTmp.EV_Rate_Charging.monthly_loan_pmt = series.monthly_loan_pmt;
                        this.checkOptimalDisplayValues(series, chartDataTmp);
                        break;
                    default:
                        break;
                }
            }
            // set optimum data to be displayed
            // display all system type packages 
            // console.log(chartDataTmp);
            //this.setChartData(chartDataTmp);
            service.updateChartData(chartDataTmp);
        })
            .catch(function (e) {
                console.warn("Error: Caught a network/db connection error!");
                console.log(e);
            })

        //return series.payback;
    };

    checkOptimalDisplayValues(series, chartDataTmp) {
        if (series.payback < service.data.chartData.Optimal.payback ||
            (series.payback === service.data.chartData.Optimal.payback &&
                series.system_cost < service.data.chartData.Optimal.system_cost)) {
            this.setOptimalDisplayValues(series, chartDataTmp);
            //console.log("Answer is true, replacing..")
        }
        else {
            console.log("Answer is false, not replacing..")
        }

    };

    setOptimalDisplayValues(series, chartDataTmp) {
        var clientProfile = { ...this.state.clientProfile };

        // update description based on system type
        if (series.system_type === "Selected EVPV") {
            chartDataTmp.Optimal.system_type = "Solar+Plug-In Vehicle";
        }
        else if (series.system_type === "EV Rate Charging") {
            chartDataTmp.Optimal.system_type = "Plug-In Vehicle";
        }
        else {
            chartDataTmp.Optimal.system_type = series.system_type;
        }

        chartDataTmp.Optimal.system_cost = series.system_cost;
        chartDataTmp.Optimal.payback = series.payback;
        chartDataTmp.Optimal.loan_payback = series.loan_payback;
        if (series.payback >= 4) {
            console.log("Sets optimal system type to loan . paybacks are" + series.payback + " : " + series.loan_payback);
            chartDataTmp.Optimal.cashorloan = "Loan";
            this.setOptimalPaymentType("Loan");
        }
        else {
            chartDataTmp.Optimal.cashorloan = "Cash";
            console.log("Sets optimal system type to cash . paybacks are" + series.payback + " : " + series.loan_payback);
            this.setOptimalPaymentType("Cash");
        }

        chartDataTmp.Optimal.savingsAmount = series.savingsAmount;
        chartDataTmp.Optimal.installFee = series.installFee;
        chartDataTmp.Optimal.monthly_loan_pmt = series.monthly_loan_pmt;
        this.setChartData(chartDataTmp);
        // setting default client selection
        clientProfile.selectedSystem.savingsAmount = series.savingsAmount;
        clientProfile.selectedSystem.installFee = series.installFee;
        clientProfile.selectedSystem.payback = series.payback;
        clientProfile.selectedSystem.loan_payback = series.loan_payback;
        clientProfile.selectedSystem.system_type = "N/A";
        clientProfile.selectedSystem.paymentType = "N/A";
        clientProfile.selectedSystem.monthly_loan_payment = series.monthly_loan_pmt;
        clientProfile.selectedSystem.selectsSystem = false;
        this.setState({ clientProfile });
    };

    setOptimalPaymentType = (cashorloan) => {
        var chartDataTmp = { ...this.state.chartData };
        chartDataTmp.Optimal.cashorloan = cashorloan;
        this.setChartData(chartDataTmp);
    }

    setChartData = (data) => {
        this.setState({ chartData: data });
    };

    toggleModal() {
        this.setState({
            modal: !this.state.modal
        });
    }

    getSliderValue = () => {
        var sliderHolder = document.getElementById("sliderHandle").innerText;
        // console.log("slider holder is: "+sliderHolder);
        var sliderValue = Number(sliderHolder.replace(/[^\d]/g, ""));
        console.log("slider value is: " + sliderValue);

        return sliderValue;
        //return this.props.monthlyBill;
    };

    handleSliderChange = (monthlyBill) => {
        this.getChartData(monthlyBill);
        //this.props.getChartData(monthlyBill);
        service.selectedSystemUpdater("Optimal");

        service.billUpdater(monthlyBill);
        this.determineLightBoxPopup();
        //this.props.showAllParts();
        service.showAllParts();
    }

    determineLightBoxPopup = () => {
        // console.log("Actually comes in here ");
        if (!this.state.lightboxDisplayed) {
            service.toggleLightBox();
        }
        this.setState({ lightboxDisplayed: true })
    }

    render() {
        return (
            <div className={`FirstPart ${service.data.showFirstPart.hidden}`}>
                <div className="App">
                    <div className="wrapper">
                        <div className="header ev" style={{ backgroundImage: this.props.campaign.BackgroundImage }}>
                            <div className="container">
                                <div className="header-container">
                                    <div className="outer">
                                        <div className="inner text-center mcText mt-2">
                                            <h1 className="mctUpper semiBold">{this.props.campaign.OverlayText}</h1>
                                            <h2 className="mctLower semiBold">See how much you can save.</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <section className="slider-section">
                            <div className="row">
                                <div className='col-md-8 offset-md-2 col-sm-8 offset-sm-2 col-xs-10 offset-xs-1'>
                                    <div className="mcSlider">
                                        <p className='text-center regular sliderText responsive-sliderText'>What's your monthly electric bill?</p>
                                        <div className='slider'>

                                        </div>
                                        <div className="bottomInputs">
                                            <div className="row">
                                                <div className="col-md-6 offset-md-3">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>);
    }
}

export default FirstPart;