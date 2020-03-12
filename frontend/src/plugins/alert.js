import Vue from 'vue';
import Swal from 'sweetalert2';

const alert = {
    install (Vue) {
        /**
         * 전역 공통 함수
         */
        const alertMethods = {
            toHtml (text) {
                return (text && text.length > 0) ? text.replace('\n', '<br>') : '';
            },
            /**
             * 일반적인 오류 alert
             * @param title 타이틀
             */
            showCommonAlert (title, positiveCallback) {
                this.showAlertToQuestion('warning', '알림', title, '확인', positiveCallback);
            },

            /**
             * 메시지 받아서 처리 하는 alert
             * @param positiveCallback 저장 이벤트 핸들러(함수)
             */
            showAlertToSaveWithMessage (message, positiveCallback) {
                this.showAlertToQuestion('warning', // 질의
                    "경고",
                    message,                // 확인 메시지
                    '확인', // 확인 버튼
                    positiveCallback, // 저장 이벤트 핸들러
                    '취소'); // 취소 버튼
            },

            /**
             * 저장 확인 alert
             * @param positiveCallback 저장 이벤트 핸들러(함수)
             */
            showAlertToSave (positiveCallback) {
                this.showAlertToQuestion('question', // 질의
                    '저장하시겠습니까?', // 저장 확인 메시지
                    null,
                    '저장', // 저장 버튼
                    positiveCallback, // 저장 이벤트 핸들러
                    '취소'); // 취소 버튼
            },
            /**
             * 수정 확인 alert
             * @param positiveCallback 수정 이밴트 핸들러(함수)
             */
            showAlertToUpdate (positiveCallback) {
                this.showAlertToQuestion('question', // 질의
                    '수정하시겠습니까?', // 수정 확인 메시지
                    null,
                    '수정', // 수정 버튼
                    positiveCallback, // 수정 이벤트 핸들러
                    '취소'); // 취소 버튼
            },
            /**
             * 삭제 확인 alert
             * @param positiveCallback 삭제 이벤트 핸들러(함수)
             */
            showAlertToDelete (positiveCallback) {
                this.showAlertToQuestion('error', // 질의
                    '삭제하시겠습니까?', // 삭제 확인 메시지
                    null,
                    '삭제', // 삭제 버튼
                    positiveCallback, // 삭제 이벤트 핸들러
                    '취소'); // 취소 버튼
            },
            /**
             * 재시도 alert (재시도, 취소)
             * @param title 제목
             * @param message 내용
             * @param positiveCallback 긍정 이벤트 핸들러(함수)
             * @param negativeCallback 부정 이벤트 핸들러(함수)
             */
            showAlertToRetry (title, message, positiveCallback, negativeCallback) {
                this.showAlertToQuestion('error',
                    title,
                    message,
                    '재시도',
                    positiveCallback,
                    '취소',
                    negativeCallback);
            },

            /**
             * 질의용 alert
             * @param title 제목
             * @param message 내용
             * @param positiveTxt 긍정 버튼 텍스트
             * @param positiveCallback 긍정 버튼 이밴트 핸들러(함수)
             * @param negativeTxt 부정 버튼 텍스트
             * @param negativeCallback 부정 버튼 이벤트 핸들러(함수)
             */
            showAlertToQuestion (type, title, message, positiveTxt, positiveCallback, negativeTxt, negativeCallback) {
                Swal.fire({
                    type: type,
                    title: title,
                    html: this.toHtml(message),
                    allowOutsideClick: false,
                    showCancelButton: !!negativeTxt,
                    confirmButtonText: positiveTxt,
                    cancelButtonText: negativeTxt
                }).then(result => {
                    if (result.value) {
                        if (positiveCallback) {
                            positiveCallback();
                        }
                    } else {
                        if (negativeCallback) {
                            negativeCallback();
                        }
                    }
                });
            },

            /**
             * 알림용 alert
             * @param message 내용
             * */
            showAlertToInfo (message) {
                Swal.fire({
                    type: 'warning',
                    title: 'Information!',
                    html: this.toHtml(message),
                    allowOutsideClick: false,
                    confirmButtonText: '확인'
                });
            },
            showAlertToWarning (title, message) {
                Swal.fire({
                    type: 'warning',
                    title: title,
                    html: this.toHtml(message),
                    allowOutsideClick: false,
                    confirmButtonText: '확인'
                });
            },
            /**
             * Vue 에서 나가기를 지원하기 위한 alert
             * @param title 제목
             * @param message 내용
             * @param positiveCallback 나가기용 콜백
             */
            showAlertToExit (title, message, positiveCallback) {
                Swal.fire({
                    type: 'info',
                    title: title,
                    html: this.toHtml(message),
                    allowOutsideClick: false,
                    confirmButtonText: '나가기'
                }).then(() => {
                    // 무조건 positive callback 수행
                    if (positiveCallback) {
                        positiveCallback();
                    }
                });
            },
            /**
             * 처리 성공 모달 alert
             * @param positiveTxt
             * @param positiveCallback
             * @param negativeTxt
             * @param negativeCallback
             */
            showModalSuccessToProcess(positiveTxt, positiveCallback, negativeTxt, negativeCallback) {
                this.showModalSuccess('처리되었습니다.', positiveTxt, positiveCallback, negativeTxt, negativeCallback);
            },
            /**
             * 저장 성공 모달 alert
             * @param positiveTxt 긍정 버튼 텍스트 // 필수
             * @param positiveCallback 긍정 이벤트 핸들러(함수) // 필수
             * @param negativeTxt 부정 버튼 텍스트 // 생략가능
             * @param negativeCallback 부정 이벤트 핸들러(함수) // 생략가능
             */
            showModalSuccessToSave (positiveTxt, positiveCallback, negativeTxt, negativeCallback) {
                this.showModalSuccess('저장되었습니다.', positiveTxt, positiveCallback, negativeTxt, negativeCallback);
            },
            /**
             * 수정 성공 모달 alert
             * @param positiveTxt 긍정 버튼 텍스트 // 필수
             * @param positiveCallback 긍정 이벤트 핸들러(함수) // 필수
             * @param negativeTxt 부정 버튼 텍스트 // 생략가능
             * @param negativeCallback 부정 이벤트 핸들러(함수) // 생략가능
             */
            showModalSuccessToUpdate (positiveTxt, positiveCallback, negativeTxt, negativeCallback) {
                this.showModalSuccess('수정되었습니다.', positiveTxt, positiveCallback, negativeTxt, negativeCallback);
            },
            /**
             * 삭제 성공 모달 alert
             * @param positiveTxt 긍정 버튼 텍스트 // 필수
             * @param positiveCallback 긍정 이벤트 핸들러(함수) // 필수
             * @param negativeTxt 부정 버튼 텍스트 // 생략가능
             * @param negativeCallback 부정 이벤트 핸들러(함수) // 생략가능
             */
            showModalSuccessToDelete (positiveTxt, positiveCallback, negativeTxt, negativeCallback) {
                this.showModalSuccess('삭제되었습니다.', positiveTxt, positiveCallback, negativeTxt, negativeCallback);
            },
            /**
             * 성공 모달 alert
             * @param title 제목
             * @param positiveTxt 긍정 버튼 텍스트 // 필수
             * @param positiveCallback 긍정 이벤트 핸들러(함수) // 필수
             * @param negativeTxt 부정 버튼 텍스트 // 생략가능
             * @param negativeCallback 부정 이벤트 핸들러(함수) // 생략가능
             */
            showModalSuccess (title, positiveTxt, positiveCallback, negativeTxt, negativeCallback) {
                Swal.fire({
                    type: 'success',
                    title: title,
                    allowOutsideClick: true,
                    showCancelButton: !!negativeTxt,
                    confirmButtonText: positiveTxt,
                    cancelButtonText: negativeTxt
                }).then(result => {
                    if (result.value) {
                        if (positiveCallback) {
                            positiveCallback();
                        }
                    } else {
                        if (negativeTxt) {
                            if (negativeCallback) {
                                negativeCallback();
                            }
                        } else {
                            if (positiveCallback) {
                                positiveCallback();
                            }
                        }
                    }
                });
            }
        };

        Vue.prototype.$alert = alertMethods;
    }
};

Vue.use(alert);
