import React from 'react';
import './styles/Auction.css';

const Auction = (props) => (
    <div className="panel panel-default auction-body">
        <div className="auction-body">
            <h2 key={props.idx}>{props.auction.vehicle.year + " " + props.auction.vehicle.color
                + " " + props.auction.vehicle.make + " " + props.auction.vehicle.model}</h2>
            <div key={props.idx}>{"Ending: " + props.auction.endDate}</div>
            <div key={props.idx}>{"Current Bid: " + props.auction.currentBid}</div>
            <div key={props.idx}>{"Buyout: " + props.auction.buyOut}</div>
        </div>
    </div>
);

export default Auction;