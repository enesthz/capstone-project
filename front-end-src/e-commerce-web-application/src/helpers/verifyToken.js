import axios from 'axios';
export default async function verifyToken(token) {
  let response;
  if (token === null) {
    throw new Error('token is not found');
  }

  response = await axios.get('http://localhost:3002/auth/isValid', {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });

  return response.data.isTokenValid;
}
