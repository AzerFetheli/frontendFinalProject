import React, { useEffect, useState } from 'react';
import BrendsTable from './BrendsTable';
import BrendsModal from './BrendsModal';
import "./BrendModal.css";
import { API } from '../../../../../axios';

export default function Brends() {
  const [brendsModal, setBrendsModal] = useState(false);
  const [brends, setBrends] = useState([]);

  const getBrends = () => {
    API.get("/dashboard/brands")
      .then((res) => {
        setBrends(res.data);
        console.log(res);
      }).catch((err) => {
        console.log(err)
      })
  };

  useEffect(() => {
    getBrends();
  }, []);

  const brendsModalHandle = () => {
    setBrendsModal(!brendsModal);
  };

  return (
    <>
      <button onClick={brendsModalHandle}>Create Brends</button>
      <BrendsModal brendsModalHandle={brendsModalHandle} brendsModal={brendsModal} getBrends={getBrends} />
      <BrendsTable data={brends.data} getBrends={getBrends} />
    </>
  );
}
