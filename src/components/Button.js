import React from 'react';

// Button 컴포넌트 정의
const Button = ({
  type = 'button',       // 버튼 타입 ('button', 'submit', 'reset' 등)
  onClick,               // 클릭 이벤트 핸들러
  children,              // 버튼 내부의 텍스트나 요소
  style = {},            // 인라인 스타일로 커스텀 스타일 적용 가능
  className = '',        // CSS 클래스명 추가
  disabled = false,      // 비활성화 여부
  variant = 'default',   // 버튼 스타일 유형 ('default', 'primary', 'secondary' 등)
  size = 'medium',       // 버튼 크기 ('small', 'medium', 'large' 등)
  ...props               // 추가적으로 필요한 다른 속성
}) => {

  const variantClasses = {
    default: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    primary: 'bg-emerald-400 text-white hover:bg-emerald-500',
    secondary: 'bg-gray-500 text-white hover:bg-gray-600',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    plain: 'bg-transparent text-gray-800 hover:bg-gray-100 border border-gray-500',
  };
  
  const sizeClasses = {
    small: 'text-sm px-3 py-1.5',
    medium: 'text-base px-4 py-2',
    large: 'text-lg px-5 py-2.5',
  };

  const baseClass = 'rounded cursor-pointer';
  const variantClass = variantClasses[variant] || variantClasses.default;
  const sizeClass = sizeClasses[size] || sizeClasses.medium;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={style}
      className={`${baseClass} ${variantClass} ${sizeClass} ${className} ${
        disabled ? 'bg-gray-400 cursor-not-allowed' : ''
      }`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
