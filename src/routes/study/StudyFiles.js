import React, { useState } from 'react';

const StudyFiles = () => {
  // const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [files, setFiles] = useState([
    {
      id: 1,
      name: '과제 제출.pdf',
      author: '최수빈',
      uploadDate: '2024-03-20',
      size: '2.5MB',
    },
    {
      id: 2,
      name: '발표자료.pptx',
      author: '김철수',
      uploadDate: '2024-03-19',
      size: '5.1MB',
    }
  ]);

  return (
    <div className="max-w-3xl mx-auto p-4 pb-16">
      {/* 상단 헤더 */}
      {/* <div className="flex items-center justify-between mb-6">
        <button 
          className="p-2 hover:bg-gray-100 rounded-lg"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h1 className="text-xl font-bold">첨부파일</h1>
        <div className="w-8"></div>
      </div> */}

      {/* 사이드바*/}
      {/* <div className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        컨텐츠
      </div> */}

      {/* 검색바와 버튼들 */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="파일명, 작성자 검색"
            className="w-full p-3 border rounded-lg"
          />
        </div>
        <button className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 whitespace-nowrap">
          검색
        </button>
        <button className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 whitespace-nowrap">
          파일 업로드
        </button>
      </div>

      {/* 파일 목록 */}
      <div className="bg-white rounded-lg shadow">
        {files.map((file) => (
          <div key={file.id} className="p-4 border-b hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="text-gray-500">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium">{file.name}</div>
                  <div className="text-sm text-gray-500">
                    {file.author} · {file.uploadDate} · {file.size}
                  </div>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudyFiles;