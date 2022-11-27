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
    color: rgb(0 59 229);
    border-radius: 5px;
    border: 1px solid rgb(0 59 229)
  };
  div input::placeholder {
    padding: 10px;
    color: rgb(0 59 229);
  };
  div button {
    margin-top: 10px;
    width: 330px;
    height: 40px;
    border-radius: 5px;
    background: rgb(0 59 229);
    color: rgb(255 255 255);
  }
`;

export const ImgLogo = styled.img`
  width: 269px;
  height: 56px;
  margin-bottom: 33px;
`;

export const DivHeader = styled.header`
  width: 1038px;
  height: 482px;
  background: rgb(255 255 255);
  color: rgb(0 59 229);
  border-radius: 10px;
`;

export const DivContainerHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 820px;
  height: 180px;
`;

export const ImgLogoWallet = styled.img`
  width: 250px;
  height: 50px;
`;

export const DivContainerOpacity = styled.div`
  display: flex;
  justify-content: center;
  width: 1038px;
  height: 134px;
  background-color: rgba(225, 229, 235, 49%);
`;

export const DivConatainerInput = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  width: 820px;
  height: 134px;
  font-family: Epilogue;
  font-size: 14px;
  font-weight: 700;
  label input {
    margin-left: 5px;
  };
`;

export const InputDescription = styled.input`
  width: 289px;
  height: 30px;
  border-radius: 5px;
  margin-left: 8px;
  margin-right: 40px;
  border: 1px solid rgb(0 59 229);
`;

export const SelectTag = styled.select`
  width: 155px;
  height:25px;
  margin-left: 8px;
  color: rgb(0 59 229);
  border: 1px solid rgb(0 59 229);
  border-radius: 5px;
`;

export const InputValue = styled.input`
  width: 158px;
  height: 30px;
  border-radius: 5px;
  margin-left: 8px;
  margin-right: 25px;
  color: rgb(0 59 229);
  border: 1px solid rgb(0 59 229);
`;

export const InputMethod = styled.select`
  width: 228px;
  height: 30px;
  border-radius: 5px;
  margin-left: 8px;
  color: rgb(0 59 229);
  margin-right: 25px;
  border: 1px solid rgb(0, 59, 229);
`;

export const Selectcurrency = styled.select`
  width: 91px;
  height: 30px;
  border: 1px solid rgb(0, 59, 229);
  border-radius: 5px;
  margin-left: 8px;
  color: rgb(0 59 229);
`;

export const ContainerHeader = styled.div`
  display: flex;
  justify-content: center;
  width: 1038px;

`;
