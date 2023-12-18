import React, { useState, useEffect } from 'react';
import 'styles/animation.css'
import { Sidebar } from "react-pro-sidebar";
import { CSSTransition } from 'react-transition-group';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Img, Text, TimeComponent, Weather, Reclist, Firstlist, Drama, Mov } from "components";
import 'styles/loading.css';
import 'styles/font.css'
import 'styles/img.css'
import 'styles/clicked.css'
import 'styles/scroll.css'

const LoadingScreen = () => {
    return (
        <div className='lodaing-screen'>
            
            <img src='/images/spinner.gif' alt='로딩 중' />
        </div>
        );
    };
 

function FamilyHomeLightPage() {
  const [loading, setLoading] = useState(true);
  const [genposter, setGenposter] = useState([]);
  const [rankposter, setRankposter] = useState([]);
  const [recposter, setRecposter] = useState([]);
  const [yetposter, setYetposter] = useState([]);
  const [current, setCurrent] = useState('');
  // const [movie, setMovie] = useState([]);
  // const [drama, setDrama] = useState([]);


  // 드라마 데이터
  const initialStartIndex = localStorage.getItem('startIndex');
  const initialIndex = initialStartIndex !== null ? parseInt(initialStartIndex) : 0;
  const [startIndex, setStartIndex] = useState(initialIndex);
  const [userposter, setUserposter] = useState([]);
  const [showPage, setShowPage] = useState(false);
  const [recposter1, setRecposter1] = useState([]);
  const [rankposter1, setRankposter1] = useState([]);
  const [ctcl1, setCtcl1] = useState([]);
  const [ctcl2, setCtcl2] = useState([]);
  const [ctcl3, setCtcl3] = useState([]);
  const [ctcl4, setCtcl4] = useState([]);
  const [ctcl5, setCtcl5] = useState([]);
  const [ctcl6, setCtcl6] = useState([]);
  const [ctclname, setCtclname] = useState([]);

  //영화 데이터
  const [rankposter11, setRankposter11] = useState([]);
  const [ctcl11, setCtcl11] = useState([]);
  const [ctcl21, setCtcl21] = useState([]);
  const [ctcl31, setCtcl31] = useState([]);
  const [ctcl41, setCtcl41] = useState([]);
  const [ctcl51, setCtcl51] = useState([]);
  const [ctcl61, setCtcl61] = useState([]);
  const [ctcl71, setCtcl71] = useState([]);
  const [ctclname1, setCtclname1] = useState([]);
  localStorage.setItem('page', 0); // 기본
  const navigate = useNavigate();

  useEffect(() => {
    setShowPage(true);
  }, []);

  useEffect(() => {
    

  
    const fetchData = async () => {
      try{
        const access = localStorage.getItem('access_token');
        if (!access) {
          navigate('/');
          return; // 로그인 페이지로 이동 후 함수 종료
        }
      


    } catch (error) {
      let loadingTimer = setTimeout(() => {
        setLoading(false); // 10초 후에 로딩 완료
        // 실패 로직 필요시 추가
        clearTimeout(loadingTimer); // 타이머 초기화
      }, 10000);
      console.error('Error fetching data:', error);
    }
      

      
      try {
        const access = localStorage.getItem('access_token');
        if (!access) {
          navigate('/');
          return; // 로그인 페이지로 이동 후 함수 종료
        }

        console.log('access token 은', access);
        setLoading(true);
        
        const gen = JSON.parse(localStorage.getItem('genre'));
        const genre = gen ? gen.join(',') : null;
        console.log(genre);

        
        
        const response = await axios.get('https://hello00back.net/vodrec', {
          headers: {
            Authorization : access,
            Data : genre,
          },

      });
      //드라마
      const response1 = await axios.get('https://hello00back.net/home/drama', {
        headers: {
          Authorization : access,
        },
      });
      //영화
      const response2 = await axios.get('https://hello00back.net/home/movie', {
        headers: {
          Authorization : access,
        },
  


    });
      
        if (response.status === 200 && response1.status === 200 && response2.status === 200) {
          console.log("여긴 문제가 아니야")
        
        
          const data = response.data.data;
          const current = response.data.current;
          console.log(current);
          const selectedItems = data[0].slice(startIndex, startIndex + 10);
          const rankItems = data[1];
          const userItems = data[2].slice(startIndex, startIndex + 10);
          const recItems = data[3].slice(startIndex, startIndex + 10);
          const yetItems = data[4]
        

          console.log(data);

          const rankposter = rankItems.map(item => item); //주간 랭킹
          const genposter = selectedItems.map(item => item); // 장르별
          const userposter = userItems.map(item=> item); // 사용자 개인
          const recposter = recItems.map(item=> item); // 관련 추천
          const yetposter= yetItems.map(item=> item); //덜 본거

          setGenposter(genposter);
          setUserposter(userposter);
          setRankposter(rankposter);
          setRecposter(recposter);
          setYetposter(yetposter);
          setCurrent(current);
          setLoading(false);
        
        
        //드라마 데이터 받아오기
        const data1 = response1.data.data; //포스터 데이터
        const rankItems1 = data1[0];
        const recItems1 = data1[1].slice(startIndex, startIndex + 10);
        const ctcl1Items = data1[2][0];
        const ctcl2Items = data1[2][1];
        const ctcl3Items = data1[2][2];
        const ctcl4Items = data1[2][3];
        const ctcl5Items = data1[2][4];
        const ctcl6Items = data1[2][5];
        const ctclnames = response1.data.genres; //장르 데이터
        
        const rankposter1 = rankItems1.map(item => item); 
        const recposter1 = recItems1.map(item=> item); 
        const ctcl1 = ctcl1Items.map(item => item); 
        const ctcl2 = ctcl2Items.map(item=> item);
        const ctcl3 = ctcl3Items.map(item=> item); 
        const ctcl4 = ctcl4Items.map(item=> item);
        const ctcl5 = ctcl5Items.map(item=> item); 
        const ctcl6 = ctcl6Items.map(item=> item);
        const ctclname = ctclnames;

        setRankposter1(rankposter1);
        setCtcl1(ctcl1);
        setCtcl2(ctcl2);
        setCtcl3(ctcl3);
        setCtcl4(ctcl4);
        setCtcl5(ctcl5);
        setCtcl6(ctcl6);
        setRecposter1(recposter1);
        setCtclname(ctclname);
        
        //영화 데이터
        const data2 = response2.data.data; //포스터 데이터
        const rankItems2 = data2[0];
        const ctcl1Items1 = data2[1][0];
        const ctcl2Items1 = data2[1][1];
        const ctcl3Items1 = data2[1][2];
        const ctcl4Items1 = data2[1][3];
        const ctcl5Items1 = data2[1][4];
        const ctcl6Items1 = data2[1][5];
        const ctcl7Items1 = data2[1][6];
        console.log(response2.data);
        const ctclnames1 = response2.data.genres; //장르 데이터



        const rankposter11 = rankItems2.map(item => item); 
        const ctcl11 = ctcl1Items1.map(item => item); 
        const ctcl21 = ctcl2Items1.map(item=> item);
        const ctcl31 = ctcl3Items1.map(item=> item); 
        const ctcl41 = ctcl4Items1.map(item=> item);
        const ctcl51 = ctcl5Items1.map(item=> item); 
        const ctcl61 = ctcl6Items1.map(item=> item);
        const ctcl71 = ctcl7Items1.map(item=> item); 
        const ctclname1 = ctclnames1;
        console.log(ctclnames);
        setRankposter11(rankposter11);
        setCtcl11(ctcl11);
        setCtcl21(ctcl21);
        setCtcl31(ctcl31);
        setCtcl41(ctcl41);
        setCtcl51(ctcl51);
        setCtcl61(ctcl61);
        setCtcl71(ctcl71);
        setCtclname1(ctclname1);
        

        }

      
      } catch (error) {
        let loadingTimer = setTimeout(() => {
          setLoading(false); // 10초 후에 로딩 완료
          // 실패 로직 필요시 추가
          clearTimeout(loadingTimer); // 타이머 초기화
        }, 10000);
        console.error('Error fetching:', error);
      }
      
      
    };
    window.scrollTo({ top: 0, behavior: 'smooth' })
    fetchData();
  }, [navigate, startIndex]);


  
  const handleClick = () => {
    return(
    window.scrollTo({ top: 0, behavior: 'smooth' })
  )};
  const Rerec = () => {
    const saveToLocalStorage = (startIndex) => {
      localStorage.setItem('startIndex', startIndex);
    };
    
    const currentStartIndex = parseInt(localStorage.getItem('startIndex'), 10) || 0;
  
    if (currentStartIndex < 90) {
      const updatedStartIndex = currentStartIndex + 10;
      setStartIndex(updatedStartIndex);
      saveToLocalStorage(updatedStartIndex);
    } else {
      setStartIndex(0);
      localStorage.setItem('startIndex', startIndex);
    }
  }
  // const toggleOutline = (event) => {
  //   event.currentTarget.classList.toggle('clicked');
  
  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const homeButton = document.querySelector('#home-button');
    const dramaButton = document.querySelector('#drama-button');
    const movieButton = document.querySelector('#movie-button');
    if (scrollPosition >= 0 && scrollPosition < 2700) {
      homeButton.classList.add('scroll-background');
    } else {
      homeButton.classList.remove('scroll-background');
    }
    if (scrollPosition >= 2690 && scrollPosition <= 6550) {
      dramaButton.classList.add('scroll-background');
    } else {
      dramaButton.classList.remove('scroll-background');
    }
    if (scrollPosition >= 6549 && scrollPosition <= 20000) {
      movieButton.classList.add('scroll-background');
    } else {
      movieButton.classList.remove('scroll-background');
    }
  };
  
  // 스크롤 이벤트에 핸들러 추가
  window.addEventListener('scroll', handleScroll);

  

  return (
    <>
      <CSSTransition
        in={showPage}
        timeout={1500}
        classNames="fade"
       unmountOnExit
      >
      <div className="bg-gray-100 border border-black-900 border-solid flex flex-col font-inter items-center justify-start mx-auto w-full">
        <div className="flex flex-col items-center justify-start w-full">
          <div className="z-10 !sticky top-[0] overflow-block relative flex bg-red-A400 flex md:flex-col flex-row md:gap-5 items-start justify-end pb-1.5 px-1.5 w-full">
            <Img
              className="button common-pointer absolute h-[45px] w-[45px] left-5 md:mt-0 mt-[26px]"
              src="images/img_arrowdown.svg"
              alt="arrowdown"
              onClick={() => navigate('/frontpagelight')}
            />
            <Text className="absolute font-yogi font-lighter left-[10%] mt-[2%] md:text-2xl text-2xl text-white-A700 tracking-[-0.30px]">
              HELLO 00
            </Text>
            <Text className="absolute font-yogi font-lighter left-[45%] mt-[1.7%] md:text-3xl text-4xl text-white-A700 tracking-[-0.30px]">
              BASIC MODE
            </Text>
            <div className="relative h-[80px] w-[20%] mr-[1%] mt-[0.5%] w-[15%] md:w-full">
              <Weather />
            </div>
            <Text
              className="ml-9 md:ml-[0] mr-[15px] md:mt-0 mt-[30px] md:text-3xl sm:text-[28px] text-[32px] text-center text-white-A700 tracking-[-0.16px]"
              size="txtInterSemiBold32"
            >
              <TimeComponent/>
            </Text>
          </div>
          <div className="flex md:flex-col flex-row font-yogi md:gap-10 items-start justify-between mx-auto md:px-5 w-full">
            <Sidebar className="!sticky !w-[90px] bg-gray-50 flex !h-screen justify-start overflow-auto top-[0]">
              <div className="flex flex-col items-center justify-start mt-[105%] mx-auto w-[48%]">
                <div className="flex flex-col items-start justify-start w-[80%] align-center" >
                  <Img
                    className="search"
                    src="images/img_search.svg"
                    alt="rewind"
                    onClick={ () => alert("현재 검색 기능은 준비 중입니다.")}
                  />
                  <Text
                    className="ml-1 md:ml-[0] text-[15px] text-center text-gray-800 sm:text-lg md:text-xl tracking-[-2px]"
                    size="txtYogi"
                  >
                    검색
                  </Text>
                </div>
                <div
                  className="common-pointer flex flex-col items-center justify-start mt-[12px] w-full" 
                  id="home-button"

                >
                  <Img
                    className="h-[55px] button"
                    src="images/img_home.svg"
                    alt="home"
                    onClick={handleClick}
                      //handleClick()};
                    
                    
                  />
                  <Text
                    className="text-[15px] mt-[-1%] text-center font-yogi text-gray-800 sm:text-lg md:text-xl tracking-[-0.11px]"
                    size="txtYogi"
                  >
                    TOP
                  </Text>
                </div>
                <div className="flex flex-col items-center justify-start mt-[12px] w-full" 
                  id="drama-button">
                  <Img
                    className="h-[55px] button"
                    src="images/img_star.svg"
                    alt="star"
                    onClick={() => window.scrollTo({ top: 2700, behavior: 'smooth' })}
                  />
                  <Text
                    className="text-[15px] mt-[-1%] text-center font-yogi text-gray-800 md:text-xl tracking-[-1px]"
                    size="txtYogi"
                    onClick={() => window.scrollTo({ top: 2700, behavior: 'smooth' })}
                  >
                    드라마
                  </Text>
                </div>
                <div className="flex flex-col gap-0 items-center justify-start mt-[12px] w-[100%] md:w-full" id="movie-button">
                  <Img
                    className="h-[55px] button"
                    src="images/img_thumbsup.svg"
                    alt="lock"
                    onClick={() => window.scrollTo({ top: 6550, behavior: 'smooth' })}
                  />
                  <Text
                    className="text-[15px] mt-[-1%] text-center text-gray-800 sm:text-lg md:text-xl tracking-[-0.11px]"
                    size="txtYogi"
                    onClick={() => window.scrollTo({ top: 6550, behavior: 'smooth' })}
                  >
                    영화
                  </Text>
                </div>
              </div>

              <div className="flex flex-col gap-[17px] items-center justify-start mb-[38px] mt-[12px] mx-auto w-[48%]">
                <Img
                  className="h-[55px] button"
                  src="images/img_qrcode.svg"
                  alt="contrast"
                  onClick={Rerec}
                />
                <Text
                  className="text-[15px] text-center sm:text-lg text-red-A400 md:text-xl tracking-[-2px]"
                  size="txtYogi"
                  onClick={Rerec}
                >
                  재추천
                </Text>
              </div>
            </Sidebar>
         
            {loading ? (
              <div className='overlay'>
                <LoadingScreen />
              </div>
            ) : ( 
                  
              <div className="flex flex-1 flex-col items-start justify-start w-full mb-[10%]">
                <div className="flex flex-1 flex-col items-start justify-start w-full">
                <div className="flex flex-col items-center justify-start" style={{ marginTop: '2%' }}>
                  <Text
                    className="leading-[10.00px] ml-[5.5%] pl-[50px] sm:text-[21px] md:text-[23px] text-[25px] text-black-900 tracking-[-0.13px] w-full font-yogi"
                    size="txtYogi"
                  >
                    <span className="text-black-900 font-yogi text-left">
                      이달의 최신작{" "}
                    </span>
                    <span className="md:text-[46px] sm:text-[40px] text-red-A400 font-yellowtail text-left text-[50px] font-normal">
                      New{" "}
                    </span>
                  </Text>
                </div>
                <div className="flex md:flex-col flex-row font-paytoneone items-center justify-start w-full">                                  
                <div className="flex flex-col items-center justify-start" style={{ marginTop: '2%' }}>


                </div>
                  
                      
                        <Firstlist></Firstlist>
                      
                  

                </div>

            </div>
                
              <div className="flex flex-1 flex-col items-start justify-start w-full">
                <div className="flex flex-col items-center justify-start" style={{ marginTop: '6%' }}>
                  <Text
                    className="leading-[10.00px] pl-[50px] ml-[5%] sm:text-[30px] md:text-[50px] text-[25px] text-black-900 tracking-[-0.13px] w-full font-yogi inline-block"
                    size="txtYogi"
                  >
                    <span className="text-black-900 font-yogi">
                      주간 베스트{" "}
                    </span>
                    <span className="md:text-[46px] sm:text-[40px] text-red-A400 font-yellowtail text-[40px] font-normal ">
                      Ranking{" "}
                    </span>
                  </Text>
                </div>
                <div className="flex md:flex-col flex-row font-paytoneone md:gap-5 items-start justify-between pr-[100px] w-full">                                  
                  <div className="flex-shrink-0 h-[250px] relative w-1/6 mr-[10%] mb-[2%] md:w-full mt-[1%]">
                  
                      <div className="video-container">
                        <Reclist rankposter={rankposter} />
                      </div>
                  </div>
                  </div>
                </div>
            
              <div className="flex flex-1 flex-col items-start justify-start w-full">
                <div className="flex flex-col items-center justify-start" style={{ marginTop: '6%' }}>
                  <Text
                    className="leading-[100.00px] mb-[-4%] ml-[3%] pl-[50px] sm:text-[21px] md:text-[23px] text-[25px] text-black-900 tracking-[-0.13px] w-full"
                    size="txtYogi"
                  >
                    <span className="text-black-900 font-yogi text-left">
                      {localStorage.getItem('new') ? `당신의 선택한 장르 기반 추천 ` : `당신의 취향저격 장르 추천 `}
                    </span>
                    <span className="md:text-[46px] sm:text-[40px] text-red-A400 font-yellowtail text-left text-[50px] font-normal">
                      {localStorage.getItem('new') ? `Genre` : `Genre `}
                    </span>
                  </Text>

                </div>
                <div className="flex md:flex-col flex-row font-paytoneone md:gap-5 items-start justify-between pr-[100px] w-full">                                  
                  <div className="flex-shrink-0 h-[250px] relative w-1/6 mr-[10%] mb-[2%] md:w-full">
                  
                      <div className="video-container">
                        <Reclist rankposter={genposter} />
                      </div>
                  
                  </div>
                </div>
            </div>
              <div className="flex flex-1 flex-col items-start justify-start w-full">
                <div className="flex flex-col items-center justify-start " style={{ marginTop: '6%' }}>
                  <Text
                    className="leading-[100.00px] ml-[3%] pl-[50px] mb-[-4%] sm:text-[21px] md:text-[23px] text-[25px] text-black-900 tracking-[-0.13px] w-full"
                    size="txtYogi"
                  >
                    <span className="text-black-900 text-left font-yogi">
                      당신과 비슷한 유저들이 즐겨봐요{" "}
                    </span>
                    <span className="md:text-[46px] sm:text-[40px] text-red-A400 font-yellowtail text-left text-[50px]">
                      User{" "}
                    </span>
                  </Text>
                </div>
                <div className="flex md:flex-col flex-row md:gap-5 items-start justify-between pr-[100px] w-full">
                  
                 
                <div className="flex-shrink-0 h-[250px] relative w-1/6 md:w-full mb-[2%]">
                  
                    <div className="video-container">
                    <Reclist rankposter={userposter} />
                    </div>
                    
                  </div>
                </div>
              </div>
              {recposter !== null && recposter.length > 0 && (
              <div className="flex flex-1 flex-col items-start justify-start w-full">
                <div className="flex flex-col items-center justify-start" style={{ marginTop: '6%' }}>
                  <Text
                    className="leading-[100.00px] ml-[3%] pl-[50px] mb-[-4%] sm:text-[21px] md:text-[23px] text-[25px] text-black-900 tracking-[-0.13px] w-full"
                    size="txtYogi"
                  >
                    <span className="text-black-900 font-yogi text-left font-normal">
                    
                    최근 시청한&nbsp;
                    </span>
                    <span className="text-red-A400 font-yogi text-left font-normal text-[30px]">
                  
                    '{current}'&nbsp;
                    </span>
                    <span className="text-black-900 font-yogi text-left font-normal">
                    
                    VOD와 유사한&nbsp;
                    </span>
                    <span className="md:text-[46px] sm:text-[40px] text-red-A400 font-yellowtail text-left text-[50px] font-normal">
                      VOD{" "}
                    </span>
                  </Text>
                </div>
                <div className="flex md:flex-col flex-row md:gap-5 items-start justify-between pr-[100px] w-full">
                  
                 
                <div className="flex-shrink-0 h-[250px] relative w-1/6 md:w-full mb-[2%]">
                  
                    <div className="video-container">
                    <Reclist rankposter={recposter} />
                    </div>
                    
                  </div>
                </div>
              </div>
              )}
              {/* 드라마 추천 장소 */}
              {yetposter !== null && yetposter.length > 0 && (
              <div className="flex flex-1 flex-col items-start justify-start w-full pb-[200px]">
                <div className="flex flex-col items-center justify-start" style={{ marginTop: '6%' }}>
                  <Text
                    className="leading-[100.00px] pl-[50px] mb-[-4%] sm:text-[21px] md:text-[23px] text-[25px] text-black-900 tracking-[-0.13px] w-full"
                    size="txtYogi"
                  >
                    <span className="md:text-[25px] sm:text-[25px] text-red-A400 font-yogi text-left text-[30px] font-normal">
                    {localStorage.getItem('subsr')}&nbsp;
                    </span>
                    <span className="text-black-900 text-left font-yogi">
                     님이 시청중인{" "}
                    </span>
                    <span className="md:text-[46px] sm:text-[40px] text-red-A400 font-yellowtail text-left text-[50px] font-normal">
                      VOD{" "}
                    </span>
                  </Text>
                </div>
                <div className="flex md:flex-col flex-row md:gap-5 items-start justify-between pr-[100px] w-full">
                  
                 
                <div className="flex-shrink-0 h-[250px] relative w-1/6 md:w-full mb-[2%]">
                  
                    <div className="video-container">
                    <Reclist rankposter={yetposter} />
                    </div>
                    
                  </div>
                </div>
              </div>
              )}

              {/* 드라마 구간 */}
              <div className="flex flex-col items-center justify-start " style={{ marginTop: '15%', backgroundColor: '#FED7E2', width: '100%'}} >
                  <Text
                    className="leading-[100.00px] pl-[50px] ml-[1%] sm:text-[21px] md:text-[23px] text-[30px] text-black-900 tracking-[-0.13px] w-full"
                    size="txtYogi"
                    
                  >
                    <span className="text-black-900 text-left font-yogi">
                    드라마{" "}
                    </span>

                  </Text>
                </div>

              <div className="flex flex-1 flex-col items-start justify-start w-full">
                <div className="flex flex-col items-center justify-start " style={{ marginTop: '1%' }}>
                  <Text
                    className="leading-[100.00px] ml-[3%] pl-[50px] mb-[-4%] sm:text-[21px] md:text-[23px] text-[25px] text-black-900 tracking-[-0.13px] w-full"
                    size="txtYogi"
                  >
                    <span className="text-black-900 text-left font-yogi">
                      이주의 드라마{" "}
                    </span>
                    <span className="md:text-[46px] sm:text-[40px] text-red-A400 font-yellowtail text-left text-[50px]">
                      Ranking{" "}
                    </span>
                  </Text>
                </div>
                <div className="flex md:flex-col flex-row md:gap-5 items-start justify-between pr-[100px] w-full">
                  
                 
                <div className="flex-shrink-0 h-[250px] relative w-1/6 md:w-full mb-[2%]">
                  
                    <div className="video-container">
                    <Reclist rankposter={rankposter1} />
                    </div>
                    
                  </div>
                </div>
              </div>

              <div className="flex flex-1 flex-col items-start justify-start w-full">
                <div className="flex flex-col items-center justify-start " style={{ marginTop: '6%' }}>
                  <Text
                    className="leading-[100.00px] ml-[3%] pl-[50px] mb-[-4%] sm:text-[21px] md:text-[23px] text-[25px] text-black-900 tracking-[-0.13px] w-full"
                    size="txtYogi"
                  >
                    <span className="text-black-900 text-left font-yogi">
                      당신을 위한 드라마 추천{" "}
                    </span>
                    <span className="md:text-[46px] sm:text-[40px] text-red-A400 font-yellowtail text-left text-[50px]">
                      For You{" "}
                    </span>
                  </Text>
                </div>
                <div className="flex md:flex-col flex-row md:gap-5 items-start justify-between pr-[100px] w-full">
                  
                 
                <div className="flex-shrink-0 h-[250px] relative w-1/6 md:w-full mb-[2%]">
                  
                    <div className="video-container">
                    <Reclist rankposter={recposter1} />
                    </div>
                    
                  </div>
                </div>
              </div>

              

                <Drama ctcl={ctcl1} ctclname={ctclname} i={0}/>
                <Drama ctcl={ctcl2} ctclname={ctclname} i={1}/>
                <Drama ctcl={ctcl3} ctclname={ctclname} i={2}/>
                <Drama ctcl={ctcl4} ctclname={ctclname} i={3}/>
                <Drama ctcl={ctcl5} ctclname={ctclname} i={4}/>
                <Drama ctcl={ctcl6} ctclname={ctclname} i={5}/>
                



                 {/*영화 */}

                 <div className="flex flex-col items-center justify-start " style={{ marginTop: '13%', backgroundColor: '#FED7E2', width: '100%'}}>
                  <Text
                    className="leading-[100.00px] pl-[50px] ml-[1%] sm:text-[21px] md:text-[23px] text-[30px] text-black-900 tracking-[-0.13px] w-full"
                    size="txtYogi"
                  >
                    <span className="text-black-900 text-left font-yogi">
                    영화{" "}
                    </span>

                  </Text>
                </div>
                <div className="flex flex-1 flex-col items-start justify-start w-full">
                <div className="flex flex-col items-center justify-start " style={{ marginTop: '1%' }}>
                  <Text
                    className="leading-[100.00px] ml-[3%] pl-[50px] mb-[-4%] sm:text-[21px] md:text-[23px] text-[25px] text-black-900 tracking-[-0.13px] w-full"
                    size="txtYogi"
                  >
                    <span className="text-black-900 text-left font-yogi">
                      주간 영화 베스트{" "}
                    </span>
                    <span className="md:text-[46px] sm:text-[40px] text-red-A400 font-yellowtail text-left text-[50px]">
                      Best{" "}
                    </span>
                  </Text>
                </div>
                <div className="flex md:flex-col flex-row md:gap-5 items-start justify-between pr-[100px] w-full">
                  
                 
                <div className="flex-shrink-0 h-[250px] relative w-1/6 md:w-full mb-[2%]">
                  
                    <div className="video-container">
                    <Reclist rankposter={rankposter11} />
                    </div>
                    
                  </div>
                </div>
              </div>

              <Mov ctcl={ctcl11} ctclname={ctclname1} i={0}/>
              <Mov ctcl={ctcl21} ctclname={ctclname1} i={1}/>
              <Mov ctcl={ctcl31} ctclname={ctclname1} i={2}/>
              <Mov ctcl={ctcl41} ctclname={ctclname1} i={3}/>
              <Mov ctcl={ctcl51} ctclname={ctclname1} i={4}/>
              <Mov ctcl={ctcl61} ctclname={ctclname1} i={5}/>
              <Mov ctcl={ctcl71} ctclname={ctclname1} i={6}/>







           

              
            </div>
            )}
          </div>
        </div>
      </div>
      </CSSTransition>
    </>
  );
};

export default FamilyHomeLightPage;





