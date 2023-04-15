import React from 'react';
import './styles/Auction.css';

const Auction = (props) => (
    <div className="panel panel-default auction-body">
        <div className="panel-body">
            <h2 key={props.idx}>Header that needs data at some point props.auction.data??</h2>
            <div key={props.idx}>Div that needs data?</div>
        </div>
    </div>
);

export default Auction;