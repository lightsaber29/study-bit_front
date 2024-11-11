import React from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useFormInput } from '../../../hooks';
import Button from '../../../components/Button';

const Signup = () => {
  const navigate = useNavigate();

  const { values, handleChange, resetForm } = useFormInput({
    username: '',
    password: '',
    email: '',
    admin: false,
    adminToken: '',
  });

  const { username, password, email, admin, adminToken } = values;

  const isFormValid = () => {
    return username && password && email && (!admin || (admin && adminToken));
  };

  const signup = async (e) => {
    e.preventDefault(); // 폼 기본 제출 방지
    try {
      await axios.post(`/api/signup`, values).then((res) => {
        // console.log("res :: ", res);
        alert('회원가입되었습니다. 로그인 해 주세요.');
        resetForm();
        navigate('/login');
      });
    } catch (error) {
      // 서버에서 전달된 에러 메시지 처리
      const errorMessage = error.response?.data?.message || '회원가입 중 오류가 발생했습니다.';
      alert(errorMessage);
    }
  };  

  const backToHome = () => {
    navigate('/');
  };

  return (
    <form onSubmit={signup}>
      <h2>회원가입</h2>
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
        <span>이메일</span>: &nbsp;
        <input type="email" name="email" value={email} onChange={handleChange} />
      </div>
      <br />
      <div>
        <span>admin 여부</span>
        <input type="checkbox" name="admin" checked={admin} onChange={handleChange} />
      </div>
      {admin && (
        <div>
          <span>관리자 토큰</span>: &nbsp;
          <input 
            type="password" 
            name="adminToken" 
            value={adminToken} 
            onChange={handleChange} 
          />
        </div>
      )}
      <br />
      <div>
        <Button
          type="submit"
          variant="primary"
          size="small"
          disabled={!isFormValid()}
        >
          회원가입
        </Button>
        &nbsp;
        <Button
          type="button" 
          onClick={backToHome}
          variant="secondary"
          size="small"
        >
          홈으로
        </Button>
      </div>
    </form>
  );
};

export default Signup;
