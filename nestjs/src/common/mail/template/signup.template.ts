export const signupMailTemplate = (name: string, varifyNumber: string) => {
  return {
    subject: '[호잇] 이메일 인증',
    html: `
    <div>
      <h1>안녕하세요 ${name}님</h1>
      <p>이메일 인증을 위해 아래 번호를 입력해주세요.</p>
      <p>${varifyNumber}</p>
    </div>
    `,
  };
};
