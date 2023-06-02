"use client"
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import InputField from '../components/InputField'
import { defaultShareMovieValues, shareMovieValidationSchema } from './constants';
import { Button, Card } from 'react-bootstrap';
import { ApiService } from '@/services/api';
import { AxiosResponse } from 'axios';
import { ShareMovieForm, ShareMovieResponseBody } from '@/types/app';
import { toast } from 'react-toastify';

export default function ShareMoviePage() {
  const shareForm = useForm<ShareMovieForm>({
    resolver: yupResolver(shareMovieValidationSchema),
    defaultValues: defaultShareMovieValues,
    mode: 'onChange',
  });

  const { control, handleSubmit } = shareForm;

  const onSubmit = async (values: ShareMovieForm) => {
    try {
      const response: AxiosResponse<ShareMovieResponseBody> = await ApiService.shareMovie(values);
      const { data, isDuplicatedLink, success, message } = response.data;
      if (success) {
        toast.success('Shared successfully!');
        shareForm.reset(defaultShareMovieValues);
      } else {
        if (isDuplicatedLink) {
          toast.error('Duplicated youtube link!');
        } else {
          toast.error(message || 'Cannot process to save this link!');
        }
      }
    } catch (error) {
      toast.error('There is something wrong to process the request!');
    }
  }

  return (
    <div className=''>
      <div className='row mt-5'>
        <div className='col-sm-6 mx-auto'>
          <Card style={{ width: '100%' }}>
            <Card.Body>
              <Card.Title>Share a Youtube movie</Card.Title>
              <form onSubmit={handleSubmit(onSubmit)}>
                <InputField control={control} name='ytLink' label='Youtube URL' />
                <div className='d-grid'>
                  <Button type='submit' className='mt-3 d-block'>Share</Button>
                </div>
              </form>
            </Card.Body>
          </Card>
        </div>
      </div>

    </div>
  )
}
