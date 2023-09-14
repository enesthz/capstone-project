import React from 'react';
import { GlobalStyle } from '../App';
import Header from '../components/Header';
import { Footer } from '../components/Footer';
import styled from 'styled-components';
import Shortcut from '../components/Shortcut';
import Campaign from '../components/Campaign';
import TopSellers from '../components/TopSellers';
import PrivateRoute from './PrivateRoute';
import { useEffect } from 'react';
import { useState } from 'react';
import getShortcutBrands from '../helpers/brands';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';

function NonStyledHomePage({ className }) {
  const navigate = useNavigate();
  const [brands, setBrands] = useState(null);
  const [brandList, setBrandList] = useState(null);
  const campaignBrand = 'Philips';
  const campaignBrandId = useRef(null);

  useEffect(function () {
    async function getBrands() {
      try {
        let brands = await getShortcutBrands();
        setBrands(brands);
      } catch (error) {
        console.log(error);
        if (error.response.status === 401 || error.response.status === 403) {
          navigate('/welcome');
        }
      }
    }

    getBrands();
  }, []);

  useEffect(
    function generateBrandList() {
      if (brands === null) {
        return;
      } else {
        setBrandList(
          brands.map((brand, index) => {
            if (brand.name === campaignBrand) {
              campaignBrandId.current = brand._id;
            }

            return brand.name === 'Apple' ? (
              <Shortcut className={'apple'} brand={brand} key={index}></Shortcut>
            ) : (
              <Shortcut brand={brand} key={index}></Shortcut>
            );
          }),
        );
      }
    },
    [brands],
  );

  return (
    <PrivateRoute>
      <div className={className}>
        <GlobalStyle></GlobalStyle>
        <Header></Header>
        <div id='shortcutsContainer'>{brandList}</div>
        <div id='campaignContainer'>
          <Campaign campaignBrandId={campaignBrandId.current}></Campaign>
        </div>
        <p id='topSellersText'>Top Sellers</p>
        <div>
          <TopSellers></TopSellers>
        </div>
        <Footer></Footer>
      </div>
    </PrivateRoute>
  );
}

const HomePage = styled(NonStyledHomePage)`
  display: flex;
  flex-direction: column;
  gap: 23px;

  #topSellersText {
    font-family: 'Kodchasan';
    font-size: 25px;
    text-decoration: underline;
    font-weight: bold;
    color: #3f72af;
    text-transform: uppercase;
    margin-left: 50px;
  }

  #shortcutsContainer {
    display: flex;
    justify-content: space-between;
    padding: 25px 79px;
  }

  #campaignContainer {
    display: flex;
    justify-content: center;
  }

  .apple img {
    width: 50%;
  }
`;

export default HomePage;
