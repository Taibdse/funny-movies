import React from 'react';
import Spinner, { SpinnerProps } from 'react-bootstrap/Spinner';

export interface LoadingProps extends SpinnerProps {
  visible: boolean;
}

export default function Loading(props: LoadingProps) {
  const { visible, ...rest } = props;
  if (!props.visible) return null;

  return (
    <div className='mx-auto text-center' data-testid="spinner-loading">
      <Spinner variant='success' className='d-inline-block me-2' {...rest} />
      <Spinner variant='success' className='me-2' {...rest} />
      <Spinner variant='success' className='' {...rest} />
    </div>
  )
}
