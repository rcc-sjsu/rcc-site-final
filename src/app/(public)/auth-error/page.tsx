'use client';
import ErrorComponent from '../error/ErrorComponent';

export default function AuthError() {
  return (
    <ErrorComponent
      img={'/images/alert-symbol.svg'}
      errorTitle={'Authentication Error'}
      errorDescription={'There was a problem when trying to authenticate. Please try again later.'}
    ></ErrorComponent>
  );
}
