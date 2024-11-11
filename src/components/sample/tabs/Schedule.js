import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { format } from 'date-fns';
import 'react-calendar/dist/Calendar.css';

const Schedule = () => {
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [newSchedule, setNewSchedule] = useState({
    title: '',
    date: '',
    startTime: '',
    endTime: '',
    participants: [],
    description: ''
  });

  // 예시 일정 데이터
  const [scheduleList, setScheduleList] = useState([
    {
      id: 1,
      title: "주간 프로젝트 회의",
      date: "2024-03-25",
      startTime: "14:00",
      endTime: "15:30",
      participants: ["김철수", "이영희", "박지민", "정민수"],
      description: "프로젝트 진행 상황 점검 및 다음 주 계획 수립",
      status: "upcoming"
    },
    // ... 기존 일정 데이터
  ]);

  // 선택된 날짜의 일정 필터링
  const getSchedulesForDate = (date) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    return scheduleList.filter(schedule => schedule.date === formattedDate);
  };

  // 달력에 일정 표시를 위한 타일 컨텐츠 설정
  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const schedulesForDate = getSchedulesForDate(date);
      if (schedulesForDate.length > 0) {
        return (
          <div className="dot-container">
            {schedulesForDate.map((_, index) => (
              <div
                key={index}
                className="h-1 w-1 bg-purple-500 rounded-full mx-auto mt-1"
              />
            ))}
          </div>
        );
      }
    }
    return null;
  };

  return (
    <div className="p-4 h-full flex gap-4">
      {/* 달력 영역 */}
      <div className="w-1/2">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            tileContent={tileContent}
            className="w-full border-none"
          />
        </div>
      </div>

      {/* 일정 목록 영역 */}
      <div className="w-1/2 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {format(selectedDate, 'yyyy년 MM월 dd일')} 일정
          </h2>
          <button 
            onClick={() => setIsScheduleModalOpen(true)}
            className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 flex items-center gap-2"
          >
            <span>+</span>
            <span>일정 추가</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4">
          {getSchedulesForDate(selectedDate).map((schedule) => (
            <div 
              key={schedule.id} 
              className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-medium text-lg">{schedule.title}</h3>
                  <p className="text-purple-600">
                    {schedule.startTime} - {schedule.endTime}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="text-gray-500 hover:text-gray-700">✏️</button>
                  <button className="text-gray-500 hover:text-gray-700">🗑️</button>
                </div>
              </div>
              
              <p className="text-gray-600 mb-3">{schedule.description}</p>
              
              <div className="flex flex-wrap gap-2">
                {schedule.participants.map((participant, index) => (
                  <span 
                    key={index}
                    className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-sm"
                  >
                    {participant}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 일정 추가 모달은 기존 코드 유지 */}
      {isScheduleModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          {/* 기존 모달 내용 */}
        </div>
      )}
    </div>
  );
};

export default Schedule;