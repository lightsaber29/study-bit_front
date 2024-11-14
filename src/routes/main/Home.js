import React, { useEffect, useState } from 'react';
import Button from '../../components/Button';
import Card from '../../components/Card';
import MyStudyCard from '../../components/MyStudyCard';
import Modal from '../../components/Modal';
import { useSelector } from 'react-redux';
import { selectToken } from 'store/memberSlice';

const Home = () => {
  const [studyList, setStudyList] = useState([]);
  const [selectedStudy, setSelectedStudy] = useState(null);

  const token = useSelector(selectToken);

  useEffect(() => {
    setStudyList([
      {
        index: 0,
        title: '공무원 자율 스터디 1',
        memberCount: '16',
        photoUrl: '/images/aespa_ningning.jpeg',
        description: '공무원 자율 스터디입니다.\n누구나 함께 공부하며 스터디 친구를 사귈 수 있습니다.\n해당 스터디룸은 구루미에서 개설한 스터디룸으로,\n입장한 지 3일 이상 경과된 상황에서 카메라 송출이 되고 있지 않는다면 발견되는 즉시 무료보강 강제 퇴장 조치를 진행할 수 있습니다.'
      },
      { 
        index: 1,
        title: '공무원 자율 스터디 2',
        memberCount: '4',
        photoUrl: '/images/aespa_giselle.jpeg',
        description: '공무원 자율 스터디입니다.\n누구나 함께 공부하며 스터디 친구를 사귈 수 있습니다.\n해당 스터디룸은 구루미에서 개설한 스터디룸으로,\n입장한 지 3일 이상 경과된 상황에서 카메라 송출이 되고 있지 않는다면 발견되는 즉시 무료보강 강제 퇴장 조치를 진행할 수 있습니다.'
      },
    ]);
  }, []);

  const handleCardClick = (study) => {
    setSelectedStudy(study);
  };

  return (
    <div>
      {/* 내 스터디 & 내 목표 섹션 */}
      {token && (
        <div className="gap-6 mb-8">
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">내 스터디</h2>
            <div className="flex items-center space-x-4">
              <MyStudyCard isEmpty={false} title="스터디 1" photoUrl='/images/aespa_karina.jpeg' roomId='1' />
              <MyStudyCard isEmpty={false} title="스터디 2" photoUrl='/images/aespa_winter.jpeg' roomId='2' />
              <MyStudyCard isEmpty={true} />
              <MyStudyCard isEmpty={true} />
            </div>
          </div>

          {/* <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">내 목표</h2>
            <div className="text-sm text-gray-600 mb-2">오늘 공부할 시간 / 내 목표 시간</div>
            <div className="text-2xl font-bold mb-4">0시간 0분 / 0시간 0분</div>
            <input
              type="text"
              placeholder="내 목표시간을 설정해주세요."
              className="w-full p-2 border rounded-lg mb-4"
            />
            <input
              type="text"
              placeholder="메모를 추가해보세요."
              className="w-full p-2 border rounded-lg"
            />
          </div> */}
        </div>
      )}

      {/* 공개 스터디 섹션 */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">공개 스터디</h2>
        <div className="flex space-x-4 mb-4">
          <Button variant="primary">전체</Button>
          <Button variant="default">신규 스터디</Button>
          <Button variant="default">참여한 스터디</Button>
        </div>
      </div>

      {/* 스터디 카드 리스트 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {studyList.map((study) => (
          <div key={study.index} onClick={() => handleCardClick(study)}>
            <Card
              title={study.title}
              memberCount={study.memberCount}
              photoUrl={study.photoUrl}
            />
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal
        isOpen={selectedStudy !== null}
        onClose={() => setSelectedStudy(null)}
        title={selectedStudy?.title}
        memberCount={selectedStudy?.memberCount}
        period={selectedStudy?.period}
        description={selectedStudy?.description}
      />

      {/* 더보기 버튼 */}
      <div className="flex justify-center mt-6">
        <Button variant="plain" className='rounded-full'>더보기</Button>
      </div>
    </div>
  );
};

export default Home;
