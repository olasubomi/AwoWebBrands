import React from 'react';
import {  Modal, ModalBody} from 'reactstrap';
import service from './dataService';



class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                modal: false
            };
    
        this.toggleModal = this.toggleModal.bind(this);
      }

      toggleModal() {
        this.setState({
          modal: !this.state.modal
        });
      }

    render() {
        
        // var StyleWidth = service.showHeader ? {maxWidth: "100%"} : {};
        var StyleText = { textAlign: "right" };
        if (!service.showHeader()) {
            StyleText = {
                textAlign: "center"
            };
        }

        return (
            <header className="mHeader my-2">
                
                <div className="text-center" style={StyleText}>
                    {/* <Button className="p-0 btn-fea__video" color="link" onClick={this.toggleModal}>"Awoke Technologies"TM <img src="./images/play-button-24.png" alt="play button" /></Button> */}
                    <Modal
                        isOpen={this.state.modal}
                        modalTransition={{ timeout: 700 }}
                        backdropTransition={{ timeout: 1300 }}
                        toggle={this.toggleModal}
                        className={this.props.className}   
                        size="lg">
                        <ModalBody className="p-0">
                            <div className="embed-responsive embed-responsive-16by9">
                                <iframe className="embed-responsive-item" title="awowebbrands_ea_video" 
                                        src={this.props.video} allowFullScreen></iframe>
                            </div>
                        </ModalBody>
                    </Modal>
                </div>
                    
            </header>
        );
    }
}

export default Header;