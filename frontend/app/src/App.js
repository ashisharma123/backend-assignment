import React, { useState } from 'react'
import axios, { AxiosError, AxiosResponse } from 'axios'
import './App.css';

function App() {
  const [firstName,setfirstName] = useState("");
  const [lastName,setlastName] = useState("");
  const [email,setemail] = useState("");
  const [password,setpassword] = useState("")
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const validateEmail = (mail) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true
    }
    return false
  }

  const validateForm = () => {
    if (!firstName && !email && !lastName && !password) {
      setError('Please fill all the required fields')
      return false
    }
    if (!firstName) {
      setError('First Name is required')
      return false
    }
    if (!lastName) {
      setError('Last name is required')
      return false
    }
    if (!validateEmail(email)) {
      setError('Please enter valid email')
      return false
    }
    if (!password) {
      setError('Password is required')
      return false
    }
    return true
  }

  const reset = () => {
    setfirstName('')
    setlastName('')
    setemail('')
    setpassword('')
  }

  const postFormData = async (firstName,lastName,email,password) => {
    await new Promise((resolve,reject) => {
      const data = JSON.stringify({
        firstName,
        lastName,
        email,
        password
      })

      const config = createConfig(
        'POST',
        'http://localhost:8080/users/registration',
        data
      )
        console.log("a");
      makeRequest(config,resolve,reject)
    })
  }

  const createConfig = (type, url, data) => {
    return {
      method: type,
      url,
      data,
      headers: {
        'Content-Type': 'application/json',
      }
    }
  }
  
  const makeRequest = (config, resolve, reject)=> {
    axios(config)
      .then(function (response) {
        console.log(config)
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
  }

  const postGoogle = async () => {
    await new Promise((resolve,reject) => {

      const config = createConfig(
        'GET',
        'http://localhost:3002/google',
        null
      )
        console.log('b')
      makeRequest(config,resolve,reject)
    })
  }

  const signFormData = async (firstName,lastName,email,password) => {
    await new Promise((resolve,reject) => {
      const data = JSON.stringify({
        firstName,
        lastName,
        email,
        password
      })

      const config = createConfig(
        'POST',
        'http://localhost:8080/users/registration',
        data
      )
        console.log("a");
      makeRequest(config,resolve,reject)
    })
  }

  // const googleSubmit = () => {
  //   console.log('a');
  //   window?.location?.href = 'http://localhost:3002/google'
  //   postGoogle()
  // }

  const handleSignIn = (e) => {
    if (validateForm()) {
      signFormData(
        firstName,
        lastName,
        email,
        password
      )
        .then((res) => {
          if (res.data === 'OK') {
            const target = e.target
            target.reset()
            reset()
            setSuccess('Your request has been sent successfully')
            setTimeout(() => {
              setSuccess('')
              setError('')
            }, 3000)
          }
        })
        .catch((error) => {
          setError(error.response.data)
          setTimeout(() => {
            setError('')
          }, 3000)
        })
    }

  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      postFormData(
        firstName,
        lastName,
        email,
        password
      )
        .then((res) => {
          if (res.data === 'OK') {
            const target = e.target
            target.reset()
            reset()
            setSuccess('Your request has been sent successfully')
            setTimeout(() => {
              setSuccess('')
              setError('')
            }, 3000)
          }
        })
        .catch((error) => {
          setError(error.response.data)
          setTimeout(() => {
            setError('')
          }, 3000)
        })
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={(e) => {handleSubmit(e)}} className='form-wrapper'>
          <input className='input' type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => {
                  e.stopPropagation()
                  setfirstName(e.target.value)  
                }}
                onFocus={() => {
                  setError('')
                }}/>
          <input className='input' type="text"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => {
                  e.stopPropagation()
                  setlastName(e.target.value)
                }}
                onFocus={() => {
                  setError('')
                }}/>
          <input className='input' type="text"
                placeholder="email"
                value={email}
                onChange={(e) => {
                  e.stopPropagation()
                  setemail(e.target.value)
                }}
                onFocus={() => {
                  setError('')
                }}/>
          <input className='input' type="password"
                placeholder="password"
                value={password}
                onChange={(e) => {
                  e.stopPropagation()
                  setpassword(e.target.value)
                }}
                onFocus={() => {
                  setError('')
                }}/>

              <div className='info'>
                {success !== '' && (<div className='success'>{success}</div>)}
                {error !== '' && (<div className='error'>{error}</div>)}
              </div>

              <button className='button'> Submit</button>
              <button className='button' onClick={handleSignIn}> Sign in</button>
        </form>
        <button>
          <a href='http://localhost:8080/google'> Google </a></button>
        <button>
          <a href='http://localhost:8080/facebook'> facebook  </a></button>
      </header>
    </div>
  );
}

export default App;
