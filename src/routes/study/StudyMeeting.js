import React, { useState } from 'react';

const StudyMeeting = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openMeetingId, setOpenMeetingId] = useState(null);

  // 예시 회의록 데이터
  const meetings = [
    {
      id: 1,
      date: '2024-03-20',
      title: '프로젝트 킥오프 미팅',
      content: '1. 프로젝트 목표 설정\n2. 역할 분담\n3. 다음 주 일정 논의\n\n결정사항:\n- 주 2회 정기 미팅 진행\n- GitHub 레포지토리 설정'
    },
    {
      id: 2,
      date: '2024-03-17',
      title: 'API 설계 회의',
      content: '1. REST API 구조 검토\n2. 데이터베이스 스키마 설계\n3. 보안 관련 논의\n\n다음 단계:\n- API 문서화\n- 테스트 계획 수립'
    },
    {
      id: 3,
      date: '2024-03-15',
      title: 'UI/UX 리뷰',
      content: '1. 메인 페이지 디자인 검토\n2. 사용자 피드백 분석\n3. 개선사항 도출\n\n개선 필요 사항:\n- 모바일 반응형 레이아웃\n- 로딩 상태 표시'
    }
  ];

  const toggleMeeting = (id) => {
    setOpenMeetingId(openMeetingId === id ? null : id);
  };

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
        컨텐츠
      </div> */}

      {/* 본문 작성 섹션 */}

      {/* 회의록 섹션 */}
      <div className="space-y-4">
        {meetings.map((meeting) => (
          <div key={meeting.id} className="border rounded-lg overflow-hidden">
            <button
              className="w-full p-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100"
              onClick={() => toggleMeeting(meeting.id)}
            >
              <div className="flex items-center gap-4">
                <span className="text-gray-500">{meeting.date}</span>
                <span className="font-medium">{meeting.title}</span>
              </div>
              <svg
                className={`w-5 h-5 transform transition-transform ${
                  openMeetingId === meeting.id ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openMeetingId === meeting.id && (
              <div className="p-4 bg-white whitespace-pre-line">
                {meeting.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudyMeeting; 