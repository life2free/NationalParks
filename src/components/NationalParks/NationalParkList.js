import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./NationalParkList.css";
import Config from "../../Config";

const limit = 12;

const nationalParkListURL = `https://developer.nps.gov/api/v1/parks?limit=${limit}&api_key=${
  Config.ApiKey
}`;

class NationalParkList extends Component {
  componentDidMount() {
    const url = `${nationalParkListURL}`;

    fetch(url)
      .then(response => response.json())
      .then(response => {
        let nationalParkList = response.data;
        this.props.setNationalParkList(nationalParkList);
      })
      .catch(err => {
        console.error(err);
      });
  }
  render() {
    let list = this.props.nationalParkList.map((item, i) => {
      return (
        <Link to={"/nationalpark/" + item.parkCode} key={`a-${i}`}>
          <div
            key={`div-${i}`}
            className="nationalparklist-item-img"
            style={{ backgroundImage: `url(${item.images[0].url})` }}
          >
            <p key={`p-${i}`} className="nationalparklist-item-name">
              {item.name}
            </p>
          </div>
        </Link>
      );
    });

    return <div className="nationalparklist">{list}</div>;
  }
}

export default NationalParkList;
