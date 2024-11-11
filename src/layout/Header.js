import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import Button from '../components/Button';

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const location = useLocation();
  
  const showNavPaths = ['/posts', '/meetings', '/resources', '/schedule'];
  const shouldShowNav = showNavPaths.includes(location.pathname);

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  return (
    <div className="flex flex-col border-b shadow-sm">
      <div className="h-14 flex items-center p-4 bg-white">
        <Link to='' className="text-2xl font-bold text-gray-800">
          Study-bbit🐰
        </Link>
        
        <div className="flex-1 mx-5">
          {showSearch && (
            <input
              type="text"
              placeholder="밴드, 페이지, 게시글 검색"
              className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-md"
            />
          )}
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="default" onClick={toggleSearch}>찾기</Button>
          <Button variant="primary" className="text-white-700">스터디 만들기</Button>
          <Button variant="secondary" className="text-white-700">공지사항</Button>
          <Button variant="secondary" className="text-white-700">질문하기</Button>
          <Button variant="primary" className="text-white-700">로그인</Button>
          <Button variant="primary" className="text-white-700">프로필</Button>
        </div>
      </div>
      
      {shouldShowNav && (
        <nav className="flex justify-center space-x-8 px-4 py-3 bg-emerald-400">
          <Link to='/' className="text-white font-medium">홈</Link>
          <Link to='/posts' className="text-white font-medium">게시글</Link>
          <Link to='/meetings' className="text-white font-medium">회의록</Link>
          <Link to='/resources' className="text-white font-medium">자료실</Link>
          <Link to='/schedule' className="text-white font-medium">일정</Link>
        </nav>
      )}
    </div>
  );
};

export default Header;