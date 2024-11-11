import React from 'react';

const Card = ({
  title,
  memberCount,
  photoUrl
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="bg-gray-300 h-32 rounded-lg mb-4">
        <img src={photoUrl} alt="photoUrl" className="w-full h-full object-cover rounded-t-lg" />
      </div>
      <h3 className="text-md font-semibold">{title}</h3>
      <div className="text-sm text-gray-600">{memberCount} / 16</div>
      {/* <div className="text-sm text-gray-500">공무원 자율 스터디 1</div> */}
    </div>
  );
};

export default Card;