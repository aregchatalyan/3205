import React, { ChangeEvent, useState } from 'react';
import qs from 'qs';
import { ApiData, useHttp, ValidationError } from './hooks/http.hook';

interface Email {
  email: string | undefined;
  number: string | undefined;
}

interface Data extends ApiData {
  message?: string;
  data?: Email[],
  errors?: {
    email: ValidationError;
    number: ValidationError;
  }
}

const API_URL = process.env.REACT_APP_API_URL;
let controller: AbortController | null = null;

const App = () => {
  const [ data, setData ] = useState<Data | null>(null);
  const [ form, setForm ] = useState<Email>({
    email: undefined,
    number: undefined
  });

  const { request, loading } = useHttp();

  const onFormChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (controller) {
      controller.abort();
    }

    controller = new AbortController();
    const signal = controller.signal;

    setForm({ ...form, [e.target.name]: e.target.value });

    const query = qs.stringify({ ...form, [e.target.name]: e.target.value });
    const data = await request(`${ API_URL }/emails?${ query }`, { signal });
    if (data) setData(data);

    controller = null;
  }

  return (
    <div className="container">
      <div className="form">
        <span className="messages">
          { data?.message ? data.message : loading ? 'Loading...' : '3205 Test' }
        </span>

        <div className="input-container">
          <input type="text" name="email" placeholder="email" value={ form.email || '' } onChange={ onFormChange }/>
          { data?.errors?.email && <span className="validation-message">{ data.errors.email.msg }</span> }
        </div>

        <div className="input-container">
          <input type="text" name="number" placeholder="number" value={ form.number || '' } onChange={ onFormChange }/>
          { data?.errors?.number && <span className="validation-message">{ data.errors.number.msg }</span> }
        </div>
      </div>

      { data?.data && (
        <table className="table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Number</th>
            </tr>
          </thead>
          <tbody>
            { data?.data?.map(({ email, number }) => (
              <tr key={ number }>
                <td>{ email }</td>
                <td>{ number }</td>
              </tr>
            )) }
          </tbody>
        </table>
      ) }
    </div>
  );
}

export default App;
