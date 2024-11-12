import React from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useFormInput } from '@hooks';
import Button from '@components/Button';
import { useDispatch } from 'react-redux';
import { setUser } from '@store/userSlice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { values, handleChange, resetForm } = useFormInput({
    username: '',
    password: '',
  });

  const { username, password } = values;

  const isFormValid = () => {
    return username && password;
  };

  const login = async (e) => {
    e.preventDefault(); // 폼 기본 제출 방지
    try {
      const res = await axios.post(`/api/login`, values);
      console.log("res :: ", res);

      const token = res.headers['authorization'];
      const storeUsername = res.data?.username;
      const storeRole = res.data?.role;

      if (token && storeUsername) {
        dispatch(setUser({
          username: storeUsername,
          token,
          role: storeRole,
        }));
        alert('로그인되었습니다.');
        resetForm();
        navigate('/');
      } else {
        alert('로그인 중 오류가 발생했습니다. 다시 시도 해 주세요.');
      }
    } catch (error) {
      // 서버에서 전달된 에러 메시지 처리
      const errorMessage = error.response?.data?.message || '로그인 중 오류가 발생했습니다.';
      alert(errorMessage);
      resetForm();
    }
  };

  return (
    <form onSubmit={login}>
      <h2>로그인</h2>
      <br />
      <div>
        <span>사용자명</span>: &nbsp;
        <input type="text" name="username" value={username} onChange={handleChange} />
      </div>
      <br />
      <div>
        <span>비밀번호</span>: &nbsp;
        <input type="password" name="password" value={password} onChange={handleChange} />
      </div>
      <br />
      <div>
        <Button
          type="submit"
          variant="primary"
          size="small" 
          disabled={!isFormValid()}
        >
          로그인
        </Button>
      </div>
    </form>
  );
};

export default Login;