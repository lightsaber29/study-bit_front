import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '../Button';
import { useSelector } from 'react-redux';

const Board = ({ postId, postTitle, postContents, postAuthorName }) => {
  const navigate = useNavigate();

  const token = useSelector((state) => state.auth?.token);

  const moveToUpdate = () => {
    navigate(`/update/${postId}`);
  }

  const deleteBoard = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      const password = window.prompt('게시글 비밀번호를 입력하세요:');
      
      if (password) {
        try {
          axios.delete(
            `/api/board/${postId}`,
            { data: { postPwd: password }},
            { headers: { Authorization: token } }
          ).then((res) => {
            // console.log("res :: ", res);
            alert('삭제되었습니다.');
            navigate('/board');
          }).catch((error) => {
            const errorMessage = error.response?.data?.message || '삭제 중 오류가 발생했습니다.';
            alert(errorMessage);
          });
        } catch (error) {
          const errorMessage = error.response?.data?.message || '삭제 중 오류가 발생했습니다.';
          alert(errorMessage);
        }
      } else {
        alert('비밀번호를 입력하세요.');
      }
    }
  }

  const moveToList = () => {
    navigate('/board');
  }

  return (
    <div>
      <div> 
        <h2>{postTitle}</h2>
        <h5>{postAuthorName}</h5>
        <hr />
        <p>{postContents}</p>
      </div>
      <div>
        <Button onClick={moveToUpdate} variant="primary" size="small">수정</Button>&nbsp;
        <Button onClick={deleteBoard} variant="danger" size="small">삭제</Button>&nbsp;
        <Button onClick={moveToList} variant="secondary" size="small">목록</Button>
      </div>
    </div>
  );
};

export default Board;