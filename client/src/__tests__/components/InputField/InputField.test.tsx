import InputField from '@/app/components/InputField';
import { yupResolver } from '@hookform/resolvers/yup';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const validationSchema = yup
  .object()
  .shape({
    email: yup
      .string()
      .trim()
      .required("Email is required!")
      .email("Must be valid email!"),
  })

describe('InputField component', () => {
  it('should render correctly at the first time render', () => {
    const Component = () => {
      const { control } = useForm({ resolver: yupResolver(validationSchema), mode: 'onChange' })
      return <InputField
        name='email'
        control={control}
        label='Email'
        placeholder='Enter email'
      />

    }
    render(<Component />);

    const formGroup = screen.queryByTestId('form-group_email');
    const formLabel = screen.queryByTestId('form-label_email');
    const formControl = screen.queryByTestId('control_email');
    const error = screen.queryByTestId('error_email');
    expect(formGroup).toBeInTheDocument();
    expect(formLabel).toBeInTheDocument();
    expect(formControl).toBeInTheDocument();
    expect(error).not.toBeInTheDocument();
  });

  it('should render error when user input invalid data', async () => {

    const Component = () => {
      const { control } = useForm({ resolver: yupResolver(validationSchema), mode: 'onChange' })

      return <InputField
        name='email'
        control={control}
        label='Email'
        placeholder='Enter email'
      />
    }
    const user = userEvent.setup();

    render(<Component />);

    const formControl = screen.getByTestId('control_email');

    await user.type(formControl, "123");
    let error = screen.queryByTestId('error_email');
    expect(error).toBeInTheDocument();
    expect(error).toHaveTextContent('Must be valid email!')

    await user.clear(formControl)
    error = screen.queryByTestId('error_email');
    expect(error).toBeInTheDocument();
    expect(error).toHaveTextContent('Email is required!');
  });


});
