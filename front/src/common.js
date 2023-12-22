export function identify(
  emailInput,
  passwordInput,
  setEmailIdentifyCheck,
  setPasswordIdentifyCheck
) {
  if (emailInput) {
    // email 주소 유효성 검사 정규표현식
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

    return !emailRegex.test(emailInput)
      ? setEmailIdentifyCheck(false)
      : setEmailIdentifyCheck(true);
  } else if (passwordInput) {
    // password 주소 유효성 검사 정규표현식
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return !passwordRegex.test(passwordInput)
      ? setPasswordIdentifyCheck(false)
      : setPasswordIdentifyCheck(true);
  }
}
