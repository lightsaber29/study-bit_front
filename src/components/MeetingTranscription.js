// import React, { useState, useRef, useCallback, useEffect } from 'react';

// const MeetingTranscription = () => {
//   const [isRecording, setIsRecording] = useState(false);
//   const [transcripts, setTranscripts] = useState([]);
//   const [currentTranscript, setCurrentTranscript] = useState('');
//   const [allMeetings, setAllMeetings] = useState([]);  // 모든 회의 기록을 저장
//   const recognitionRef = useRef(null);
//   const silenceTimerRef = useRef(null);
//   const lastSpeechRef = useRef(Date.now());
//   const scrollRef = useRef(null);

//   // 초기 회의 기록 로드
//   useEffect(() => {
//     const loadMeetings = async () => {
//       try {
//         const response = await fetch('/api/meetings');  // 실제 엔드포인트로 수정 필요
//         if (!response.ok) throw new Error('Failed to load meetings');
//         const data = await response.json();
//         setAllMeetings(data);
//       } catch (error) {
//         console.error('회의 기록 로드 중 오류:', error);
//       }
//     };
//     loadMeetings();
//   }, []);

//   // 스크롤 자동 이동
//   useEffect(() => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
//     }
//   }, [transcripts, currentTranscript, allMeetings]);

//   const handleSilence = useCallback(() => {
//     if (currentTranscript.trim()) {
//       setTranscripts(prev => [...prev, {
//         text: currentTranscript.trim(),
//         timestamp: new Date().toLocaleTimeString('ko-KR', { 
//           hour: '2-digit', 
//           minute: '2-digit',
//           second: '2-digit'
//         })
//       }]);
//       setCurrentTranscript('');
//     }
//   }, [currentTranscript]);

//   useEffect(() => {
//     return () => {
//       if (silenceTimerRef.current) {
//         clearTimeout(silenceTimerRef.current);
//       }
//     };
//   }, []);

//   const resetSilenceTimer = useCallback(() => {
//     if (silenceTimerRef.current) {
//       clearTimeout(silenceTimerRef.current);
//     }
//     silenceTimerRef.current = setTimeout(handleSilence, 5000);
//   }, [handleSilence]);

//   const startRecording = () => {
//     try {
//       const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//       if (!SpeechRecognition) {
//         alert('이 브라우저는 음성 인식을 지원하지 않습니다. Chrome을 사용해주세요.');
//         return;
//       }

//       recognitionRef.current = new SpeechRecognition();      
//       recognitionRef.current.continuous = true;
//       recognitionRef.current.interimResults = true;
//       recognitionRef.current.lang = 'ko-KR';

//       recognitionRef.current.onresult = (event) => {
//         const current = event.results[event.results.length - 1];
//         const transcript = current[0].transcript;

//         if (current.isFinal) {
//           const now = Date.now();
//           const timeSinceLastSpeech = now - lastSpeechRef.current;
          
//           if (timeSinceLastSpeech > 5000) {
//             handleSilence();
//             setCurrentTranscript(transcript);
//           } else {
//             setCurrentTranscript(prev => prev + ' ' + transcript);
//           }
          
//           lastSpeechRef.current = now;
//           resetSilenceTimer();
//         }
//       };

//       recognitionRef.current.onerror = (event) => {
//         console.error('Speech recognition error:', event.error);
//         if (event.error === 'not-allowed') {
//           alert('마이크 권한이 필요합니다.');
//         }
//       };

//       recognitionRef.current.onend = () => {
//         if (isRecording) {
//           recognitionRef.current.start();
//         }
//       };

//       recognitionRef.current.start();
//       setIsRecording(true);
//       lastSpeechRef.current = Date.now();
//       resetSilenceTimer();
//     } catch (err) {
//       console.error('Speech recognition error:', err);
//       alert('음성 인식 초기화 중 오류가 발생했습니다.');
//     }
//   };

//   const stopRecording = () => {
//     if (recognitionRef.current) {
//       recognitionRef.current.stop();
//       setIsRecording(false);
//       if (silenceTimerRef.current) {
//         clearTimeout(silenceTimerRef.current);
//       }
//       handleSilence();
//     }
//   };

//   const endMeeting = async () => {
//     try {
//       if (isRecording) {
//         stopRecording();
//       }

//       const meetingData = {
//         transcripts,
//         endTime: new Date().toLocaleTimeString('ko-KR', {
//           hour: '2-digit',
//           minute: '2-digit',
//           second: '2-digit'
//         })
//       };

//       const response = await fetch('/api/meeting/end', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(meetingData),
//       });

//       if (!response.ok) {
//         throw new Error('회의록 저장에 실패했습니다.');
//       }

//       // 현재 회의를 전체 회의 목록에 추가
//       setAllMeetings(prev => [...prev, {
//         ...meetingData,
//         id: Date.now() // 임시 ID
//       }]);
      
//       alert('회의가 종료되었으며, 회의록이 성공적으로 저장되었습니다.');
//       setTranscripts([]); // 현재 회의록 초기화
//     } catch (error) {
//       console.error('회의 종료 중 오류:', error);
//       alert('회의록 저장 중 오류가 발생했습니다.');
//     }
//   };

//   return (
//     <div className="w-full max-w-2xl mx-auto p-4">
//       <div className="bg-white rounded-lg shadow-lg p-6">
//         <div className="flex items-center justify-between mb-4">
//           <h2 className="text-2xl font-bold">회의록 작성</h2>
//           <div className="flex gap-2">
//             <button
//               onClick={isRecording ? stopRecording : startRecording}
//               className={`px-4 py-2 rounded-md ${
//                 isRecording 
//                   ? 'bg-red-500 hover:bg-red-600' 
//                   : 'bg-green-500 hover:bg-green-600'
//               } text-white`}
//             >
//               {isRecording ? '회의록 작성 중지' : '회의록 작성 시작'}
//             </button>
//             {transcripts.length > 0 && (
//               <button
//                 onClick={endMeeting}
//                 className="px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white"
//               >
//                 회의 종료
//               </button>
//             )}
//           </div>
//         </div>

//         <div ref={scrollRef} className="h-96 overflow-y-auto border rounded-lg p-4 bg-gray-50">
//           {allMeetings.length === 0 && transcripts.length === 0 && !currentTranscript ? (
//             <div className="text-center text-gray-500 mt-4">
//               회의록이 여기에 표시됩니다
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {/* 이전 회의 기록들 */}
//               {allMeetings.map((meeting, meetingIdx) => (
//                 <div key={meeting.id} className="mb-6">
//                   <div className="text-center text-sm text-gray-500 mb-2">
//                     ---- {meeting.endTime} 종료된 회의 ----
//                   </div>
//                   <div className="space-y-2">
//                     {meeting.transcripts.map((transcript, idx) => (
//                       <div key={`${meetingIdx}-${idx}`} className="bg-white p-3 rounded shadow">
//                         <div className="text-sm text-gray-500">{transcript.timestamp}</div>
//                         <div className="mt-1">{transcript.text}</div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               ))}
              
//               {/* 현재 회의 기록 */}
//               {(transcripts.length > 0 || currentTranscript) && (
//                 <div className="mb-6">
//                   <div className="text-center text-sm text-gray-500 mb-2">
//                     ---- 현재 진행중인 회의 ----
//                   </div>
//                   <div className="space-y-2">
//                     {transcripts.map((transcript, idx) => (
//                       <div key={idx} className="bg-white p-3 rounded shadow">
//                         <div className="text-sm text-gray-500">{transcript.timestamp}</div>
//                         <div className="mt-1">{transcript.text}</div>
//                       </div>
//                     ))}
//                     {currentTranscript && (
//                       <div className="bg-white p-3 rounded shadow border-2 border-blue-200">
//                         <div className="text-sm text-gray-500">현재 인식 중...</div>
//                         <div className="mt-1">{currentTranscript}</div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MeetingTranscription;

// import React, { useState, useRef, useCallback, useEffect } from 'react';

// const MeetingTranscription = () => {
//   const [isRecording, setIsRecording] = useState(false);
//   const [transcripts, setTranscripts] = useState([]);
//   const [currentTranscript, setCurrentTranscript] = useState('');
//   const [allMeetings, setAllMeetings] = useState([]);
//   const recognitionRef = useRef(null);
//   const silenceTimerRef = useRef(null);
//   const lastSpeechRef = useRef(Date.now());
//   const scrollRef = useRef(null);

//   // 트랜스크립트가 변경될 때마다 콘솔에 출력
//   useEffect(() => {
//     console.log('Current Transcripts:', transcripts);
//   }, [transcripts]);

//   useEffect(() => {
//     const loadMeetings = async () => {
//       try {
//         const response = await fetch('/api/meetings');
//         if (!response.ok) throw new Error('Failed to load meetings');
//         const data = await response.json();
//         setAllMeetings(data);
//       } catch (error) {
//         console.error('회의 기록 로드 중 오류:', error);
//       }
//     };
//     loadMeetings();
//   }, []);

//   useEffect(() => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
//     }
//   }, [transcripts, currentTranscript, allMeetings]);

//   const handleSilence = useCallback(() => {
//     if (currentTranscript.trim()) {
//       const newTranscript = {
//         text: currentTranscript.trim(),
//         timestamp: new Date().toLocaleTimeString('ko-KR', { 
//           hour: '2-digit', 
//           minute: '2-digit',
//           second: '2-digit'
//         })
//       };
//       setTranscripts(prev => [...prev, newTranscript]);
//       setCurrentTranscript('');
//       console.log('Added new transcript:', newTranscript); // 디버깅용 로그
//     }
//   }, [currentTranscript]);

//   useEffect(() => {
//     return () => {
//       if (silenceTimerRef.current) {
//         clearTimeout(silenceTimerRef.current);
//       }
//     };
//   }, []);

//   const resetSilenceTimer = useCallback(() => {
//     if (silenceTimerRef.current) {
//       clearTimeout(silenceTimerRef.current);
//     }
//     silenceTimerRef.current = setTimeout(handleSilence, 2000); // 침묵 시간을 2초로 줄임
//   }, [handleSilence]);

//   const startRecording = () => {
//     try {
//       const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//       if (!SpeechRecognition) {
//         alert('이 브라우저는 음성 인식을 지원하지 않습니다. Chrome을 사용해주세요.');
//         return;
//       }

//       recognitionRef.current = new SpeechRecognition();      
//       recognitionRef.current.continuous = true;
//       recognitionRef.current.interimResults = true;
//       recognitionRef.current.lang = 'ko-KR';

//       recognitionRef.current.onresult = (event) => {
//         const current = event.results[event.results.length - 1];
//         if (current.isFinal) {
//           const transcript = current[0].transcript.trim();
//           if (transcript) {
//             const now = Date.now();
//             const timeSinceLastSpeech = now - lastSpeechRef.current;
            
//             // 이전 발화와 현재 발화 사이의 시간이 길면 새로운 발화로 처리
//             if (timeSinceLastSpeech > 2000 || !currentTranscript) {
//               if (currentTranscript) {
//                 handleSilence();
//               }
//               setCurrentTranscript(transcript);
//             } else {
//               setCurrentTranscript(prev => {
//                 const newTranscript = prev ? `${prev} ${transcript}` : transcript;
//                 return newTranscript;
//               });
//             }
            
//             lastSpeechRef.current = now;
//             resetSilenceTimer();
//           }
//         }
//       };

//       recognitionRef.current.onerror = (event) => {
//         console.error('Speech recognition error:', event.error);
//         if (event.error === 'not-allowed') {
//           alert('마이크 권한이 필요합니다.');
//         }
//       };

//       recognitionRef.current.onend = () => {
//         if (isRecording) {
//           recognitionRef.current.start();
//         }
//       };

//       recognitionRef.current.start();
//       setIsRecording(true);
//       lastSpeechRef.current = Date.now();

//       // 회의 시작 메시지 추가
//       const startMessage = {
//         text: "회의를 시작하겠습니다.",
//         timestamp: new Date().toLocaleTimeString('ko-KR', { 
//           hour: '2-digit', 
//           minute: '2-digit',
//           second: '2-digit'
//         })
//       };
//       setTranscripts([startMessage]);
//       console.log('Meeting started:', startMessage); // 디버깅용 로그
//     } catch (err) {
//       console.error('Speech recognition error:', err);
//       alert('음성 인식 초기화 중 오류가 발생했습니다.');
//     }
//   };

//   const stopRecording = () => {
//     if (recognitionRef.current) {
//       recognitionRef.current.stop();
//       setIsRecording(false);
//       if (silenceTimerRef.current) {
//         clearTimeout(silenceTimerRef.current);
//       }
//       handleSilence();
//     }
//   };

//   const endMeeting = async () => {
//     try {
//       if (isRecording) {
//         stopRecording();
//       }

//       // 현재 진행 중인 발화가 있다면 저장
//       if (currentTranscript.trim()) {
//         handleSilence();
//       }

//       const meetingData = {
//         transcripts,
//         endTime: new Date().toLocaleTimeString('ko-KR', {
//           hour: '2-digit',
//           minute: '2-digit',
//           second: '2-digit'
//         })
//       };

//       const response = await fetch('/api/meeting/end', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(meetingData),
//       });

//       if (!response.ok) {
//         throw new Error('회의록 저장에 실패했습니다.');
//       }

//       setAllMeetings(prev => [...prev, {
//         ...meetingData,
//         id: Date.now()
//       }]);
      
//       alert('회의가 종료되었으며, 회의록이 성공적으로 저장되었습니다.');
//       setTranscripts([]);
//       setCurrentTranscript('');
//     } catch (error) {
//       console.error('회의 종료 중 오류:', error);
//       alert('회의록 저장 중 오류가 발생했습니다.');
//     }
//   };

//   const renderTranscriptLine = (transcript, isCurrentTranscript = false) => (
//     <div key={transcript.timestamp} className={`flex items-start space-x-2 ${isCurrentTranscript ? 'text-blue-600' : ''}`}>
//       <span className="text-gray-500 min-w-[80px]">{transcript.timestamp}</span>
//       <span>{transcript.text}</span>
//       {isCurrentTranscript && <span className="text-blue-500 animate-pulse">...</span>}
//     </div>
//   );

//   return (
//     <div className="w-full max-w-2xl mx-auto p-4">
//       <div className="bg-white rounded-lg shadow-lg p-6">
//         <div className="flex items-center justify-between mb-4">
//           <h2 className="text-2xl font-bold">회의록 작성</h2>
//           <div className="flex gap-2">
//             <button
//               onClick={isRecording ? stopRecording : startRecording}
//               className={`px-4 py-2 rounded-md ${
//                 isRecording 
//                   ? 'bg-red-500 hover:bg-red-600' 
//                   : 'bg-green-500 hover:bg-green-600'
//               } text-white`}
//             >
//               {isRecording ? '회의록 작성 중지' : '회의록 작성 시작'}
//             </button>
//             {transcripts.length > 0 && (
//               <button
//                 onClick={endMeeting}
//                 className="px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white"
//               >
//                 회의 종료
//               </button>
//             )}
//           </div>
//         </div>

//         <div ref={scrollRef} className="h-96 overflow-y-auto border rounded-lg p-4 bg-gray-50 space-y-1">
//           {allMeetings.length === 0 && transcripts.length === 0 && !currentTranscript ? (
//             <div className="text-center text-gray-500 mt-4">
//               회의록이 여기에 표시됩니다
//             </div>
//           ) : (
//             <>
//               {allMeetings.map((meeting) => (
//                 <div key={meeting.id} className="mb-4">
//                   <div className="text-center text-sm text-gray-500 mb-2">
//                     --- {meeting.endTime} 종료된 회의 ---
//                   </div>
//                   {meeting.transcripts.map((transcript) => 
//                     renderTranscriptLine(transcript)
//                   )}
//                 </div>
//               ))}
              
//               {(transcripts.length > 0 || currentTranscript) && (
//                 <div>
//                   {isRecording && (
//                     <div className="text-center text-sm text-gray-500 mb-2">
//                       --- 현재 진행중인 회의 ---
//                     </div>
//                   )}
//                   {transcripts.map((transcript) => 
//                     renderTranscriptLine(transcript)
//                   )}
//                   {currentTranscript && renderTranscriptLine({
//                     text: currentTranscript,
//                     timestamp: new Date().toLocaleTimeString('ko-KR', {
//                       hour: '2-digit',
//                       minute: '2-digit',
//                       second: '2-digit'
//                     })
//                   }, true)}
//                 </div>
//               )}
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MeetingTranscription;

import React, { useState, useRef, useCallback, useEffect } from 'react';

const MeetingTranscription = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcripts, setTranscripts] = useState([]);
  const [currentTranscript, setCurrentTranscript] = useState('');
  const [allMeetings, setAllMeetings] = useState([]);
  const recognitionRef = useRef(null);
  const silenceTimerRef = useRef(null);
  const lastSpeechRef = useRef(Date.now());
  const scrollRef = useRef(null);

  // 트랜스크립트가 변경될 때마다 콘솔에 출력
  useEffect(() => {
    console.log('Current Transcripts:', transcripts);
  }, [transcripts]);

  // 전체 미팅 기록을 가져오는 함수인데 안 필요할 듯?
  useEffect(() => {
    const loadMeetings = async () => {
      try {
        const response = await fetch('/api/meetings');
        if (!response.ok) throw new Error('Failed to load meetings');
        const data = await response.json();
        setAllMeetings(data);
      } catch (error) {
        console.error('회의 기록 로드 중 오류:', error);
      }
    };
    loadMeetings();
  }, []);

  //회의록이 길어질 때 스크롤
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [transcripts, currentTranscript, allMeetings]);

  // 현재 발화를 트랜스크립트에 추가하는 함수 + (todo) 추후에 아이디나 이름도 리스트 요소에 추가
  const addTranscript = useCallback((text) => {
    if (text.trim()) {
      const newTranscript = {
        text: text.trim(),
        timestamp: new Date().toLocaleTimeString('ko-KR', { 
          hour: '2-digit', 
          minute: '2-digit',
          second: '2-digit'
        })
      }; 
      setTranscripts(prev => [...prev, newTranscript]);
    //   setCurrentTranscript('');
      console.log('Added new transcript:', newTranscript);
      return true;
    }
    return false;
  }, []);

  // 현재 발화 처리 함수
  const handleCurrentTranscript = useCallback(() => {
    if (currentTranscript) {      
      addTranscript(currentTranscript);
      setCurrentTranscript('');
    }
  }, []);

  // 주기적으로 현재 발화를 저장하는 타이머 설정
//   useEffect(() => {
//     let timer;
//     if (!isRecording && currentTranscript) {
//       timer = setInterval(() => {
//         addTranscript();
//         // handleCurrentTranscript();
//       }, 3000);
//     }
//     return () => {
//       if (timer) clearInterval(timer);
//     };
//   }, [isRecording, currentTranscript, handleCurrentTranscript]);

  const startRecording = () => {
    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      console.log('here :: typeof SpeechRecognition: ', typeof(SpeechRecognition))
      if (!SpeechRecognition) {
        alert('이 브라우저는 음성 인식을 지원하지 않습니다. Chrome을 사용해주세요.');
        return;
      }

      recognitionRef.current = new SpeechRecognition();      
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'ko-KR';

      recognitionRef.current.onresult = (event) => {
        
        const current = event.results[event.results.length - 1];
        if (current.isFinal) {
          const transcript = current[0].transcript.trim();
          console.log(transcript);
          if (transcript) {
            setCurrentTranscript(prev => prev + ' ' + transcript);
            // currentTranscript.current += ' ' + transcript;
            // setCurrentTranscript(currentTranscript.current);
            console.log("currentTranscript.current :: ", currentTranscript.current);
            console.log("lastSpeechRef.current :: ", lastSpeechRef.current);
            if ((Date.now() - lastSpeechRef.current) > 3000) {
                // 이전 발화 저장
                console.log("test :: ", Date.now() - lastSpeechRef.current)
                handleCurrentTranscript();
            }            
            // 새로운 발화 설정
            // setCurrentTranscript('');
            lastSpeechRef.current = Date.now();
          }
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        if (event.error === 'not-allowed') {
          alert('마이크 권한이 필요합니다.');
        }
      };

      recognitionRef.current.onend = () => {
        if (isRecording) {
          recognitionRef.current.start();
        }
      };

      recognitionRef.current.start();
      setIsRecording(true);
      lastSpeechRef.current = Date.now();

      // 회의 시작 메시지 추가
      addTranscript("회의를 시작하겠습니다.");
    } catch (err) {
      console.error('Speech recognition error:', err);
      alert('음성 인식 초기화 중 오류가 발생했습니다.');
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
      // 녹음 중지 시 현재 발화 저장
      handleCurrentTranscript();
    }
  };

  const endMeeting = async () => {
    try {
      if (isRecording) {
        stopRecording();
      }

      // 현재 진행 중인 발화 저장
      handleCurrentTranscript();

      const meetingData = {
        transcripts,
        endTime: new Date().toLocaleTimeString('ko-KR', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
      };

      const response = await fetch('/api/meeting/end', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(meetingData),
      });

      if (!response.ok) {
        throw new Error('회의록 저장에 실패했습니다.');
      }

      setAllMeetings(prev => [...prev, {
        ...meetingData,
        id: Date.now()
      }]);
      
      alert('회의가 종료되었으며, 회의록이 성공적으로 저장되었습니다.');
      setTranscripts([]);
      setCurrentTranscript('');
    } catch (error) {
      console.error('회의 종료 중 오류:', error);
      alert('회의록 저장 중 오류가 발생했습니다.');
    }
  };

  const renderTranscriptLine = (transcript, isCurrentTranscript = false) => (
    <div key={transcript.timestamp} className={`flex items-start space-x-2 ${isCurrentTranscript ? 'text-blue-600' : ''}`}>
      <span className="text-gray-500 min-w-[80px]">{transcript.timestamp}</span>
      <span>{transcript.text}</span>
      {isCurrentTranscript && <span className="text-blue-500 animate-pulse">...</span>}
    </div>
  );

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">회의록 작성</h2>
          <div className="flex gap-2">
            <button
              onClick={isRecording ? stopRecording : startRecording}
              className={`px-4 py-2 rounded-md ${
                isRecording 
                  ? 'bg-red-500 hover:bg-red-600' 
                  : 'bg-green-500 hover:bg-green-600'
              } text-white`}
            >
              {isRecording ? '회의록 작성 중지' : '회의록 작성 시작'}
            </button>
            {transcripts.length > 0 && (
              <button
                onClick={endMeeting}
                className="px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white"
              >
                회의 종료
              </button>
            )}
          </div>
        </div>

        <div ref={scrollRef} className="h-96 overflow-y-auto border rounded-lg p-4 bg-gray-50 space-y-1">
          {allMeetings.length === 0 && transcripts.length === 0 && !currentTranscript ? (
            <div className="text-center text-gray-500 mt-4">
              회의록이 여기에 표시됩니다
            </div>
          ) : (
            <>
              {allMeetings.map((meeting) => (
                <div key={meeting.id} className="mb-4">
                  <div className="text-center text-sm text-gray-500 mb-2">
                    --- {meeting.endTime} 종료된 회의 ---
                  </div>
                  {meeting.transcripts.map((transcript) => 
                    renderTranscriptLine(transcript)
                  )}
                </div>
              ))}
              
              {(transcripts.length > 0 || currentTranscript) && (
                <div>
                  {isRecording && (
                    <div className="text-center text-sm text-gray-500 mb-2">
                      --- 현재 진행중인 회의 ---
                    </div>
                  )}
                  {transcripts.map((transcript) => 
                    renderTranscriptLine(transcript)
                  )}
                  {currentTranscript && renderTranscriptLine({
                    text: currentTranscript,
                    timestamp: new Date().toLocaleTimeString('ko-KR', {
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit'
                    })
                  }, true)}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MeetingTranscription;