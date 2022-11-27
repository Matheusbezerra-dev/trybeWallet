import styled from 'styled-components';

export const ContainerLogin = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 10px;
  width: 525px;
  height: 356px;
  background-color: rgb(255 255 255);
  margin-top: 150px;
  div {
    width: 335px;
  };
  div input {
    margin-top: 10px;
    width: 330px;
    height: 40px;
    color: rgba(0, 59, 229, 1);
    border-radius: 5px;
    border: 1px solid rgba(0, 59, 229, 1)
  };
  div input::placeholder {
    padding: 10px;
    color: rgba(0, 59, 229, 1);
  };
  div button {
    margin-top: 10px;
    width: 330px;
    height: 40px;
    border-radius: 5px;
    background: rgba(0, 59, 229, 1);
    color: rgb(255 255 255);
  }
`;

export const ImgLogo = styled.img`
  width: 269px;
  height: 56px;
  margin-bottom: 33px;
`;
