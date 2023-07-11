import React from 'react';
import service from './dataService';


class FifthPart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showFifthPart: {
        hidden: ''
      }
    };

    service.onValuesChanged(this.dataCenterDataChange.bind(this));
  } 

  dataCenterDataChange(data) {
    this.setState({
      showFifthPart: data.showFifthPart
    });
  }

  
  imgHandler = (event) => {
    event.preventDefault();
    //window.location.href = "#";
    window.open("#", '_blank');
  };

  render() {
    return (
      <div className={`FifthPart ${service.data.showFifthPart.hidden}`}>
      <div className='App'>
        <div className='main3 fifth-part'>
          <section className="blogThumbnails text-center">
            <div className="row no-gutters">
              <div className="col-6 col-sm-6 col-md-4 col-lg-2">
                <div className="thumbnail">
                  <a href="#" target="_blank" rel="noopener noreferrer" className="viewBlogContent">
                    <img src = "images/blog_thumbnails/How_the_Competition_Cuts_Corners.JPG" className="single_blog_thumbnail" alt="How_the_Competition_Cuts_Corners" />
                    <div className="caption">How the Competition Cuts Corners</div>
                  </a>
                </div>
              </div>
              <div className="col-6 col-sm-6 col-md-4 col-lg-2">
                <div className="thumbnail">
                  <a href="#" target="_blank" rel="noopener noreferrer" className="viewBlogContent">
                    <img src = "images/blog_thumbnails/VW_s Microbus_EV_Redemption.JPG" className="single_blog_thumbnail" alt="VW_s Microbus_EV Redemption.JPG" />
                    <div className="caption">VW's Microbus EV Redemption</div>
                  </a>
                </div>
              </div> 
              <div className="col-6 col-sm-6 col-md-4 col-lg-2">
                <div className="thumbnail">
                  <a href="#" target="_blank" rel="noopener noreferrer" className="viewBlogContent">
                    <img src = "images/blog_thumbnails/Dirty_Little_Secrets_of_the_Solar_Industry.jpg" className="single_blog_thumbnail" alt="Buyer's Rights for Energy Upgrades" />
                    <div className="caption">Dirty Little Secrets of the Solar Industry</div>
                  </a>
                </div>
              </div>
              <div className="col-6 col-sm-6 col-md-4 col-lg-2">
                <div className="thumbnail">
                  <a href="#" target="_blank" rel="noopener noreferrer" className="viewBlogContent">
                    <img src = "images/blog_thumbnails/Buyers_Rights_for_Energy_Upgrades.jpg" className="single_blog_thumbnail"  alt="Buyer's Rights for Energy Upgrades" />
                    <div className="caption">Buyer's Rights for Energy Upgrades</div>
                  </a>
                </div>
              </div>
              <div className="col-6 col-sm-6 col-md-4 col-lg-2">
                <div className="thumbnail">
                  <a href="#" target="_blank" rel="noopener noreferrer" className="viewBlogContent">
                    <img src = "images/blog_thumbnails/Quality_Installation_Lasts_a_Lifetime.jpg" className="single_blog_thumbnail" alt="Quality Installation Lasts a Lifetime" />
                    <div className="caption">Quality Installation Lasts a Lifetime</div>
                  </a>
                </div>
              </div> 
              <div className="col-6 col-sm-6 col-md-4 col-lg-2">
                <div className="thumbnail">
                  <a href="#" target="_blank" rel="noopener noreferrer" className="viewBlogContent">
                    <img src = "images/blog_thumbnails/Rivian_the_Spirit_of_an_Adventurer.jpg" className="single_blog_thumbnail" alt="Rivian, the Spirit of an Adventurer.jpg" />
                    <div className="caption">Rivian, the Spirit of an Adventurer</div>
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      </div>
    );
  }
}

export default FifthPart;

