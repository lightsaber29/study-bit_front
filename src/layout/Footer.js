import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-400 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* 첫 번째 열 */}
          <div>
            <h5 className="text-white font-bold mb-4">첫번째 열</h5>
            <ul>
              <li><Link to='/' className="hover:text-gray-300">문의하기</Link></li>
            </ul>
          </div>

          {/* 두 번째 열 */}
          <div>
            <h5 className="text-white font-bold mb-4">두번째 열</h5>
            <ul>
              <li><Link to='/' className="hover:text-gray-300">공식카페</Link></li>
              <li><Link to='/' className="hover:text-gray-300">블로그</Link></li>
              <li><Link to='/' className="hover:text-gray-300">인스타그램</Link></li>
              <li><Link to='/' className="hover:text-gray-300">페이스북</Link></li>
              <li><Link to='/' className="hover:text-gray-300">유튜브</Link></li>
            </ul>
          </div>

          {/* 세 번째 열 */}
          <div>
            <h5 className="text-white font-bold mb-4">세번쩨 열</h5>
            <ul>
              <li><Link to='/' className="hover:text-gray-300">고객지원</Link></li>
            </ul>
          </div>

          {/* 네 번째 열 */}
          <div>
            <h5 className="text-white font-bold mb-4">네번째 열</h5>
            <ul>
              <li><Link to='/' className="hover:text-gray-300">개인정보 처리방침</Link></li>
              <li><Link to='/' className="hover:text-gray-300">통합서비스 이용약관</Link></li>
              <li><Link to='/' className="hover:text-gray-300">운영정책</Link></li>
              <li><Link to='/' className="hover:text-gray-300">청소년 보호정책</Link></li>
            </ul>
          </div>
        </div>

        {/* 회사 정보 */}
        <div className="border-t border-gray-600 mt-6 pt-4">
          <p className="text-sm text-gray-400">
            <strong className="text-white">Lec-bbit 랙 빗</strong>  주소: 대전광역시 대전 유성구 문지로 193  이메일: hello@lecbbit.com
          </p>
          <p className="text-sm text-gray-400">
            대표전화: 0000-0000  대표이사: 최수컴퍼니  사업자등록번호: 000-00-00000  통신판매업 신고번호: 0000-서울강남-00000
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Copyrights 2024. Lecbbit All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
