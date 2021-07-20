/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import './searchcss.css';
import { useAlert } from 'react-alert';


let items = [];
let text;


export default function Search() {
  const alert = useAlert();
  // Related to search

  const [searchText, changeText] = useState('');
  const [toRedirect, setToRedirect] = useState(false);
  // const [items, receiveItems] = useState('');

  const onType = (e) => {
    // e.preventDefault();
    changeText(e.currentTarget.value);
  };

  const onSearch = (e) => {
    text = searchText;
    changeText('');
    e.preventDefault();
    axios.post('http://localhost:8080/getproduct/search', {
      'searchTerm': searchText,
    })
        .then((results) => {
          // receiveItems(results.data.products);
          items = results.data.products;
          if (items.length == 0) {
            alert.error(`Sorry !!! No Items Found for ${text}`);
          } else {
            setToRedirect(true);
          }
        });
  };
  return (
    <div>
      {
        toRedirect == true &&
        <Redirect to={{
          pathname: '/cards',
          state: {
            array: items,
            type: `Search Results For ${text}`,
          },
        }} />
      }
      <form className="form-inline mt-2">
        <input className="input mr-2" type="search" value={searchText}
          placeholder="Search" aria-label="Search" onChange={onType} />
        <button type="submit" className="button" onClick={onSearch}>
          <img src='/search.png' style={{ width: '40px', height: '40px' }} /></button>
      </form>
    </div>
  );
}
