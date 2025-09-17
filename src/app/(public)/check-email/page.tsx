'use client';
import CheckEmailComponent from './CheckEmailComponent';

export default async function CheckEmail() {
  return (
    <CheckEmailComponent
      img={'/images/confirm-email-graphic.svg'}
      checkEmailTitle={'Confirm Your Email'}
      checkEmailDescription={'Thanks for signing up! Check your email to confirm your email address.'}
    ></CheckEmailComponent>
  );
}
