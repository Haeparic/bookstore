import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import instance from '../api/axios';
import request from '../api/request';

const Bookdetail = () => {
  
  // URI 처리 및 데이터 연동
  const [detail, setDetail] = useState([]);

  const { id } = useParams();  

  const fetchData = async () => {
    const params = {
      Seq: id
    };
    const resultBook = await instance.get(request.fetchBook, {params});
    setDetail(resultBook.data.list[0]);
  }

  useEffect( () => {
    fetchData();
  }, []);

  //없는 페이지 처리
  const navigate = useNavigate();

  useEffect( () => {
    const num = () => id > 0 && id < 45 ? id : null;
    if ( num() !== id) {
      navigate("/*")
    }
  });

  // 천원단위 콤마
  function comprice(p) {
    return p.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  // 포인트 올림
  const round = (x) => {
    return Math.ceil(x)
  };

  // 날짜 구하기
  const today = new Date();
  today.setDate(today.getDate()+1);
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate()+1);
  const month = today.getMonth()+1;
  const nextMonth = tomorrow.getMonth()+1;
  const date = today.getDate();
  const tomoDate = tomorrow.getDate();
  const week = ['일', '월', '화', '수', '목', '금', '토'];
  const day = week[today.getDay()];
  const tomoDay = week[tomorrow.getDay()];
  const weekDay = ('내일 (' + month + '/' + date + ',' + day + ')')
  const weekend = ('모레 (' + nextMonth + '/' + tomoDate + ',' + tomoDay + ')')
  
  const deliDay = (day === '일') ? weekend : weekDay;
  
  // 바뀌는 버튼 만들기
  const [clickHeart, setClickHeart] = useState(true);
  const changeHeart = () => {
    setClickHeart(!clickHeart);
  };
  const [clickArrow, setClickArrow] = useState(true);
  const changeArrow = () => {
    setClickArrow(!clickArrow);
  };
  const [clickExcla, setClickExcla] = useState(true);
  const changeExcla = () => {
    setClickExcla(!clickExcla);
  };
  const [clickShare, setClickShare] = useState(true);
  const changeShare = () => {
    setClickShare(!clickShare);
  }

  return (
    <div className="container">
      <div className="position-relative">
        <div className="cate"> 
          <Link to ="/">
            <i className="bi bi-house-door-fill"></i>
          </Link>
          <span className="text-black text-opacity-25"> &nbsp;|&nbsp; </span>
          <Link to ="/booklist">
            리스트로 돌아가기
          </Link>
        </div>
        <div className="d-flex justify-content-center flex-column m-4">
          <h2>{detail.title}</h2>
          <h6>{detail.subtitle}</h6>
        </div>
        <div className="d-flex justify-content-center">
          <div className="d-flex gap-5">
            <div>              
              <div className="p-1">
                <img className="bookpic m-2 shadow-lg mb-3 bg-body" src= {detail.image} alt = "img"/>
              </div>
              <div className="d-flex justify-content-center">
                <button
                  type="button"
                  className="btn btn-light btn-sm m-1 rounded-pill border border-secondary"
                  data-bs-toggle="modal" 
                  data-bs-target="#bookModal"
                >
                  <i className="bi bi-book m-1"></i>
                  미리보기
                </button>
                <button
                  type="button"
                  className="btn btn-light btn-sm m-1 rounded-pill border border-secondary"
                  data-bs-toggle="modal" 
                  data-bs-target="#eBookModal"
                >
                  <i className="bi bi-laptop m-1"></i>
                  eBook 미리보기
                </button>
              </div>
            </div>
            <div className="p-1">
              <div className="position-relative">
                <button type= "button" className="sns-bt btn-success btn-outline-secondary" onClick={changeShare}>
                  <i className="bi bi-share"></i>
                </button>
                <div className={clickShare ? "d-none" : "openShare rounded-pill"}>
                  <div className="d-flex align-items-top">
                  <button type="button" className="btn kakao m-1"></button>
                  <button type="button" className="btn insta m-1"></button>
                  <button type="button" className="btn line m-1"></button>
                  <button type="button" className="btn twitter m-1"></button>
                  <button type="button" className="btn facebook m-1"></button>
                  <button type="button" className="shareClose m-1" onClick={changeShare}>
                    <i className="bi bi-x"></i>
                  </button>
                  </div>
                </div>
                <button type= "button" className="share-bt btn-success btn-outline-secondary" onClick={changeHeart}>
                  <i className={clickHeart ? "bi bi-suit-heart" : "bi bi-suit-heart-fill"}></i>
                </button>
              </div>
              <h4 className="d-flex justify-content-start ms-4">{detail.author}&nbsp;저자</h4>
              <div className="d-flex ms-4">
                <p>{detail.publisher}</p>
                <span>&nbsp;·&nbsp;</span>
                <p>{detail.regDt}</p>
              </div>
              <div className="d-flex ms-4">
                <p className="fs-4 point-txt">{100*detail.discount}%</p>
                <h4 className="m-1 mb-0">{comprice( detail.price * (1 - detail.discount) )}원</h4>
                <p className="text-decoration-line-through fs-6 d-flex align-items-end">{comprice( detail.price * 1 )}원</p>
              </div>
              <span className="lay-line"></span>
              <div className="d-flex justify-content-between ms-4 me-4">
                <p className="fw-bold">적립/혜택</p>
                <div className="d-flex justify-content-end">
                  <span className="point-txt">{round(detail.price*0.05)}P</span>
                  <div className="dropdown">
                    <button className="del-bt" type="button" data-bs-toggle="dropdown" data-bs-auto-close="false" aria-expanded="false" onClick={changeArrow}>
                      <i className={clickArrow ? "m-1 bi bi-arrow-down-circle" : "m-1 bi bi-arrow-up-circle-fill"}></i>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end p-3 info-bx" style={{width: "400px"}}>
                      <li className="ms-3 me-3">
                        <p className="fw-bold mb-1 fs-6">기본적립</p>
                        <div className="d-flex justify-content-between">
                          <p>5%기본적립</p>
                          <p>{round(detail.price*0.05)}P</p>
                        </div>
                      </li>
                      <span className="lay-line"></span>
                      <li className="ms-3 me-3">
                        <p className="fw-bold mb-1 fs-6">추가적립</p>
                        <div className="d-flex justify-content-between">
                          <p>5만원 이상 구매 시 추가</p>
                          <p>{comprice(2000)}P</p>
                        </div>
                        <div className="d-flex justify-content-between">
                          <p>리뷰 작성 시, e교환권 추가</p>
                          <p>최대 300원</p>
                        </div>
                      </li>
                      <span className="lay-line"></span>
                      <li className="ms-3 me-3">
                        <div className="d-flex justify-content-between">
                          <p className="fw-bold mb-1 fs-6">부가혜택 안내</p>
                          <div>
                            <a className = "boxlink" href="#">제휴포인트</a>
                            <span className="text-black text-opacity-25"> &nbsp;|&nbsp; </span>
                            <a className = "boxlink" href="#">쿠폰/혜택</a>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <span className="lay-line"></span>
              <div className="d-flex justify-content-between ms-4 me-4">
                <p className="fw-bold">배송안내</p>
                <div>
                  <div className="d-flex justify-content-end align-items-center">
                    <span>무료배송</span>
                    <div className="dropdown">
                      <button className="del-bt" type="button" data-bs-toggle="dropdown" data-bs-auto-close="false" aria-expanded="false" onClick={changeExcla}>
                        <i className={clickExcla ? "m-1 bi bi-exclamation-circle" : "m-1 bi bi-exclamation-circle-fill"}></i>
                      </button>
                      <p className="dropdown-menu dropdown-menu-end p-3 info-bx" style={{width: "400px"}}>
                        <p className="text-center fw-bold fs-5 mb-2">배송비 안내</p>
                        <p className="fw-bold mb-1 fs-6">국내도서 / 외국도서</p>
                        도서만 1만 원 이상 구매 시 무료배송<br />
                        도서 + 잡지 / 만화 / :K컬렉션을 함께 1만 원 이상 구매 시 무료배송<br />
                        <p className="text-black text-opacity-25 mt-1">1만원 미만 시 2,000원 배송비 부과</p>
                        <br />
                        <p className="fw-bold mb-1 fs-6">잡지 / 만화 / :K컬렉션 (교보배송)</p>
                        각각 구매하거나 함께 2만 원 이상 구매 시 무료배송<br />
                        <p className="text-black text-opacity-25 mt-1">2만원 미만 시 2,000원 배송비 부과</p>
                        <br />
                        <p className="fw-bold mb-1 fs-6">해외주문 서양도서 / 해외주문 일본도서 (교보배송)</p>
                        각각 구매하거나 함께 1만 원 이상 구매 시 무료배송<br />
                        <p className="text-black text-opacity-25 mt-1">1만원 미만 시 2,000원 배송비 부과</p>
                      </p>
                    </div> 
                  </div>
                  <div className="d-flex justify-content-end align-items-center">
                    <span> {deliDay} 도착예정</span>
                    <button className="del-bt">
                      <i className="bi bi-question-circle m-1"></i>
                    </button>
                  </div>
                </div>
              </div>
              <span className="lay-line"></span>
              <div className="d-flex justify-content-between">
                <button type="button" className="btn btn-outline-light btn-md btn-warning m-2">
                  <i className="bi bi-gift m-2"></i>
                  선물하기
                </button>
                <button type="button" className="btn btn-outline-light btn-md btn-secondary m-2">
                  <i className="bi bi-cart4 m-2"></i>
                  장바구니
                </button>
                <button type="button" className="btn btn-outline-light btn-md btn-primary m-2">
                  <i className="bi bi-credit-card m-2"></i>
                  바로구매
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center m-3">
        <div className="card" style={{ width: "80%" }}>
          <div className="card-header text-start">책 소개</div>
          <div className="card-text text-start m-3">
            {detail.overview}
          </div>
        </div>
      </div>
      <div className="modal fade" id="bookModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <i className="bi bi-book m-2 fs-5"></i>
              <h3 className="modal-title fs-5" id="staticBackdropLabel">미리보기</h3>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body d-flex justify-content-center">
              <img className="m-2 shadow-lg" src= {detail.image} alt = "img"/>
              <button type="button" className="eBookPrevBt">
                <i className="bi bi-chevron-left fs-2"></i>
              </button>
              <button type="button" className="eBookNextBt">
                <i className="bi bi-chevron-right fs-2"></i>
              </button>
            </div>
          </div>
        </div>
      </div> 
      <div className="modal fade" id="eBookModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <i className="bi bi-laptop m-2 fs-5"></i>
              <h1 className="modal-title m-2 fs-5" >eBook 미리보기</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body d-flex justify-content-center">
              <img className="m-2 shadow-lg" src= {detail.image} alt = "img"/>
              <button type="button" className="eBookPrevBt">
                <i className="bi bi-chevron-left fs-2"></i>
              </button>
              <button type="button" className="eBookNextBt">
                <i className="bi bi-chevron-right fs-2"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookdetail;
