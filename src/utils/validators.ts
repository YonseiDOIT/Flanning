/**
 * 이메일 형식 검증
 * @param email - 사용자가 입력한 이메일 문자열
 * @returns {boolean} - 이메일이 올바른 형식이면 true, 아니면 false
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * 비밀번호 형식 검증
 * @param password - 사용자가 입력한 비밀번호 문자열
 * @returns {boolean} - 비밀번호가 올바른 형식이면 true, 아니면 false
 * 조건:
 * - 최소 8자 이상
 * - 최소 하나 이상의 숫자 포함
 * - 최소 하나 이상의 대문자 포함
 * - 최소 하나 이상의 소문자 포함
 */
export const validatePassword = (password: string): boolean => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return passwordRegex.test(password);
};

/**
 * 닉네임 형식 검증
 * @param nickname - 사용자가 입력한 닉네임 문자열
 * @returns {boolean} - 닉네임이 올바른 형식이면 true, 아니면 false
 * 조건:
 * - 최소 2자 이상
 * - 최대 10자 이하
 * - 특수문자 제외
 */
export const validateNickname = (nickname: string): boolean => {
  const regex = /^[a-zA-Z0-9가-힣]{2,10}$/;
  return regex.test(nickname);
};

/**
 * 한줄 소개 형식 검증
 * @param introduction - 사용자가 입력한 한 줄 소개 문자열
 * @returns {boolean} - 한 줄 소개가 올바른 형식이면 true, 아니면 false
 * 조건:
 * - 최대 30자 이하
 */
export const validateIntroduction = (introduction: string): boolean => {
  return introduction.length <= 30;
};

/**
 * 사용자 코드 형식 검증
 * @param length - 사용자 고유 코드 개수
 * @returns {boolean} - 랜덤적인 고유 코드 반환
 * 조건:
 * - 대문자 및 숫자 5가지 코드
 */
export const generateUniqueCode = (length = 5) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};
