import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' 
    ? process.env.REACT_APP_API_URL 
    : '/api',
  headers: {
    'Content-Type': 'application/json',
    // 여기에 추가하고 싶은 기본 헤더들을 넣으세요
  },
});

// 요청 인터셉터 설정
instance.interceptors.request.use(
  (config) => {
    // 요청 보내기 전에 수행할 작업
    // 예: 토큰을 헤더에 추가
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    // return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance; 