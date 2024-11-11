import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import Board from "../../../components/sample/Board";

const BoardDetail = () => {
  const { postId } = useParams();
  const [board, setBoard] = useState(null);
  const [loading, setLoading] = useState(true);
  const getBoard = async () => {
    const res = await axios.get(`/api/board/${postId}`);
    // console.log("res :: ", res);
    setBoard(res.data);
    setLoading(false);
  }

  useEffect(() => {
    getBoard();
  }, []);

  return (
    <div>
      {loading ? (
        <h2>loading...</h2>
      ) : (
        <Board 
          postId={board.postId}
          postTitle={board.postTitle}
          postContents={board.postContents}
          postAuthorName={board.postAuthorName}
        />
      )}
    </div>
  );
};

export default BoardDetail;