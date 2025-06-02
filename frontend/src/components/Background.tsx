import styled from 'styled-components';
import universoImg from '../img/frut.jpg'; 

const BackgroundWrapper = styled.div`
  position: fixed;
  inset: 0; // left:0; right:0; top:0; bottom:0;
  background-image: url(${universoImg});
  background-size: cover;
  background-position: center;
  filter: brightness(0.3);
  z-index: -1;
`;

const Background = () => <BackgroundWrapper />;

export default Background;