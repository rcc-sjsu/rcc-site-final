'use client';
import { useRouter } from 'next/navigation';
import ErrorComponent from '../error/ErrorComponent';

export default function FourZeroFourErrorPage() {
  const router = useRouter();

  return (
    <ErrorComponent
      img={'/images/circled-cross-symbol.svg'}
      errorTitle={'404 Page Not Found'}
      errorDescription={'Sorry, the page you are looking for cannot be found.'}
    ></ErrorComponent>
  );
}
