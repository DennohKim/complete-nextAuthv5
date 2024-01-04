import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { CardWrapper } from './card-wrapper';

export const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel='Ooops! Something went wrong!'
      backButtonHref='/auth/login'
      backButtonLabel='Back to Login'
    >
      <div className='w-full flex items-center justify-center'>
        <ExclamationTriangleIcon className='text-destructive' />
      </div>
    </CardWrapper>
  );
};
