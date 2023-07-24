import { useCallback, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Typography, Grid, Box, Dialog, DialogContent } from '@mui/material';
import { checkEmailApi, loginApi, registerApi } from '../../../services/user';
import _debounce from 'lodash/debounce';
import { toast } from 'react-toastify';
import { useUser } from '../../../context/UserContext';

const AuthenticationModal = ({ isOpen, onClose }) => {
  const [selectedForm, setSelectedForm] = useState('login');
  const [open, setOpen] = useState(isOpen);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    onClose();
    setOpen(false);
  };

  const toggleForm = () => {
    setSelectedForm(prevForm => (prevForm === 'login' ? 'register' : 'login'));
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <Box sx={{ minWidth: 400 }}>
          {selectedForm === 'login' ? (
            <LoginForm handleClose={handleClose} />
          ) : (
            <RegisterForm handleClose={handleClose} />
          )}
          <Button variant='text' onClick={toggleForm}>
            {selectedForm === 'login' ? 'Switch to Register' : 'Switch to Login'}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AuthenticationModal;

const LoginForm = ({ handleClose }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    register,
  } = useForm();
  const { setUser } = useUser();

  const onSubmit = async data => {
    const result = await loginApi(data);

    if (result.success) {
      setUser({
        email: result.data.email,
        id: result.data.id,
        status: result.data.status,
        role: result.data.role,
      });

      toast.success(`Welcome back: ${result.data.email}`);

      handleClose();
    } else {
      toast.error(result.data);
    }
  };

  const validateEmail = value => {
    if (!value) {
      return 'Email is required.';
    }
    if (!/^\S+@\S+$/.test(value)) {
      return 'Please enter a valid email address.';
    }

    return true;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2} justifyContent='center'>
        <Grid item xs={12}>
          <Typography variant='h6' align='center'>
            Login
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Controller
            name='email'
            control={control}
            defaultValue=''
            rules={{ validate: validateEmail }}
            render={({ field }) => (
              <TextField
                {...field}
                label='Email'
                fullWidth
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label='Password'
            {...register('password', { required: true })}
            type='password'
            fullWidth
            error={errors.password}
            helperText={errors.password && 'Please enter your password.'}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type='submit' variant='contained' color='primary' fullWidth>
            Login
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

const RegisterForm = ({ handleClose }) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    watch,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const { setUser } = useUser();

  const onSubmit = async data => {
    const { password, confirmPassword, ...rest } = data;

    const result = await registerApi({ password, ...rest });

    if (result.success) {
      setUser({
        email: result.data.email,
        id: result.data.id,
        status: result.data.status,
        role: result.data.role,
      });

      toast.success(`Welcome: ${result.data.email}`);

      handleClose();
    } else {
      toast.error(result.data);
    }
  };

  const watchPassword = watch('password', '');

  const handleConfirmPasswordChange = event => {
    const confirmPassword = event.target.value;
    setPasswordMismatch(watchPassword !== confirmPassword);
  };

  const checkEmailExists = _debounce(async email => {
    try {
      const exists = await checkEmailApi(email);
      setEmailExists(exists);
      setIsEmailValid(exists ? false : true);
    } catch (error) {
      setIsEmailValid(false);
    }
  }, 500);

  const handleEmailChange = event => {
    const email = event.target.value;
    setEmailExists(false);
    if (email !== '') {
      const isEmailValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);

      setIsEmailValid(isEmailValid);
      if (isEmailValid) {
        checkEmailExists(email);
      }
    } else {
      setIsEmailValid(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2} justifyContent='center'>
        <Grid item xs={12}>
          <Typography variant='h6' align='center'>
            Register
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label='Email'
            {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
            fullWidth
            error={errors.email || emailExists}
            helperText={
              errors.email
                ? 'Please enter a valid email address.'
                : emailExists
                ? 'This email is already registered.'
                : isEmailValid && !emailExists // Display "Email is available" only when emailExists is false
                ? 'Email is available ✅'
                : ''
            }
            onChange={handleEmailChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label='Password'
            {...register('password', { required: true, minLength: 8 })}
            type='password'
            fullWidth
            error={errors.password}
            helperText={errors.password && 'Please enter a password of at least 6 characters.'}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label='Confirm Password'
            {...register('confirmPassword', { required: true })}
            type='password'
            fullWidth
            error={errors.confirmPassword || passwordMismatch}
            helperText={
              errors.confirmPassword
                ? 'Please confirm your password.'
                : passwordMismatch
                ? 'Passwords do not match.'
                : ''
            }
            onChange={handleConfirmPasswordChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type='submit' variant='contained' color='primary' fullWidth disabled={!isValid}>
            Register
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
