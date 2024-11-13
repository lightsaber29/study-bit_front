import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const profileData = {
    photoUrl: '/images/profile-default.png',
    nickname: '최수빈',
    email: 'lightsaber2929@gmail.com',
    joinDate: '2024년 11월 16일'
  };

  const menuItems = [
    { label: '내 프로필', onClick: () => navigate('/profile') },
    // { label: '내 아이템', onClick: () => navigate('/items') },
    // { label: '결제 및 구독내역', onClick: () => navigate('/payments') },
    // { label: '내 쿠폰', onClick: () => navigate('/coupons') }
  ];

  return (
    <div className="fixed top-14 right-4 z-50 w-80 bg-white rounded-lg shadow-lg">
      {/* 프로필 정보 */}
      <div className="p-4 border-b">
        <div className="flex items-center gap-3">
          <img
            src={profileData.photoUrl}
            alt="profile"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h3 className="font-semibold">{profileData.nickname}</h3>
            <p className="text-sm text-gray-500">{profileData.email}</p>
          </div>
        </div>
        {/* <div className="mt-2 text-sm text-gray-500">
          <span>등급 ~ {profileData.joinDate}</span>
        </div> */}
      </div>

      {/* 프리미엄 회원 정보 */}
      {/* <div className="p-4 border-b">
        <div className="flex justify-between items-center">
          <span>프리미엄 회원</span>
          <button className="text-blue-500 hover:underline">
            이용권 구매
          </button>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-blue-500">0</span>
          <span>구글</span>
          <span className="text-blue-500">충전</span>
        </div>
      </div> */}

      {/* 메뉴 항목들 */}
      <div className="py-2">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={item.onClick}
            className="w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors"
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* 로그아웃 */}
      <div className="p-2 border-t">
        <button 
          onClick={() => {
            // 로그아웃 처리
            console.log('로그아웃');
            onClose();
          }}
          className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default ProfileModal; 