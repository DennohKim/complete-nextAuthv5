'use client';

import { useCallback, useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';
import { useSearchParams } from 'next/navigation';
import { CardWrapper } from './card-wrapper';
import { newVerification } from '@/actions/new-verification';
import { FormSuccess } from '../form-success';
import { FormError } from '../form-error';

const NewVerificationForm = () => {
  const [success, setSuccess] = useState<string | undefined>();

  const [error, setError] = useState<string | undefined>();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  console.log('token', token);

  const onSubmit = useCallback(() => {
	if(success || error) return;

    if (!token) {
      setError('Invalid token');
      return;
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch((error) => {
        setError('Something went wrong!');
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel='Confirming your verification'
      backButtonLabel='Back to login'
      backButtonHref='/auth/login'
    >
      <div className='flex items-center w-full justify-center'>
        {!success && !error && <BeatLoader />}
        <FormSuccess message={success} />
        {!success && <FormError message={error} />}
      </div>
    </CardWrapper>
  );
};

export default NewVerificationForm;
