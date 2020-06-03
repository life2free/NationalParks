import React, { Component } from "react";
import "./NationalPark.css";
import { Link } from "react-router-dom";
import Config from "../../Config";

const nationalParkURL = `https://developer.nps.gov/api/v1/parks?api_key=${
  Config.ApiKey
}`;

class NationalPark extends Component {
  componentDidMount() {
    const parkCode = this.props.match.params.parkCode;
    const url = `${nationalParkURL}&parkCode=${parkCode}`;

    fetch(url)
      .then(response => response.json())
      .then(response => {
        let nationalPark = response.data[0];
        this.props.setNationalPark(nationalPark);
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    let nationalPark = this.props.nationalPark;

    if (nationalPark === null) {
      return <div />;
    } else {
      let {
        name,
        description,
        images,
        addresses,
        directionsInfo
      } = this.props.nationalPark;

      let firstImage = images.shift();
      let imageListDiv = images.map((item, i) => {
        return (
          <img
            key={`img-${i}`}
            src={item.url}
            alt={item.altText}
            className="nationalpark-item-img"
          />
        );
      });
      return (
        <div className="nationalpark-container">
          <div
            className="nationalpark-first-img"
            style={{ backgroundImage: `url(${firstImage.url})` }}
          >
            <p className="nationalpark-name">{name}</p>
          </div>
          <div className="nationalpark-description-container">
            <p className="nationalpark-description">{description}</p>
          </div>
          <div className="nationalpark-address">
            <p className="nationalpark-address-title">Address</p>
            <p className="nationalpark-address-detail">
              {addresses[0].line1}
              <br />
              {addresses[0].city}
              ,&nbsp;
              {addresses[0].stateCode}
              ,&nbsp;
              {addresses[0].postalCode}
            </p>
          </div>
          <div className="nationalpark-directions">
            <p className="nationalpark-directions-title">Directions</p>
            <p className="nationalpark-directions-detail">{directionsInfo}</p>
          </div>
          <div className="nationalpark-readmore">
            <button className="nationalpark-readmore-button">Read More</button>
          </div>
          <p className="nationalpark-imgs-title">Images</p>
          <div className="nationalpark-imgs-container">{imageListDiv}</div>
          <div className="nationalpark-backtolist">
            <Link to="/" className="nationalpark-backtolist-link">
              Back to Park List
            </Link>
          </div>
        </div>
      );
    }
  }
}

export default NationalPark;
