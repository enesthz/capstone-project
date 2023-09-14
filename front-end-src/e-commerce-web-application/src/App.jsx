import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import parseJwt from './helpers/parseJwt';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { updateUserId } from './redux/slices/userIdSlice';

export const GlobalStyle = createGlobalStyle`

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
`;

function App() {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  useEffect(function verifyToken() {
    if (localStorage.getItem('token') !== null) {
      axios
        .get('http://localhost:3002/auth/isValid', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        .then((response) => {
          if (response.data.isTokenValid === true) {
            let userId = parseJwt(localStorage.getItem('token')).id;
            console.log('deneme');
            dispatch(updateUserId(userId));
            navigate('/home');
          }
        })
        .catch((error) => {
          navigate('welcome');
        });
    } else {
      navigate('/welcome');
    }
  }, []);

  return (
    <div className='App'>
      Hello World!
      <br></br>
      <button>
        <Link to={'welcome'}>Login</Link>
      </button>
      <button>
        <Link to={'signUp'}>Sign Up</Link>
      </button>
      <button>
        <Link to={'product'}>product</Link>
      </button>
      <button>
        <Link to={'cart'}>cart</Link>
      </button>
    </div>
  );
}

export default App;
