import React, { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

// 네비게이션 항목 정의
const NAV_ITEMS = [
  { path: '', label: '홈' },
  { path: '/board', label: '게시글' },
  { path: '/meeting', label: '회의록' },
  { path: '/files', label: '자료실' },
  { path: '/schedule', label: '일정' },
  { path: '/setting', label: '설정' }
];

// 네비게이션 링크 스타일 유틸리티
const getNavLinkStyles = (currentPath, targetPath) => {
  const baseStyles = "text-white font-medium relative px-3 py-1 transition-colors hover:text-emerald-100";
  const activeStyles = "after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-white";
  
  return `${baseStyles} ${currentPath === targetPath ? activeStyles : ''}`;
};

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  // URL에서 roomId 추출 (study/2 형식일 때)
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const roomId = pathSegments[0] === 'study' ? pathSegments[1] : null;
  
  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const shouldShowNav = location.pathname.startsWith('/study');
  
  useEffect(() => {
    console.log('Current roomId:', roomId);
  }, [roomId]);

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
          <Button variant="primary" className="text-white-700" onClick={() => navigate('/login')}>로그인</Button>
          <Button variant="primary" className="text-white-700">프로필</Button>
        </div>
      </div>
      
      {shouldShowNav && roomId && (
        <nav className="flex justify-center space-x-8 px-4 py-3 bg-emerald-400">
          {NAV_ITEMS.map(({ path, label }) => (
            <Link
              key={path}
              to={`/study/${roomId}${path}`}
              className={getNavLinkStyles(
                location.pathname,
                `/study/${roomId}${path}`
              )}
            >
              {label}
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
};

export default Header;