import React from 'react';

import Glide from 'glidejs-react';
import '@glidejs/glide/dist/css/glide.core.css';
import '@glidejs/glide/dist/css/glide.theme.css';
import './index.css';

const imgStyle = {
    width: '100vw',
    height: '100vh',
    objectFit: 'cover',
    objectPosition: 'center'
};

const App = () => {
  return (
      <Glide
        arrows
        bullets
      >
          <img src="https://source.unsplash.com/user/erondu" alt="Random picture" style={imgStyle} />
          <img src="https://source.unsplash.com/user/corinnekutz" alt="Random picture" style={imgStyle} />
          <img src="https://source.unsplash.com/user/andrewtneel" alt="Random picture" style={imgStyle} />
      </Glide>
  )
}
export default App
