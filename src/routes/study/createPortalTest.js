import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

// 새 창에 렌더링될 컴포넌트
const PopupContent = ({ onClose }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">새 창 테스트</h2>
      <p className="mb-4">이 내용은 새 창에 렌더링됩니다.</p>
      <button 
        onClick={onClose}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        창 닫기
      </button>
    </div>
  );
};

// Portal을 생성하고 관리하는 메인 컴포넌트
const PortalTest = () => {
  const [externalWindow, setExternalWindow] = useState(null);
  const [containerElement, setContainerElement] = useState(null);

  const openWindow = () => {
    const width = 500;
    const height = 400;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    const newWindow = window.open(
      '',
      '',
      `width=${width},height=${height},left=${left},top=${top}`
    );

    if (newWindow) {
      // 새 창의 기본 스타일 설정
      newWindow.document.body.style.margin = '0';
      newWindow.document.title = '팝업 테스트';
      
      // React 컴포넌트를 마운트할 div 생성
      const container = newWindow.document.createElement('div');
      newWindow.document.body.appendChild(container);

      setExternalWindow(newWindow);
      setContainerElement(container);
    }
  };

  const closeWindow = () => {
    if (externalWindow) {
      externalWindow.close();
      setExternalWindow(null);
      setContainerElement(null);
    }
  };

  // 컴포넌트 언마운트 시 창 정리
  useEffect(() => {
    return () => {
      if (externalWindow) {
        externalWindow.close();
      }
    };
  }, [externalWindow]);

  return (
    <div className="p-4">
      <button
        onClick={openWindow}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        새 창 열기
      </button>

      {containerElement && externalWindow &&
        ReactDOM.createPortal(
          <PopupContent onClose={closeWindow} />,
          containerElement
        )
      }
    </div>
  );
};

export default PortalTest;
