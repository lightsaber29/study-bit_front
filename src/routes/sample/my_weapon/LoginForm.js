import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/weapon/study');
  };

  const handleSignUp = () => {
    navigate('/weapon/signin');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-4">안녕하세요!</h1>
          <p className="text-gray-600 mb-2">함께 공부하실 스터디원이 필요하신가요?</p>
          <p className="text-gray-600">Study-bit🐰 이 함께 학습을 도와드리겠습니다.</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-200"
                placeholder="Value"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-200"
                placeholder="Value"
              />
            </div>
            
            <div className="text-right">
              <button 
                onClick={handleSignUp}
                className="text-sm text-purple-600 hover:text-purple-500"
              >
                아직 회원이 아니신가요?
              </button>
            </div>
            
            <button 
              onClick={handleLogin}
              className="w-full py-2 px-4 bg-gray-900 text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Sign up
            </button>
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

export default LoginForm;