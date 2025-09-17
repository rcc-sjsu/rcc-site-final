'use client';
import EmailConfirmedComponent from './EmailConfirmedComponent';

export default async function EmailConfirmed() {
  return (
    <EmailConfirmedComponent
      img={'/images/email-confirmed-graphic.svg'}
      emailConfirmedTitle={'Congratulations!'}
      emailConfirmedDescription={'Your email has been confirmed. You can now log into your RCC account!'}
    ></EmailConfirmedComponent>
  );
}
