import React, { useEffect, useState } from 'react';
import numeral from 'numeral';
import './App.css';
import { getAveragePricePerSellerType, getDistributionByMake } from './api/statistics';
import { uploadCSVs } from './api/files';

function App() {
  const [averagePriceStats, setAveragePriceStats] = useState<AveragePricePerSellerType[]>([]);
  const [distByMakeStats, setdistByMakeStats] = useState<DistributionByMake[]>([]);
  const [listingsFile, setListingsFile] = useState<File | null>(null)
  const [contactsFile, setContactsFile] = useState<File | null>(null)

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

  const handleAddFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    const name = e.target.name
    if(files && name === 'listings'){
      setListingsFile(files[0])
    }
    if(files && name === 'contacts'){
      setContactsFile(files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let formData = new FormData();
    if(listingsFile){
      formData.append('listings', listingsFile);
    }

    if(contactsFile){
      formData.append('contacts', contactsFile);
    }

    const resp = await uploadCSVs(formData)

    if(resp.status === 200){
      alert('upload successful.')
      fetchData();
    } else {
      alert('upload failed.')
    }
  }

  return (
    <div className="App">
      <h1>Average Price per Seller Type</h1>
      <table>
        <thead>
          <tr>
            <th>Seller Type</th>
            <th>Average Price</th>
          </tr>
        </thead>
        <tbody>
          {averagePriceStats.map(stat => (
            <tr key={stat.seller_type}>
              <td>{stat.seller_type}</td>
              <td>{`€ ${numeral(stat.average_price).format('00,00')}`}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h1>Distribution By Make</h1>
      <table>
        <thead>
          <tr>
            <th>Car Make</th>
            <th>Distribution</th>
          </tr>
        </thead>
        <tbody>
          {distByMakeStats.map(stat => (
            <tr key={stat.make}>
              <td>{stat.make}</td>
              <td>{`${numeral(stat.distribution*100).format('0')}%`}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <form encType="multipart/form-data" action="" onSubmit={handleSubmit}>
        <h2>Upload CSVs</h2>
        <p>*both files must be uploaded.</p>
        <div>
          <label>Upload new Listings: </label>
          <input type="file" id="listings" name="listings" accept="text/csv" onChange={handleAddFile}/>
        </div>
        <div>
          <label>Upload new Contacts: </label>
          <input type="file" id="contacts" name="contacts" accept="text/csv" onChange={handleAddFile}/>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
