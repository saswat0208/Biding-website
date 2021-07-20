/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import WidgetContainer from './WidgetContainer';

let pastProducts = [];
let presentProducts = [];
let futureProducts = [];

export default function UpcomingAuction() {
  const user = useSelector((state) => state.user);
  const [isAuctionsFetched, setAuctionsFetched] = useState(false);
  console.log('user', user.userData);
  useEffect(() => {
    if (user.userData !== undefined) {
      pastProducts = [];
      presentProducts = [];
      futureProducts = [];
      axios.get(`http://localhost:8080/getproduct/${user.userData._id}`)
          .then((results) => {
            console.log(results.data);

            const today = new Date();
            const currentTime = today.getHours();
            console.log('today', today);

            results.data.map((item) => {
              const itemDateAndTime = item.date;
              const o = itemDateAndTime.toString();
              const p1 = o.indexOf('-');
              const y = o.substring(0, p1);
              const p2 = o.indexOf('-', p1 + 1);
              const m = o.substring(p1 + 1, p2);
              const p3 = o.indexOf('T');
              const d = o.substring(p2 + 1, p3);
              const itemDate = new Date(y, m - 1, d);
              console.log('other', itemDate);

              let time;

              if (item.timeslot === 1) {
                time = 10;
              } else if (item.timeslot === 2) {
                time = 16;
              } else if (item.timeslot === 3) {
                time = 20;
              } else {
                time = 2;
              }

              if (item.date > today) {
                futureProducts.push(item);
              } else if (item.date === today) {
                if (time > currentTime) {
                  presentProducts.push(item);
                } else {
                  pastProducts.push(item);
                }
              } else {
                pastProducts.push(item);
              }

              console.log('Past', pastProducts);
              console.log('Present', presentProducts);
              console.log('Future', futureProducts);
              setAuctionsFetched(true);
            });
          });
    }
  }, [user]);

  return (
    <div>
      {
        isAuctionsFetched == true &&

                <WidgetContainer section='Ongoing' array={presentProducts} />


      }
      {
        isAuctionsFetched == true &&


                <WidgetContainer section='Upcoming' array={futureProducts} />


      }
      {
        isAuctionsFetched === true &&
                <WidgetContainer section='Past' array={pastProducts}/>

      }

    </div>
  );
}
