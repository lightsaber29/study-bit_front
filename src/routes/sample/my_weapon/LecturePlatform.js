import React, { useState, useEffect, useRef } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './LecturePlatform.css';
import MDEditor from '@uiw/react-md-editor';

const LecturePlatform = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('VIDEO_CHAT');
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);

  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calendarView, setCalendarView] = useState('month');
  const [newSchedule, setNewSchedule] = useState({
    title: '',
    date: '',
    startTime: '',
    endTime: '',
    participants: [],
    description: ''
  });

  const navigationItems = [
    { id: 1, text: 'VIDEO_CHAT', icon: '🎥' },
    // { id: 2, text: 'MINUTES', icon: '📝' },
    { id: 3, text: 'DOCUMENTS', icon: '📄' },
    { id: 4, text: 'SCHEDULE', icon: '📅' }
  ];

  const studyRooms = [
    { id: 1, title: 'CSAPP 공부하기', participants: 8 },
    { id: 2, title: 'OSTEP 이 뭔가요', participants: 5 },
    { id: 3, title: 'React deep dive', participants: 12 },
  ];

  const participants = [
    { 
      id: 1, 
      name: "김철수",
      stream: true,
      isCameraOn: true,
      isMicOn: true 
    },
    { 
      id: 2, 
      name: "이영희",
      stream: true,
      isCameraOn: true,
      isMicOn: false 
    },
    { 
      id: 3, 
      name: "박지민",
      stream: true,
      isCameraOn: false,
      isMicOn: true 
    },
    { 
      id: 4, 
      name: "정민수",
      stream: true,
      isCameraOn: true,
      isMicOn: true 
    },
    { id: 5, name: "한소희", image: "profile5.jpg" },
    { id: 6, name: "강동원", image: "profile6.jpg" },
  ];

  const scheduleList = [
    {
      id: 1,
      title: "주간 프로젝트 회의",
      date: "2024.03.25",
      startTime: "14:00",
      endTime: "15:30",
      participants: ["김철수", "이영희", "박지민", "정민수"],
      description: "프로젝트 진행 상황 점검 및 다음 주 계획 수립",
      status: "upcoming" // upcoming, ongoing, completed
    },
    {
      id: 2,
      title: "API 설계 리뷰",
      date: "2024.03.27",
      startTime: "10:00",
      endTime: "11:30",
      participants: ["박지민", "정민수"],
      description: "백엔드 API 설계 검토 및 프론트엔드 연동 방안 논의",
      status: "upcoming"
    },
    {
      id: 3,
      title: "UI/UX 피드백 미팅",
      date: "2024.03.28",
      startTime: "15:00",
      endTime: "16:00",
      participants: ["김철수", "이영희"],
      description: "현재까지 개발된 UI 검토 및 사용성 개선 논의",
      status: "upcoming"
    }
  ];


  const containerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const [openMinutesId, setOpenMinutesId] = useState(null);

  const minutesList = [
    {
      id: 1,
      title: "프로젝트 킥오프 미팅",
      date: "2024.03.19",
      time: "14:00 - 15:30",
      participants: ["김철수", "이영희", "박지민", "정민수"],
      scripts: [
        { time: "14:00", speaker: "김철수", content: "안녕하세요. 오늘 프로젝트 킥오프 미팅을 시작하겠습니다..." },
        { time: "14:05", speaker: "이영희", content: "네, 저는 프론트엔드 파트를 맡아서 진행하고 있습니다..." },
        { time: "14:10", speaker: "박지민", content: "백엔드는 제가 담당하겠습니다..." },
        { time: "14:15", speaker: "정민수", content: "DevOps 부분은 제가 맡아서 진행하겠습니다..." },
        { time: "14:20", speaker: "김철수", content: "좋습니다. 그러면 각자 맡은 파트에 대한..." }
      ],
      decisions: [
        "프론트엔드: React + Tailwind CSS 사용",
        "백엔드: Spring Boot + PostgreSQL 사용",
        "DevOps: Jenkins, Docker, Kubernetes 도입",
        "다음 미팅: 3월 26일 14:00",
        "각자 파트별 상세 기획안 준비"
      ]
    },
    {
      id: 2,
      title: "프로젝트 기획안 리뷰",
      date: "2024.03.26",
      time: "14:00 - 15:00",
      participants: ["김철수", "이영희", "박지민", "정민수"],
      scripts: [
        { time: "14:00", speaker: "김철수", content: "지난 주 요청드린 기획안 리뷰를 시작하겠습니다..." },
        // ... more scripts
      ],
      decisions: [
        "UI/UX 디자인 방향 확정",
        "API 설계 문서 작성 필요",
        "다음 주까지 프로토타입 개발"
      ]
    },
    // ... more minutes
  ];

  const documentsList = [
    {
      id: 1,
      category: "기획",
      files: [
        {
          id: 101,
          name: "프로젝트_기획안_v1.pdf",
          type: "pdf",
          size: "2.4 MB",
          uploadedBy: "김철수",
          uploadedAt: "2024.03.19",
          lastModified: "2024.03.19"
        },
        {
          id: 102,
          name: "요구사항_명세서.docx",
          type: "word",
          size: "1.8 MB",
          uploadedBy: "이영희",
          uploadedAt: "2024.03.20",
          lastModified: "2024.03.21"
        }
      ]
    },
    {
      id: 2,
      category: "디자인",
      files: [
        {
          id: 201,
          name: "UI_디자인_가이드.fig",
          type: "figma",
          size: "4.2 MB",
          uploadedBy: "박지민",
          uploadedAt: "2024.03.21",
          lastModified: "2024.03.21"
        }
      ]
    },
    {
      id: 3,
      category: "개발",
      files: [
        {
          id: 301,
          name: "API_문서.md",
          type: "markdown",
          size: "156 KB",
          uploadedBy: "정민수",
          uploadedAt: "2024.03.22",
          lastModified: "2024.03.22"
        },
        {
          id: 302,
          name: "데이터베이스_스키마.sql",
          type: "sql",
          size: "89 KB",
          uploadedBy: "지민",
          uploadedAt: "2024.03.22",
          lastModified: "2024.03.22"
        }
      ]
    }
  ];

  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf': return '📄';
      case 'word': return '📝';
      case 'figma': return '🎨';
      case 'markdown': return '📑';
      case 'sql': return '💾';
      default: return '📄';
    }
  };

  // 스크롤 가능 여부 체크
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const checkScroll = () => {
        setShowLeftArrow(container.scrollLeft > 0);
        setShowRightArrow(
          container.scrollLeft < container.scrollWidth - container.clientWidth
        );
      };

      checkScroll();
      container.addEventListener('scroll', checkScroll);
      return () => container.removeEventListener('scroll', checkScroll);
    }
  }, [participants]);

  const scroll = (direction) => {
    const container = containerRef.current;
    if (container) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const [isMarkdownModalOpen, setIsMarkdownModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [markdownContent, setMarkdownContent] = useState('');

  // 마크다운 파일 클릭 핸들러
  const handleFileClick = (file) => {
    if (file.type === 'markdown') {
      setSelectedFile(file);
      // 실제로는 API에서 파일 내용을 가져와야 합니다
      setMarkdownContent(`# ${file.name}\n\n여기에 마크다운 내용이 들어갑니다.`);
      setIsMarkdownModalOpen(true);
    }
  };

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadFiles, setUploadFiles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const fileInputRef = useRef(null);

  // 파일 업로드 처리 함수
  const handleFileUpload = async () => {
    try {
      if (uploadFiles.length === 0) {
        alert('업로드할 파일을 선택해주세요.');
        return;
      }
      if (!selectedCategory) {
        alert('카테고리를 선택해주세요.');
        return;
      }

      // 실제 API 호출을 시뮬레이션
      // const formData = new FormData();
      // uploadFiles.forEach(file => formData.append('files', file));
      // formData.append('category', selectedCategory);

      // const response = await fetch('/api/documents/upload', {
      //   method: 'POST',
      //   body: formData
      // });

      // 업로드 성공 시뮬레이션
      const newFiles = uploadFiles.map(file => ({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: file.name.split('.').pop().toLowerCase(),
        size: `${(file.size / 1024).toFixed(1)} KB`,
        uploadedBy: "현재 사용자",
        uploadedAt: new Date().toLocaleDateString(),
        lastModified: new Date().toLocaleDateString()
      }));

      // documentsList 상태 업데이트
      const updatedDocumentsList = documentsList.map(category => {
        if (category.category === selectedCategory) {
          return {
            ...category,
            files: [...category.files, ...newFiles]
          };
        }
        return category;
      });

      // setDocumentsList(updatedDocumentsList);
      setUploadFiles([]);
      setSelectedCategory('');
      setIsUploadModalOpen(false);
      alert('파일이 성공적으로 업로드되었습니다.');

    } catch (error) {
      console.error('업로드 중 오류 발생:', error);
      alert('파일 업로드 중 오류가 발생했습니다.');
    }
  };

  // 드래그 앤 드롭 핸들러
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const files = Array.from(e.dataTransfer.files);
    setUploadFiles(prev => [...prev, ...files]);
  };

  // 파일 선택 핸들러
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setUploadFiles(prev => [...prev, ...files]);
  };

  // 선택된 파일 제거
  const removeFile = (index) => {
    setUploadFiles(prev => prev.filter((_, i) => i !== index));
  };

  // 업로드 모달 컴포넌트
  const renderUploadModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[600px] max-h-[80vh] flex flex-col">
        {/* 모달 헤더 */}
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-medium">파일 업로드</h3>
          <button 
            onClick={() => setIsUploadModalOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {/* 모달 컨텐츠 */}
        <div className="p-4 flex-1 overflow-y-auto">
          {/* 카테고리 선택 */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              카테고리
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">카테고리 선택</option>
              {documentsList.map(category => (
                <option key={category.id} value={category.category}>
                  {category.category}
                </option>
              ))}
            </select>
          </div>

          {/* 파일 드래그 앤 드롭 영역 */}
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-purple-500 transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              multiple
              className="hidden"
            />
            <div className="text-gray-500">
              <p>파일을 드래그하여 놓거나 클릭하여 선택하세요</p>
              <p className="text-sm mt-2">지원 형식: PDF, Word, Markdown, 등</p>
            </div>
          </div>

          {/* 선택된 파일 목록 */}
          {uploadFiles.length > 0 && (
            <div className="mt-4">
              <h4 className="font-medium mb-2">선택된 파일</h4>
              <div className="space-y-2">
                {uploadFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                    <span className="truncate">{file.name}</span>
                    <button
                      onClick={() => removeFile(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 모달 푸터 */}
        <div className="p-4 border-t flex justify-end gap-2">
          <button
            onClick={() => setIsUploadModalOpen(false)}
            className="px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            취소
          </button>
          <button
            onClick={handleFileUpload}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
          >
            업로드
          </button>
        </div>
      </div>
    </div>
  );

  const renderDocuments = () => (
    <div className="p-4 h-full flex flex-col">
      {/* 헤더 영역 */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">문서</h2>
        <button 
          onClick={() => setIsUploadModalOpen(true)}
          className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 flex items-center gap-2"
        >
          <span>+</span>
          <span>파일 업로드</span>
        </button>
      </div>

      {/* 검색 및 필터 영역 */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="파일 검색..."
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
          <option value="">모든 카테고리</option>
          <option value="기획">기획</option>
          <option value="디자인">디자인</option>
          <option value="개발">개발</option>
        </select>
      </div>

      {/* 문서 목록 */}
      <div className="flex-1 overflow-y-auto">
        {documentsList.map((category) => (
          <div key={category.id} className="mb-6">
            <h3 className="text-lg font-medium mb-3">{category.category}</h3>
            <div className="bg-white rounded-lg border">
              {category.files.map((file, index) => (
                <div 
                  key={file.id} 
                  className={`
                    p-4 flex items-center gap-4 hover:bg-gray-50 cursor-pointer
                    ${index !== category.files.length - 1 ? 'border-b' : ''}
                  `}
                  onClick={() => handleFileClick(file)}
                >
                  {/* 파일 아이콘 */}
                  <div className="text-2xl">
                    {getFileIcon(file.type)}
                  </div>

                  {/* 파일 정보 */}
                  <div className="flex-1">
                    <div className="font-medium">{file.name}</div>
                    <div className="text-sm text-gray-500 flex gap-4">
                      <span>{file.size}</span>
                      <span>•</span>
                      <span>수정: {file.lastModified}</span>
                      <span>•</span>
                      <span>업로더: {file.uploadedBy}</span>
                    </div>
                  </div>

                  {/* 작업 버튼 */}
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg" title="다운로드">
                      ⬇️
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg" title="더보기">
                      ⋮
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 마크다운 에디터 모달 */}
      {isMarkdownModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-[90vw] h-[90vh] flex flex-col">
            {/* 모달 헤더 */}
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-medium">
                {selectedFile?.name}
              </h3>
              <div className="flex gap-2">
                <button 
                  onClick={handleSaveMarkdown}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors flex items-center gap-2"
                >
                  <span>💾</span>
                  <span>저장</span>
                </button>
                <button 
                  onClick={() => {
                    const confirmed = window.confirm('저장하지 않은 변경사항이 있다면 사라집니다. 닫으시겠습니까?');
                    if (confirmed) {
                      setIsMarkdownModalOpen(false);
                    }
                  }}
                  className="text-gray-500 hover:text-gray-700 px-2"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* 에디터 영역 */}
            <div className="flex-1 overflow-hidden">
              <MDEditor
                value={markdownContent}
                onChange={setMarkdownContent}
                height="100%"
                preview="live"
                hideToolbar={false}
                enableScroll={true}
              />
            </div>
          </div>
        </div>
      )}

      {/* 업로드 모달 */}
      {isUploadModalOpen && renderUploadModal()}
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'VIDEO_CHAT':
        return (
          <div className="p-4 h-full flex flex-col">
            {/* 참여자 영역 */}
            <div className="relative h-40 mb-4">
              {/* 왼쪽 화살표 */}
              {showLeftArrow && (
                <button 
                  onClick={() => scroll('left')}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
                >
                  ←
                </button>
              )}

              {/* 참여자 비디오 목록 */}
              <div 
                ref={containerRef}
                className="flex gap-4 overflow-x-auto scrollbar-hide px-2 py-1"
                style={{ scrollBehavior: 'smooth' }}
              >
                {participants.map(participant => (
                  <div 
                    key={participant.id}
                    className="relative flex-shrink-0"
                  >
                    {/* 비디오 컨테이너 */}
                    <div className="w-32 h-32 rounded-lg bg-gray-800 overflow-hidden">
                      {participant.isCameraOn ? (
                        <div className="w-full h-full bg-gray-700">
                          <img 
                            src={`https://picsum.photos/200/200?random=${participant.id}`} 
                            alt={participant.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-700 text-white">
                          <span className="text-2xl">{participant.name[0]}</span>
                        </div>
                      )}
                    </div>

                    {/* 참여자 이름과 상태 아이콘 */}
                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between bg-black bg-opacity-50 rounded px-2 py-1">
                      <span className="text-white text-sm truncate">
                        {participant.name}
                      </span>
                      <div className="flex gap-1">
                        {!participant.isMicOn && (
                          <span className="text-xs">🔇</span>
                        )}
                        {!participant.isCameraOn && (
                          <span className="text-xs">🚫</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* 오른쪽 화살표 */}
              {showRightArrow && (
                <button 
                  onClick={() => scroll('right')}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
                >
                  →
                </button>
              )}
            </div>

            {/* 공유 화면 영역 */}
            <div className="flex-1 bg-gray-800 rounded-lg flex items-center justify-center text-white mb-4">
              공유중인 화면
            </div>

            {/* 기능 버튼 영역 */}
            <div className="flex justify-center gap-4">
              <button 
                onClick={() => setIsCameraOn(!isCameraOn)}
                className={`p-4 rounded-full ${
                  isCameraOn ? 'bg-purple-500 text-white' : 'bg-gray-300'
                }`}
              >
                {isCameraOn ? '📹' : '🚫'}
              </button>
              <button 
                onClick={() => setIsMicOn(!isMicOn)}
                className={`p-4 rounded-full ${
                  isMicOn ? 'bg-purple-500 text-white' : 'bg-gray-300'
                }`}
              >
                {isMicOn ? '🎤' : '🔇'}
              </button>
            </div>

            {/* 회의록 섹션 추가 */}
            <div className="border-t">
              <div className="p-4">
                <h2 className="text-xl font-bold mb-4">회의록</h2>
                <div className="space-y-4">
                  {minutesList.map((minutes) => (
                    <div key={minutes.id} className="border rounded-lg overflow-hidden">
                      {/* 회의록 헤더 */}
                      <div
                        className={`p-4 cursor-pointer hover:bg-gray-50 flex justify-between items-center
                          ${openMinutesId === minutes.id ? 'bg-purple-50' : 'bg-white'}`}
                        onClick={() => setOpenMinutesId(openMinutesId === minutes.id ? null : minutes.id)}
                      >
                        <div className="flex items-center gap-4">
                          <span className={`transform transition-transform ${
                            openMinutesId === minutes.id ? 'rotate-90' : ''
                          }`}>▶</span>
                          <div>
                            <h3 className="font-medium">{minutes.title}</h3>
                            <p className="text-sm text-gray-500">
                              {minutes.date} {minutes.time}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {minutes.participants.slice(0, 3).map((participant, index) => (
                            <span key={index} className="text-sm bg-purple-100 px-2 py-1 rounded">
                              {participant}
                            </span>
                          ))}
                          {minutes.participants.length > 3 && (
                            <span className="text-sm bg-purple-100 px-2 py-1 rounded">
                              +{minutes.participants.length - 3}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* 회의록 상세 내용 */}
                      {openMinutesId === minutes.id && (
                        <div className="border-t p-4">
                          <div className="space-y-4 mb-6">
                            {minutes.scripts.map((script, index) => (
                              <div key={index} className="border-l-2 border-purple-300 pl-4">
                                <div className="text-sm text-purple-600 mb-1">{script.time}</div>
                                <div className="flex items-start gap-2">
                                  <div className="font-medium">{script.speaker}:</div>
                                  <div className="text-gray-700">{script.content}</div>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="bg-purple-50 p-4 rounded-lg">
                            <h3 className="font-medium mb-2">📌 주요 결정사항</h3>
                            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                              {minutes.decisions.map((decision, index) => (
                                <li key={index}>{decision}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 'DOCUMENTS':
        return renderDocuments();
      case 'SCHEDULE':
        return (
          <div className="p-4 h-full flex flex-col">
            {/* 헤더 영역 */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">일정</h2>
              <button 
                onClick={() => setIsScheduleModalOpen(true)}
                className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 flex items-center gap-2"
              >
                <span>+</span>
                <span>일정 추가</span>
              </button>
            </div>

            {/* 달력과 일정 목록을 나란히 배치 */}
            <div className="flex gap-6 flex-1">
              {/* 달력 영역 */}
              <div className="w-1/2">
                <Calendar
                  onChange={setSelectedDate}
                  value={selectedDate}
                  view={calendarView}
                  onViewChange={({ view }) => setCalendarView(view)}
                  formatDay={(locale, date) => date.getDate()}
                  formatShortWeekday={(locale, date) => ['일', '월', '화', '수', '목', '금', '토'][date.getDay()]}
                  tileContent={({ date }) => {
                    const dateStr = date.toISOString().split('T')[0].replace(/-/g, '.');
                    const events = scheduleList.filter(schedule => schedule.date === dateStr);
                    return events.length > 0 ? (
                      <div className="flex flex-col items-center">
                        <div className="h-1 w-1 bg-purple-500 rounded-full mt-1"></div>
                        {events.length > 1 && (
                          <div className="text-xs text-purple-500">+{events.length}</div>
                        )}
                      </div>
                    ) : null;
                  }}
                  tileClassName={({ date }) => {
                    const day = date.getDay();
                    return day === 6 ? 'saturday' : day === 0 ? 'sunday' : null;
                  }}
                  className="border rounded-lg p-4"
                />
                
                {/* 선택된 날짜의 일정 */}
                <div className="mt-4">
                  <h3 className="font-medium mb-2">
                    {selectedDate.toLocaleDateString()} 일정
                  </h3>
                  <div className="space-y-2">
                    {scheduleList
                      .filter(schedule => schedule.date === selectedDate.toISOString().split('T')[0].replace(/-/g, '.'))
                      .map(schedule => (
                        <div key={schedule.id} className="bg-purple-50 p-2 rounded">
                          <div className="font-medium">{schedule.title}</div>
                          <div className="text-sm text-gray-600">
                            {schedule.startTime} - {schedule.endTime}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              {/* 일정 목록 영역 */}
              <div className="w-1/2 overflow-y-auto space-y-4">
                {scheduleList.map((schedule) => (
                  <div 
                    key={schedule.id} 
                    className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-medium text-lg">{schedule.title}</h3>
                        <p className="text-purple-600">
                          {schedule.date} {schedule.startTime} - {schedule.endTime}
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

            {/* 일정 추가 모달 */}
            {isScheduleModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg w-[500px] max-h-[90vh] overflow-y-auto">
                  {/* 모달 헤더 */}
                  <div className="p-4 border-b flex justify-between items-center">
                    <h3 className="text-lg font-medium">새 일정 추가</h3>
                    <button 
                      onClick={() => setIsScheduleModalOpen(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      ✕
                    </button>
                  </div>

                  {/* 모달 컨텐츠 */}
                  <div className="p-4 space-y-4">
                    {/* 일정 제목 */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        일정 제목
                      </label>
                      <input
                        type="text"
                        value={newSchedule.title}
                        onChange={(e) => setNewSchedule({...newSchedule, title: e.target.value})}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="일정 제목을 입력하세요"
                      />
                    </div>

                    {/* 날짜 */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        날짜
                      </label>
                      <input
                        type="date"
                        value={newSchedule.date}
                        onChange={(e) => setNewSchedule({...newSchedule, date: e.target.value})}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>

                    {/* 시간 */}
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          시작 시간
                        </label>
                        <input
                          type="time"
                          value={newSchedule.startTime}
                          onChange={(e) => setNewSchedule({...newSchedule, startTime: e.target.value})}
                          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          종료 시간
                        </label>
                        <input
                          type="time"
                          value={newSchedule.endTime}
                          onChange={(e) => setNewSchedule({...newSchedule, endTime: e.target.value})}
                          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                    </div>

                    {/* 참석자 */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        참석자
                      </label>
                      <select
                        multiple
                        value={newSchedule.participants}
                        onChange={(e) => setNewSchedule({
                          ...newSchedule, 
                          participants: Array.from(e.target.selectedOptions, option => option.value)
                        })}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 h-24"
                      >
                        <option value="김철수">김철수</option>
                        <option value="이영희">이영희</option>
                        <option value="박지민">박지민</option>
                        <option value="정민수">정민수</option>
                      </select>
                    </div>

                    {/* 설명 */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        설명
                      </label>
                      <textarea
                        value={newSchedule.description}
                        onChange={(e) => setNewSchedule({...newSchedule, description: e.target.value})}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 h-24 resize-none"
                        placeholder="일정에 대한 설명을 입력하세요"
                      />
                    </div>
                  </div>

                  {/* 모달 푸터 */}
                  <div className="p-4 border-t flex justify-end gap-2">
                    <button
                      onClick={() => setIsScheduleModalOpen(false)}
                      className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                    >
                      취소
                    </button>
                    <button
                      onClick={() => {
                        // 여기에 일정 추가 로직 구현
                        console.log('새 일정:', newSchedule);
                        setIsScheduleModalOpen(false);
                        // 일정 추가 후 폼 초기화
                        setNewSchedule({
                          title: '',
                          date: '',
                          startTime: '',
                          endTime: '',
                          participants: [],
                          description: ''
                        });
                      }}
                      className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                    >
                      추가
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  // 마크다운 저장 함수
  const handleSaveMarkdown = async () => {
    try {
      // 저장 중임을 표시할 수 있는 상태 추가
      const saveData = {
        fileId: selectedFile.id,
        content: markdownContent,
        lastModified: new Date().toISOString(),
        lastModifiedBy: "현재 사용자" // 실제로는 로그인된 사용자 정보를 사용
      };

      // API 호출을 시뮬레이션 (실제로는 fetch 또는 axios를 사용하여 서버와 통신)
      // const response = await fetch('/api/documents/save', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(saveData)
      // });
      
      // 성공적으로 저장되었다고 가정
      // documentsList 상태 업데이트
      const updatedDocumentsList = documentsList.map(category => ({
        ...category,
        files: category.files.map(file => 
          file.id === selectedFile.id 
            ? { 
                ...file, 
                lastModified: new Date().toLocaleDateString(),
                content: markdownContent 
              }
            : file
        )
      }));

      // documentsList 상태 업데이트
      // setDocumentsList(updatedDocumentsList);
      
      // 성공 메시지 표시 및 모달 닫기
      alert('문서가 성공적으로 저장되었습니다.');
      setIsMarkdownModalOpen(false);

    } catch (error) {
      console.error('저장 중 오류 발생:', error);
      alert('저장 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="flex justify-between items-center p-4 border-b">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-2xl hover:bg-gray-100 p-2 rounded-lg"
          >
            ☰
          </button>
          <span className="text-xl font-semibold">Study-bit🐰</span>
        </div>
        <div className="flex gap-4">
          <button className="p-2">👤</button>
          <button className="p-2">⚙️</button>
        </div>
      </header>

      <nav className="bg-purple-50 p-4">
        <div className="flex justify-around max-w-2xl mx-auto">
          {navigationItems.map(item => (
            <div
              key={item.id}
              onClick={() => setActiveTab(item.text)}
              className={`flex flex-col items-center cursor-pointer p-2 rounded-lg
                ${activeTab === item.text ? 'bg-purple-200' : 'hover:bg-purple-100'}`}
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="text-sm mt-1">{item.text}</span>
            </div>
          ))}
        </div>
      </nav>

      <div className="h-[calc(100vh-140px)] flex">
        {/* 채팅 영역 - 항상 고정 */}
        <div className="w-1/3 border-r flex flex-col">
          {/* 채팅 헤더 */}
          <div className="p-4 border-b bg-white">
            <h2 className="font-semibold">Chat</h2>
          </div>

          {/* 채팅 메시지 영역 */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            <div className="space-y-4">
              {/* 상대방 메시지 */}
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                <div className="bg-white p-2 rounded-lg max-w-[80%] shadow-sm">
                  안녕하세요!
                </div>
              </div>

              {/* 내 메시지 */}
              <div className="flex items-start gap-2 justify-end">
                <div className="bg-purple-200 p-2 rounded-lg max-w-[80%] shadow-sm">
                  네, 안녕하세요!
                </div>
              </div>
            </div>
          </div>

          {/* 메시지 입력 영역 */}
          <div className="p-4 border-t bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="메시지를 입력하세요..."
                className="flex-1 p-2 border rounded-lg"
              />
              <button className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600">
                전송
              </button>
            </div>
          </div>
        </div>

        {/* 탭 컨텐츠 영역 */}
        <div className="w-2/3">
          {renderTabContent()}
        </div>

        {/* 햄버거 메뉴 사이드바 */}
        <div 
          className={`fixed inset-y-0 left-0 transform ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } w-72 bg-white overflow-y-auto transition-transform duration-300 ease-in-out z-30 flex flex-col shadow-lg`}
        >
          {/* 헤더 */}
          <div className="p-4 border-b">
            <button 
              className="flex items-center gap-2 text-gray-700"
              onClick={() => setIsSidebarOpen(false)}
            >
              <span>←</span>
              <span className="font-medium">스터디 목록</span>
            </button>
          </div>

          {/* 스터디 방 목록 */}
          <div className="flex-1 p-4">
            <div className="space-y-3">
              {studyRooms.map(room => (
                <div
                  key={room.id}
                  className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 cursor-pointer transition-colors"
                >
                  <h3 className="font-medium text-gray-800">{room.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    참여자 {room.participants}명
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 새 스터디 만들기 버튼 */}
          <div className="p-4 border-t">
            <button className="w-full bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition-colors">
              새 스터디 만들기
            </button>
          </div>
        </div>

        {/* Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-20"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}
      </div>
    </div>
  );
};

export default LecturePlatform;