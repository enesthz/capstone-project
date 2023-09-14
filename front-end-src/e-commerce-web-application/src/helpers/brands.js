import axios from 'axios';

async function getShortcutBrands() {
  let brands;
  let response = await axios.get(`http://localhost:3001/brands`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });

  brands = response.data;
  brands = brands.filter((brand) => {
    if (
      brand.name === 'Sony' ||
      brand.name === 'Apple' ||
      brand.name === 'Samsung' ||
      brand.name === 'Xiaomi' ||
      brand.name === 'Philips' ||
      brand.name === 'Siemens'
    ) {
      return true;
    } else {
      return false;
    }
  });

  return brands;
}

export default getShortcutBrands;
