"use client"
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import InputField from '../components/InputField'
import { defaultShareMovieValues, shareMovieValidationSchema } from './constants';
import { Button, Card } from 'react-bootstrap';
import { ApiService } from '@/services/api';
import { AxiosResponse } from 'axios';
import { ShareMovieForm, ShareMovieResponseBody } from '@/types/app';
import { useRouter } from 'next/navigation';

export default function ShareMoviePage() {
  const router = useRouter();

  const shareForm = useForm<ShareMovieForm>({
    resolver: yupResolver(shareMovieValidationSchema),
    defaultValues: defaultShareMovieValues,
    mode: 'onChange',
  });

  const { control, handleSubmit } = shareForm;


  const onSubmit = async (values: ShareMovieForm) => {
    try {
      const response: AxiosResponse<ShareMovieResponseBody> = await ApiService.shareMovie(values);
      console.log(response);
      const { data, isDuplicatedLink, success, message } = response.data;
      if (success) {
        alert('Shared successfully!');
        shareForm.reset(defaultShareMovieValues);
        // router.push('/');
      } else {
        if (isDuplicatedLink) {
          alert('Duplicated youtube link!');
        } else {
          alert(message || 'Cannot process to save this link!');
        }
      }
    } catch (error) {
      alert('There is something wrong to process the request!');
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
