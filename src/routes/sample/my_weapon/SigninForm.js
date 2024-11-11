import React from 'react';

const SigninForm = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-4">회원가입</h1>
          <p className="text-gray-600 mb-2">Study-bit🐰 과 함께 시작해보세요!</p>
          <p className="text-gray-600">더 나은 학습을 위한 첫 걸음입니다.</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-200"
                placeholder="example@email.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">닉네임</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-200"
                placeholder="사용하실 닉네임을 입력해주세요"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">비밀번호</label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-200"
                placeholder="비밀번호를 입력해주세요"
              />
              <p className="text-xs text-gray-500 mt-1">8자 이상의 영문, 숫자, 특수문자를 조합해주세요</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">비밀번호 확인</label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-200"
                placeholder="비밀번호를 다시 입력해주세요"
              />
            </div>

            <div className="pt-2">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-purple-600 shadow-sm focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50"/>
                <span className="ml-2 text-sm text-gray-600">
                  이용약관 및 개인정보처리방침에 동의합니다
                </span>
              </label>
            </div>
            
            <button className="w-full py-2 px-4 bg-gray-900 text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500">
              가입하기
            </button>
            
            <div className="text-center">
              <a href="#" className="text-sm text-purple-600 hover:text-purple-500">
                이미 계정이 있으신가요? 로그인하기
              </a>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-8 right-8">
          <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
              🐰
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SigninForm;