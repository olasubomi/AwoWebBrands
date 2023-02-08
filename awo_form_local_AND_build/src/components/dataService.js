class dataService {
    constructor() {
        this.data = {
            showTooltip: {hidden: ''},
            showThirdPart: {hidden: 'hidden'},
            showForthPart: {hidden: ''},
            showFifthPart: {hidden: ''},
            lightboxIsOpen: false,
            visibleTooltip: true,
            myReferer : "Direct Access, No Referrer",
            clientProfile: {
                // test: false,
                weekly_availability:{
                    monday_availability : 'none',
                    tuesday_availability : 'none',
                    wednesday_availability : 'none',
                    thursday_availability : 'none',
                    friday_availability : 'none',
                    saturday_availability : 'none',
                    sunday_availability : 'none',
                  },
                  monday_times : '',
                  tuesday_times : '',
                  wednesday_times : '',
                  thursday_times : '',
                  friday_times : '',
                  saturday_times : '',
                  sunday_times : '',

                  businessName: '',

                monthlyBill: 525,
                monthlyBillkWh: 0,
                email: "",
                fullName: '',
                pin: '',
                phone: "",
                address: '',
                dailyTrip: '0',
                mpg: '0',
                carYear: "0",
                carMake: "make",
                carModel: "model",
                saveAmount: '',
                selectedSystem: {
                    selectsSystem: false,
                    system_type: "N/A",
                    system_to_display: "Optimal",
                    savingsAmount: '',
                    installFee: '',
                    monthly_loan_payment: '',
                    cashorloan: "N/A",
                    payback: 0,
                    loan_payback: 0
                },
                cost_per_watt : 0,
                num_of_modules : 0,
                module_watts : 380,
                system_size : 0,
                gross_cost : 0,
                fed_itc : 0.26,
                net_cost : 0,
                gross_cost_per_watt : 0,
                net_cost_per_watt : 0,
                loan_term_years : 12,
                net_energy_meter_fee : 132,
                marketing_commision : 0,
                system_base_cost : 0,
                apr : 0.0219, // bankrate.com 15 year home equity line of credit(loan)
                monthly_payments : 0
            },
        };

        this.subcribers = [];
    }

    onValuesChanged(fn) {
        this.subcribers.push(fn);
    }

    updateAll() {
        this.subcribers.forEach(item => item(this.data));
    }

    showHeader() {
        var querystring = window.location.search
        if( querystring === '?campaign=EC1&v=nh' || querystring === '?campaign=SC3&v=nh' ){
            return false;
        }
        return true;
    }

    billUpdater = (bill) => {
        let clientProfile = this.data.clientProfile;
        console.log("Monthly bill updated to:"+bill);
        clientProfile.monthlyBill = bill;
        this.data.clientProfile = clientProfile;
        this.updateAll();
      };

    paymentTypeUpdater = (paymentType) => {
        let clientProfile = this.data.clientProfile;
        clientProfile.selectedSystem.cashorloan = paymentType;
        this.data.clientProfile = clientProfile;
        this.updateAll();
      };

    updateAddress(address){
        let clientProfile = this.data.clientProfile;
        clientProfile.address = address;
        this.data.clientProfile = clientProfile;
        this.updateAll();
    }

    hideChanger = (input) => {
        console.log("Comes in Hide Changer func");
        console.log("input is:"+input);
        if (input === 'showThirdPart') {
            console.log("Resetting state");
            // this.data.showFirstPart.hidden= 'hidden';
            this.data.showTooltip.hidden= 'hidden';
            // this.data.showSecondPart.hidden='hidden';
            this.data.showThirdPart.hidden='hidden';
            this.data.showForthPart.hidden='hidden';
            // this.data.showFifthPart.hidden='';
            this.data[input].hidden='';
            document.body.classList.add('isThankYou');
            this.updateAll();
        }
        else {
            console.log("SHOULD NEVER COME HERE!!");
            this.data[input].hidden='hidden';
            this.updateAll();
        }
    };

    showAllParts(){
        this.data.showFirstPart.hidden =  '';
        this.data.showTooltip.hidden =  '';
        this.data.showSecondPart.hidden =  ''; // Second Page
        this.data.showThirdPart.hidden =  'hidden'; // Third page
        this.data.showForthPart.hidden =  'hidden';
        this.data.showFifthPart.hidden =  ''; // Blog Thumbnails

        this.updateAll();
}

    showForthPart = () => {
        console.log("Coming in here to update page display views");
        this.data.showFirstPart.hidden = 'hidden' ;
        this.data.showTooltip.hidden = 'hidden' ;
        this.data.showSecondPart.hidden = 'hidden';  // Second Page
        this.data.showThirdPart.hidden = 'hidden';  // Third page
        this.data.showForthPart.hidden = '';   // custom AWO Form
        this.data.showFifthPart.hidden = 'hidden';  // Blog Thumbnails
        this.data.visibleTooltip = false ; // Blog Thumbnails

        this.updateAll();
    }
    toggleLightBox() {
        this.data.lightboxIsOpen = false ; // !this.data.lightboxIsOpen;
        this.updateAll();
    }

    static getInstance() {
        if(this.instance) return this.instance;
        else {
            this.instance = new dataService();
            return this.instance;
        }
    }

    updateReferer(){
        if (document.referrer != null){
            console.log("Confirming refferer");
            this.data.myReferer = document.referrer;
        }
        else{
            this.data.myReferer = "Direct Access, No Referrer";
        }
        console.log(this.data.myReferer);
        this.updateAll();
    }
}

const instance = dataService.getInstance();

export default instance;
