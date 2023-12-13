import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Img, Text, Text2 } from "components";
import { useParams } from 'react-router-dom';
import axios from "axios"
import 'styles/loading.css';

// import LoadingScreen from "components/Loading/Loading";

function LoadingScreen () {
  return (
      <div className='lodaing-screen'>
          <img src='/images/spinner.gif' alt='로딩 중' />
      </div>
      );
  };


function LightPage() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { programId } = useParams();
  const [data, setData] = useState(null);
  const [data1, setData1] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const access = localStorage.getItem('access_token');
        if (!access) {
          navigate('/');
          return;
        };
        setLoading(true);
        const response = await axios.get(`https://hello00back.net/vod_detail/${programId}/`);
        console.log(response);
        if (response.status === 200) {
          
        
          setData(response.data.data);
          setData1(response.data.recommend);
          console.log("관련:",response.data.recommend);
          console.log(response.data.data);
          setLoading(false);
        }
      } catch (error) {
        console.error('데이터 읽기 실패 원인:', error);
      }
    };
    fetchData();

  }, [programId, navigate]);
  const Click = (dataItem) => {
    navigate(`/Light/${dataItem}`);
 }
  return (
    <>
      <div className="bg-gray-100 border border-black-900 border-solid flex flex-col font-inter items-center justify-start mx-auto w-full">
        <div className="flex flex-col items-center justify-start w-full">
          <div className="bg-red-A400 flex md:flex-col flex-row md:gap-5 items-start justify-end pb-1.5 px-1.5 w-full">
            <Img
              className="common-pointer h-[37px] mr-[100px] md:mt-0 mt-6"
              src={process.env.PUBLIC_URL + '/images/img_arrowdown.svg'}
              alt="arrowdown"
              onClick={() => navigate('/FamilyHomeLight')}
            />
            <div className="h-[84px] md:ml-[0] ml-[1097px] md:px-5 relative w-[9%] md:w-full">
              <Text
                className="absolute bottom-[13%] left-[0] text-3xl sm:text-[26px] md:text-[28px] text-center text-white-A700_dd tracking-[-0.15px]"
                size="txtInterSemiBold30"
              >
                17°
              </Text>
              <Img
                className="absolute h-[84px] inset-y-[0] my-auto right-[0] w-[84px]"
                src={process.env.PUBLIC_URL + '/images/img_fluentweather.svg'}
                alt="fluentweather"
              />
            </div>
            <Text
              className="ml-9 md:ml-[0] mr-[15px] md:mt-0 mt-[30px] md:text-3xl sm:text-[28px] text-[32px] text-center text-white-A700 tracking-[-0.16px]"
              size="txtInterSemiBold32"
            >
              16:11
            </Text>
          </div>
          {loading ? (
              <div className='overlay'>
                <LoadingScreen />
              </div>
              ) : ( 

          
          <div className="bg-gradient flex flex-col items-start justify-end p-[45px] w-full">

            <div className="flex flex-col items-center justify-start md:ml-[0] ml-[43px] mt-[22px] w-[83%] md:w-full">
            
              <div className="flex md:flex-col flex-row md:gap-10 items-center justify-between w-full">
            

                <Img
                  className="ml-auto object-cover rounded-[25px] mt-[-130px]"
                  // src={data[2]}
                  src={data ? data[2] : ""}
                  style={{ width: '440px', height: '550px' , objectFit: 'cover' }}
                  
                />
                <div className="flex flex-col items-start justify-start">
                  <Text
                    className="ml-[150px] sm:text-[40px] md:text-[46px] text-[50px] text-white-A700 tracking-[-0.25px]"
                    size="txtInterBold50"
                  >
                    {data ? data[0] : ""}
                    <p><br /></p>
                  </Text>
                  <Text
                    className="ml-[150px] mt-[0px] text-white-A700 text-2xl tracking-[-0.10px]"
                    size="txtInterSemiBold20"
                  >
                    장르 
                  </Text>
                  <Text
                    className="ml-[170px] leading-[30.00px] mt-[10px] text-xl md:text-[22px] text-white-A700 sm:text-xl tracking-[-0.12px]"
                    size="txtInterSemiBold10"
                  >
                    {data ? data[1] : ""},{data ? data[4] : ""}<br/> {data ? data[3] : ""}
                    
                  </Text>
                  <Text
                    className="ml-[150px] leading-[40.00px] mt-[30px] text-2xl md:text-[22px] text-white-A700 sm:text-xl tracking-[-0.12px]"
                    size="txtInterSemiBold24"
                  >
                    <>
                      출연
                    </>
                  </Text>
                  <Text
                    className="ml-[170px] leading-[40.00px] mt-[0px] text-xl md:text-[22px] text-white-A700 sm:text-xl tracking-[-0.12px]"
                    size="txtInterSemiBold10"
                  >
                    <>
                      {data ? data[8] : ""}
                    </>
                  </Text>
                  <Text
                    className="ml-[150px] leading-[40.00px] mt-[20px] text-2xl md:text-[22px] text-white-A700 sm:text-xl tracking-[-0.12px] "
                    size="txtInterSemiBold24">
                      <p>줄거리 : </p>
                    
                  </Text>
                  <Text
                    className="ml-[170px] leading-[40.00px] mt-[10px] text-xl md:text-[22px] text-white-A700 sm:text-xl tracking-[-0.12px] "
                    size="txtInterSemiBold10">
                  
                    {data ? data[7] : ""}
                  </Text>
                  <div className="flex flex-col items-start justify-start md:ml-[0] ml-[164px] mt-[77px] w-[181px]">
                    <Button
                      className="common-pointer cursor-pointer font-semibold h-[50px] text-center text-lg tracking-[-0.09px] w-[175px]"
                      // onClick={handleNavigate}
                      shape="round"
                      color="red_A400"
                      size="lg"
                      variant="fill"
                    >
                      바로 시청하기
                    </Button>
                  </div>

                  

                </div>

              </div>
              
            </div>
              <Text2
                  className="sm:text-[21px] md:text-[20px] text-[40px] text-white tracking-[-0.13px] w-full"
                  size="txtABeeZeeRegular25"
                >
                    <span className="text-white font-abeezee text-left font-normal">
                      유사한 콘텐츠{" "}
                    </span>
                    <span className="md:text-[46px] sm:text-[40px] text-red-A400 font-yellowtail text-left text-[50px] font-normal">
                      VOD
                    </span>
                  </Text2>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  {data1.map((dataItem, index) => (
                    <div
                        key={index}
                        className="ml-auto object-cover rounded-[25px]"
                        style={{
                        width: '220px',
                        height: '300px',
                        objectFit: 'cover',
                        border: '10px', 
                        margin: '60px', 
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Img
                        src={dataItem[2]}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onClick={() => Click(dataItem[0])}
                      />
                  </div>
                 ))}
                </div>
            </div>
            
            )}
          
        </div>
      </div>
    </>
  )
}
export default LightPage;
