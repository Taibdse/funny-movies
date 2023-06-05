import { Form, FormControlProps, FormGroupProps, FormLabelProps } from 'react-bootstrap';
import { useController } from 'react-hook-form';

interface FormFieldProps extends FormControlProps {
  name: string;
  control: any;
  label?: string;
  formGroupProps?: FormGroupProps;
  labelProps?: FormLabelProps;
}

export default function InputField(props: FormFieldProps) {
  const {
    name,
    control,
    label,
    formGroupProps,
    labelProps,
    ...rest
  } = props;
  const {
    field,
    fieldState: { invalid, error },
  } = useController({ name, control });

  return (
    <Form.Group className={formGroupProps?.className} data-testid={`form-group_${name}`}>
      {label && <Form.Label {...labelProps} data-testid={`form-label_${name}`}>{label}</Form.Label>}
      <Form.Control
        id={`control_${name}`}
        data-testid={`control_${name}`}
        {...rest}
        {...field}
        value={field.value || ''}
      />
      {invalid && (
        <Form.Text className="text-danger" data-testid={`error_${name}`}>
          {error?.message}
        </Form.Text>
      )}
    </Form.Group>
  )
}
