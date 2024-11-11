import React from 'react';
// import { Link } from 'react-router-dom';

const MyStudyCard = ({
  title,
  isEmpty,
  photoUrl
}) => {
  return (
    <>
      {isEmpty ? (
        <div className="w-full bg-gray-400 h-60 rounded-lg flex items-center justify-center text-gray-700 text-center p-4">
          내가 만든 스터디 또는 초대 받은 스터디가 등록됩니다.
        </div>
      ) : (
        <div className="w-full bg-gray-200 h-60 rounded-lg">
          <div className="h-2/3 overflow-hidden">
            <img src={photoUrl} alt="photoUrl" className="w-full h-full object-cover rounded-t-lg" />
          </div>
          <div className="h-1/3 p-4">
            <h3 className="text-sm font-medium">{title}</h3>
          </div>
        </div>
      )}
    </>
  );
};

export default MyStudyCard;