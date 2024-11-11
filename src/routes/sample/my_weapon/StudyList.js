import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StudyList = () => {
  const navigate = useNavigate();
  
  const [studies, setStudies] = useState([
    {
      id: 1,
      title: "알고리즘 스터디",
      members: 4,
      currentStatus: "진행중",
      nextMeeting: "2024-03-20",
      description: "매주 알고리즘 문제를 함께 풀어보는 스터디입니다."
    },
    {
      id: 2,
      title: "리액트 심화 학습",
      members: 6,
      currentStatus: "모집중",
      nextMeeting: "2024-03-22",
      description: "리액트 고급 기능과 최적화를 학습합니다."
    }
  ]);

  const handleStudyClick = (studyId) => {
    // navigate(`/weapon/lecture/${studyId}`);
    navigate(`/weapon/lecture`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">나의 스터디 목록</h1>
        
        <div className="grid gap-6">
          {studies.map(study => (
            <div 
              key={study.id} 
              className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleStudyClick(study.id)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold mb-2">{study.title}</h2>
                  <p className="text-gray-600 mb-4">{study.description}</p>
                  <div className="flex gap-4 text-sm text-gray-500">
                    <span>👥 {study.members}명</span>
                    <span>📅 다음 모임: {study.nextMeeting}</span>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  study.currentStatus === "진행중" 
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}>
                  {study.currentStatus}
                </span>
              </div>
            </div>
          ))}
        </div>

        <button 
          className="fixed bottom-8 right-8 bg-purple-600 text-white rounded-full p-4 shadow-lg hover:bg-purple-700 transition-colors"
          onClick={() => alert('새 스터디 만들기')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default StudyList;
