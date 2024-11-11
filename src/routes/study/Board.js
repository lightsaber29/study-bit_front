import React, { useEffect, useState } from 'react';

const Board = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts([
      {
        id: 1,
        author: '최수빈',
        time: '7시간 전',
        title: '테스트',
        date: '2024년 11월 11일 오후 2:46',
        type: 'notice',
      },
      {
        id: 2,
        author: '최수빈',
        time: '7시간 전',
        title: '테스트 투표',
        participantCount: 0,
        type: 'poll',
      },
    ]);
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* 상단 검색바 */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="글 내용, #태그, @작성자 검색"
          className="w-full p-3 border rounded-lg"
        />
      </div>

      {/* 새 게시글 작성 섹션 */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <p className="text-gray-500 mb-4">새로운 소식을 남겨보세요.</p>
        <div className="flex space-x-4">
          <button className="p-2"><span role="img" aria-label="image">🖼️</span></button>
          <button className="p-2"><span role="img" aria-label="emoji">😊</span></button>
          <button className="p-2">▶️</button>
          <button className="p-2">LIVE</button>
          <button className="p-2">📋</button>
          <button className="p-2">🔗</button>
          <button className="p-2">📅</button>
          <button className="p-2">✅</button>
          <button className="p-2">👤</button>
          <button className="p-2">❓</button>
          <button className="p-2">📝</button>
          <button className="p-2">⋮</button>
        </div>
      </div>

      {/* 게시글 목록 */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <h2 className="font-semibold">공지사항</h2>
        </div>
        
        {posts.map((post) => (
          <div key={post.id} className="p-4 border-b">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                <div>
                  <div className="font-semibold">{post.author}</div>
                  <div className="text-gray-500 text-sm">{post.time}</div>
                </div>
              </div>
              <button className="text-gray-400">⋮</button>
            </div>
            <div className="mb-2">
              {post.type === 'notice' && (
                <span className="text-orange-500">[중요] </span>
              )}
              {post.title}
            </div>
            {post.date && (
              <div className="text-gray-500 text-sm">{post.date}</div>
            )}
          </div>
        ))}
      </div>

      {/* 하단 액션 버튼 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="flex justify-around p-4">
          <button className="flex items-center">
            <span role="img" aria-label="emoji">😊</span>
            <span className="ml-2">표정짓기</span>
          </button>
          <button className="flex items-center">
            <span role="img" aria-label="comment">💬</span>
            <span className="ml-2">댓글쓰기</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Board; 