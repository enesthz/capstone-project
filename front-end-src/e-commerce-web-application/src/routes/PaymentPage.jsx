import React, { useState } from 'react';
import styled from 'styled-components';
import {
  PaymentCard,
  SuccessButton,
  UnsuccessButton,
  CardFig,
  CardLogo,
} from '../components/assets/icons';

function NonStyledPaymentPage({ className }) {
  const [isOpen, setisOpen] = useState(false);
  const [isButton, setisOpenButton] = useState(false);
  const [isButtonOpen, setisButtonOpen] = useState(false);

  const handlClickButtonOpen = () => {
    setisOpen(!isOpen);
  };

  const handleeClickButtonOpen = () => {
    setisOpenButton(!isButton);
  };

  const handleClickButton = () => {
    setisButtonOpen(!isButtonOpen);
  };

  const Container = styled.div`
    width: 1140;
    height: 425;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    gap: 20px;
    box-shadow: 100% #cfcfcf;
  `;

  const Text = styled.p`
    font-family: Kodchasan;
    font-weight: 18px;
  `;
  const SlashIcon = styled.div`
    color: var(--black, #000);
    text-align: center;
    font-family: Rubik;
    font-size: 36px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  `;
  const LeftSide = styled.div`
    width: 700px;
    height: 360px;
    float: left;
    display: flex;
    flex-direction: column;
  `;

  const Button = styled.button`
    background-color: #1bb66e;
    width: 100%;
    height: 50px;
    border-radius: 8px;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  const TextButton = styled.div`
    font-family: Kodchasan;
    font-weight: 50px;
    color: white;
  `;

  const LeftFirstBox = styled.div`
    width: 700px;
    float: left;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    box-shadow: 0px 24px 48px 0 rgba(0, 0, 0, 0.16);
  `;

  const LeftSecondBox = styled.div`
    width: 700px;
    margin-top: 20px;
    float: left;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    box-shadow: 0px 24px 48px 0 rgba(0, 0, 0, 0.16);
  `;

  const LeftFirstLine = styled.div`
    display: flex;
    padding: 16px 0 0 16px;
    justify-content: flex-start;
    width: 700px;
  `;

  const CollapsButton = styled.div`
    background-color: ${(props) => (!props.isOpen ? 'white' : 'rgba(27, 182, 110, 0.10)')};
    border-radius: 12px;
    gap: 20px;
  `;

  const SecondDiv = styled.div`
    background-color: rgba(27, 182, 110, 0.1);
  `;

  const RightButtonDiv = styled.div`
    margin-top: 24px;
  `;

  return (
    <div className={className}>
      <Container>
        <LeftSide>
          <LeftFirstBox>
            <LeftFirstLine>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  padding: '16px 16px 16px 16px',
                  alignItems: 'center',
                }}>
                <PaymentCard />
                <Text>Registered Card</Text>
              </div>
            </LeftFirstLine>
            <hr style={{ width: '100%', height: '0.1px', color: '#cfcfcf' }} />
            <div style={{ display: 'flex', width: '100%', gap: '40px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <th
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    padding: '16px 16px 16px 16px',
                    alignItems: 'center',
                  }}
                  onClick={handleClickButton}>
                  {isButtonOpen ? <SuccessButton /> : <UnsuccessButton />}
                </th>
                <th
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    padding: '16px 16px 16px 16px',
                    alignItems: 'center',
                  }}>
                  <PaymentCard />
                </th>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <th>
                  <Text>Banks</Text>
                </th>
                <th>
                  <Text>Test Bank</Text>
                </th>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <th>
                  <Text>Last 4 Num</Text>
                </th>
                <th>
                  <Text>1234</Text>
                </th>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <th>
                  <Text>Name Surname</Text>
                </th>
                <th>
                  <Text>Ekin Şanlı</Text>
                </th>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <th>
                  <Text>Expiry date</Text>
                </th>
                <th>
                  <Text>12/34</Text>
                </th>
              </div>
            </div>
            <hr style={{ width: '100%', height: '0.1px', color: '#cfcfcf' }} />
            <div style={{ display: 'flex', width: '100%', gap: '40px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <th
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    padding: '16px 16px 16px 16px',
                    alignItems: 'center',
                  }}
                  onClick={handleeClickButtonOpen}>
                  {isButton ? <SuccessButton /> : <UnsuccessButton />}
                </th>
                <th
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    padding: '16px 16px 16px 16px',
                    alignItems: 'center',
                  }}>
                  <PaymentCard />
                </th>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <th>
                  <Text>Banks</Text>
                </th>
                <th>
                  <Text>Test Bank</Text>
                </th>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <th>
                  <Text>Last 4 Num</Text>
                </th>
                <th>
                  <Text>2712</Text>
                </th>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <th>
                  <Text>Name Surname</Text>
                </th>
                <th>
                  <Text>Enes Taha Öz</Text>
                </th>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <th>
                  <Text>Expiry date</Text>
                </th>
                <th>
                  <Text>02/35</Text>
                </th>
              </div>
            </div>
          </LeftFirstBox>
          <LeftSecondBox>
            <CollapsButton isOpen={isOpen} onClick={handlClickButtonOpen}>
              {!isOpen ? (
                <>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      padding: '16px 16px 16px 16px',
                      alignItems: 'center',
                    }}>
                    <UnsuccessButton />
                    <Text>Add new card</Text>
                  </div>
                </>
              ) : (
                <>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '24px 32px 24px 32px',
                    }}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        padding: '16px 16px 16px 16px',
                        alignItems: 'center',
                      }}>
                      <SuccessButton />
                      <Text>Add new card</Text>
                    </div>
                    <div>
                      <CardLogo></CardLogo>
                    </div>
                  </div>
                </>
              )}
            </CollapsButton>
            {isOpen && (
              <SecondDiv>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '24px 32px 24px 32px',
                  }}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                      width: '240px',
                    }}>
                    <Text>Card numbers</Text>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      padding: '16px 16px 16px 16px',
                      alignItems: 'center',
                    }}>
                    <PaymentCard></PaymentCard>
                    <input
                      style={{
                        width: '300px',
                        height: '40px',
                        borderRadius: '8px',
                        border: ' 1px solid  #CFCFCF)',
                      }}
                      type='text'></input>
                  </div>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '24px 32px 24px 32px',
                  }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Text>Card Owner</Text>
                  </div>
                  <div style={{ display: 'flex' }}>
                    <input
                      style={{
                        width: '300px',
                        height: '40px',
                        borderRadius: '8px',
                        border: ' 1px solid var(--border-grey, #CFCFCF)',
                      }}
                      type='text'></input>
                  </div>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '24px 32px 24px 32px',
                  }}>
                  <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <Text> Expiry Date</Text>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                    <input
                      style={{
                        width: '60px',
                        height: '40px',
                        borderRadius: '8px',
                        border: ' 1px solid var(--border-grey, #CFCFCF)',
                      }}
                      type='text'></input>
                    <SlashIcon>/</SlashIcon>
                    <input
                      style={{
                        width: '60px',
                        height: '40px',
                        borderRadius: '8px',
                        border: ' 1px solid var(--border-grey, #CFCFCF)',
                      }}
                      type='text'></input>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '5px',
                    }}>
                    <Text>CVV2</Text>
                    <input
                      style={{
                        width: '60px',
                        height: '40px',
                        borderRadius: '8px',
                        border: ' 1px solid var(--border-grey, #CFCFCF)',
                      }}
                      type='text'></input>
                  </div>
                </div>
              </SecondDiv>
            )}
          </LeftSecondBox>
          <RightButtonDiv>
            <Button>
              <TextButton>Review your order</TextButton>
            </Button>
          </RightButtonDiv>
        </LeftSide>
      </Container>
    </div>
  );
}

const PaymentPage = styled(NonStyledPaymentPage)`
  display: flex;
  align-items: center;
  height: 70vh;
`;

export default PaymentPage;
