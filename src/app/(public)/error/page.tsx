'use client';
import ErrorComponent from './ErrorComponent';

export default function ErrorPage() {
  return (
    <ErrorComponent
      img={'/images/circled-cross-symbol.svg'}
      errorTitle={'Something went wrong!'}
      errorDescription={'An unknown error has occurred. Please try again later.'}
    ></ErrorComponent>
  );
}
