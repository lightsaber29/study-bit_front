import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useFormInput } from '../../../hooks';
import Button from '../../../components/Button';
import { useSelector } from 'react-redux';

const BoardWrite = () => {
  const navigate = useNavigate();

  const postTitleRef = useRef();
  const postAuthorNameRef = useRef();
  const postContentsRef = useRef();
  const postPwdRef = useRef();
  const username = useSelector((state) => state.user.username);

  const { values, handleChange, resetForm, setValues } = useFormInput({
    postTitle: '',
    postAuthorName: '',
    postContents: '',
    postPwd: '',
  });

  const { postTitle, postAuthorName, postContents, postPwd } = values;

  useEffect(() => {
    if (username) {
      setValues((prevValues) => ({
        ...prevValues,
        postAuthorName: username,
      }));
    }
  }, [username, setValues]);

  const isFormValid = () => {
    return postTitle && postAuthorName && postContents && postPwd;
  };

  const validateForm = () => {
    if (!postTitle.trim()) {
      alert('제목을 입력해 주세요.');
      postTitleRef.current.focus();
      return false;
    }
    if (postTitle.length < 10) {
      alert('제목은 최소 10자 이상이어야 합니다.');
      postTitleRef.current.focus(); // 포커스 이동
      return false;
    }
    if (!postAuthorName.trim()) {
      alert('작성자를 입력해 주세요.');
      postAuthorNameRef.current.focus();
      return false;
    }
    if (!postContents.trim()) {
      alert('내용을 입력해 주세요.');
      postContentsRef.current.focus();
      return false;
    }
    if (!postPwd.trim()) {
      alert('비밀번호를 입력해 주세요.');
      postPwdRef.current.focus();
      return false;
    }
    return true;
  }

  const saveBoard = async (e) => {
    e.preventDefault(); // 폼 기본 제출 방지
    if (!validateForm()) {
      return;
    }
    try {
      await axios.post(`/api/board`, values).then((res) => {
        // console.log("res :: ", res);
        alert('등록되었습니다.');
        resetForm();
        navigate('/board');
      });
    } catch (error) {
      // 서버에서 전달된 에러 메시지 처리
      const errorMessage = error.response?.data?.message || '등록 중 오류가 발생했습니다.';
      alert(errorMessage);
    }
  };

  const backToList = () => {
    navigate('/board');
  };

  return (
    <form onSubmit={saveBoard}>
      <div>
        <span>제목</span>: &nbsp;
        <input
          type="text"
          name="postTitle"
          value={postTitle}
          onChange={handleChange}
          ref={postTitleRef}
        />
      </div>
      <br />
      <div>
        <span>작성자</span>: &nbsp;
        <input
          type="text"
          name="postAuthorName"
          value={postAuthorName}
          onChange={handleChange}
          ref={postAuthorNameRef}
          readOnly={!!username}
          disabled={!!username}
        />
      </div>
      <br />
      <div>
        <span>내용</span>
        <br />
        <textarea
          name="postContents"
          cols="30"
          rows="10"
          value={postContents}
          onChange={handleChange}
          ref={postContentsRef}
        />
      </div>
      <br />
      <div>
        <span>비밀번호</span>: &nbsp;
        <input
          type="password"
          name="postPwd"
          value={postPwd}
          onChange={handleChange}
          ref={postPwdRef}
        />
      </div>
      <br />
      <div>
        <Button
          type="submit"
          variant="primary"
          size="small"
          disabled={!isFormValid()}
        >
          저장
        </Button>&nbsp;
        <Button
          type="button"
          onClick={backToList}
          variant="secondary"
          size="small"
        >
          취소
        </Button>
      </div>
    </form>
  );
};

export default BoardWrite;