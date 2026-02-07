import * as yup from 'yup';

const nextOfKinSchema = yup.object().shape({
  firstName: yup.string().required('Next of kin\'s First name is required'),
  lastName: yup.string().required('Next of kin\'s Last name is required'),
  phoneNumber: yup.string().required('Next of kin\'s Phone number is required'),
  relationship: yup.string().required('Next of kin\'s Relationship is required'),
});

export const userSchema = yup.object({
  firstName: yup
    .string()
    .required('First name is required!')
    .min(3, 'First name must be at least 3 characters!')
    .max(50, 'First name cannot be greater than 50 characters!'),
  lastName: yup
    .string()
    .required('Last name is required!')
    .min(3, 'Last name must be at least 3 characters!')
    .max(50, 'Last name cannot be greater than 50 characters!'),
  email: yup
    .string()
    .required('Email is required!')
    .email('Invalid email format'),
  phone: yup
    .string()
    .required('Phone number is required')
    .min(10, 'Phone number must be at least 10 characters!')
    .max(15, "Phone number cannot be more than 15 characters!")
    .matches(/^[0-9]+$/, 'Phone number is not valid'),
  password: yup
    .string()
    .required('Password is required!')
    .min(8, 'Password must be at least 8 characters')
    .test('has-uppercase', 'Password must contain at least one uppercase letter', (value) => {
      return /[A-Z]/.test(value || '');
    })
    .test('has-number', 'Password must contain at least one number', (value) => {
      return /[0-9]/.test(value || '');
    })
    .test('has-special-char', 'Password must contain at least one special character', (value) => {
      return /[!@#$%^&*]/.test(value || '');
    }),
  idNumber: yup
    .number()
    .required('ID number is required')
    .positive('ID number must be positive')
    .integer('ID number must be an integer')
    .min(9999999, "ID number must be at least 7 characters")
    .max(9999999999, "ID number cannot be greater than 10 characters"),
  nextOfKins: yup
    .array()
    .of(nextOfKinSchema)
});