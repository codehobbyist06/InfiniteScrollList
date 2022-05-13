import { useState } from 'react';
import './Login.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Login = ({ statushandler }) => {
  const [inputName, setinputName] = useState('');
  const [inputPass, setinputPass] = useState('');
  const [inputNameError, setinputNameError] = useState(0);
  const [inputPassError, setinputPassError] = useState(0);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(inputName, inputPass);
    //validate input and pass
    if (inputName == 'foo' && inputPass == 'Bar') {
      statushandler(1);
      setinputNameError(0);
      setinputPassError(0);
    } else {
      if (inputName != 'foo') {
        setinputNameError(1);
      } else {
        setinputNameError(0);
      }
      if (inputPass != 'Bar') {
        setinputPassError(1);
      } else {
        setinputPassError(0);
      }
    }
  };

  const getNameInput = (e) => {
    e.preventDefault();
    setinputName(e.target.value);
    console.log(e.target.value);
  };

  const getPassInput = (e) => {
    e.preventDefault();
    setinputPass(e.target.value);
    console.log(e.target.value);
  };

  return (
    <div className='login'>
      <form className='login'>
        <TextField
          error={inputNameError}
          required
          id='outlined-required'
          label='UserName - hint: foo'
          onChange={getNameInput}
          className='input-name'
        />
        <TextField
          error={inputPassError}
          required
          id='outlined-password-input'
          label='Password - hint: Bar'
          type='password'
          autoComplete='current-password'
          onChange={getPassInput}
          className='input-pass'
        />
        <Button
          variant='contained'
          className='input-submit'
          onClick={submitHandler}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Login;
