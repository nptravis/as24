import React, { useEffect, useState } from 'react';
import numeral from 'numeral';
import './App.css';
import { getAveragePricePerSellerType, getDistributionByMake } from './api/statistics';

function App() {

  const [averagePriceStats, setAveragePriceStats] = useState<AveragePricePerSellerType[]>([]);
  const [distByMakeStats, setdistByMakeStats] = useState<DistributionByMake[]>([]);

  useEffect(() => {
    fetchData();
  },[])

  const fetchData = async () => {
    const responses = await Promise.all([
      getAveragePricePerSellerType(),
      getDistributionByMake()
    ])

    const avgResp = responses[0];
    const distResp = responses[1];

    if(avgResp.status === 200){
      setAveragePriceStats(avgResp.data.content)
    }

    if(avgResp.status === 200){
      setdistByMakeStats(distResp.data.content)
    }
  }

  return (
    <div className="App">
      <h1>Average Price per Seller Type</h1>
      <table>
        <thead>
          <th>Seller Type</th>
          <th>Average Price</th>
        </thead>
        <tbody>
          {averagePriceStats.map(stat => (
            <tr>
              <td>{stat.seller_type}</td>
              <td>{`€ ${numeral(stat.average_price).format('00,00')}`}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h1>Distribution By Make</h1>
      <table>
        <thead>
          <th>Car Make</th>
          <th>Distribution</th>
        </thead>
        <tbody>
          {distByMakeStats.map(stat => (
            <tr>
              <td>{stat.make}</td>
              <td>{`${numeral(stat.distribution*100).format('0')}%`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
