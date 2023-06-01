"use client"
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import InputField from '../components/InputField'
import { ShareMovie, defaultShareMovieValues, shareMovieValidationSchema } from './constants';
import { Button, Card } from 'react-bootstrap';
import { ApiService } from '@/services/api';
import { AxiosResponse } from 'axios';

export default function ShareMoviePage() {

  const shareForm = useForm<ShareMovie>({
    resolver: yupResolver(shareMovieValidationSchema),
    defaultValues: defaultShareMovieValues,
    mode: 'onChange',
  });

  const { control, handleSubmit } = shareForm;


  const onSubmit = async (values: ShareMovie) => {
    console.log({ values });
    try {
      const response: AxiosResponse<> = await ApiService.getYoutubeVideoInfo(values.ytLink);
      console.log(response);
    } catch (error) {

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
