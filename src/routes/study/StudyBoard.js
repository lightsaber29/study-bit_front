import React, { useEffect, useState } from 'react';

const StudyBoard = () => {
  const [posts, setPosts] = useState([]);
  // const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
    <div className="max-w-3xl mx-auto p-4 pb-16">
      {/* 햄버거 메뉴 버튼 - 위치 조정 */}
      {/* <div className="flex items-center justify-between mb-6">
        <button 
          className="p-2 hover:bg-gray-100 rounded-lg"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h1 className="text-xl font-bold">스터디</h1>
        <div className="w-8"></div>
      </div> */}

      {/* 사이드바 */}
      {/* <div className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-4">
          <div className="flex justify-end">
            <button onClick={() => setIsSidebarOpen(false)}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className="mt-8">
            <ul className="space-y-4">
              <li><a href="#" className="block hover:text-gray-600">메뉴 1</a></li>
              <li><a href="#" className="block hover:text-gray-600">메뉴 2</a></li>
              <li><a href="#" className="block hover:text-gray-600">메뉴 3</a></li>
            </ul>
          </nav>
        </div>
      </div> */}

      {/* 상단 검색바 */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="글 내용, #태그, @작성자 검색"
            className="w-full p-3 border rounded-lg"
          />
        </div>
        <button className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 whitespace-nowrap">
          검색
        </button>
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
    </div>
  );
};

export default StudyBoard; 