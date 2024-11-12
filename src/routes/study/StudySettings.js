import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StudySettings = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: '',
    description: '직장인 공부팟입니다.',
    image: null
  });
  const [previewImage, setPreviewImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: API 연동
    console.log('설정 변경:', formData);
  };

  const handleLeaveStudy = () => {
    if (window.confirm('정말로 스터디룸을 나가시겠습니까?')) {
      // TODO: API 연동
      navigate('/');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 pb-16">
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <h2 className="font-semibold text-center text-xl">스터디룸 설정</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* 스터디룸 이미지 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              스터디룸 이미지
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
              <div className="flex flex-col items-center justify-center text-gray-400">
                <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                <span>이미지를 업로드하세요</span>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
            </div>
          </div>

          {/* 비밀번호 변경 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              비밀번호
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="새 비밀번호 입력"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          {/* 스터디룸 설명 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              스터디룸 설명
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          {/* 버튼 그룹 */}
          <div className="flex flex-col space-y-4 pt-4">
            {/* 버튼 그룹 */}
            <div className="flex justify-between items-center">
              {/* 왼쪽: 스터디룸 나가기 */}
              <button
                type="button"
                onClick={handleLeaveStudy}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                스터디룸 나가기
              </button>

              {/* 오른쪽: 저장 및 취소 버튼 */}
              <div className="flex space-x-2">
                <button
                  type="submit"
                  className="px-8 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                >
                  저장하기
                </button>
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  취소
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudySettings; 