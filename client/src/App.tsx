import React, { ChangeEvent, useState } from 'react';
import qs from 'qs';
import { ApiData, Email } from './types';
import { useHttp } from './hooks/http.hook';

let controller: AbortController | null = null;
const API_URL = process.env.REACT_APP_API_URL;

const App = () => {
  const { request, loading } = useHttp();

  const [ data, setData ] = useState<ApiData | null>(null);
  const [ form, setForm ] = useState<Email>({
    email: '',
    number: ''
  });

  const onFormChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (controller) controller.abort();

    controller = new AbortController();
    const signal = controller.signal;

    const query = {
      ...form,
      [e.target.name]: e.target.value
    }

    setForm(query);

    const queryString = qs.stringify(query, {
      skipNulls: true,
      filter: (_, value) => value || undefined
    });

    const data = await request(`${ API_URL }/emails?${ queryString }`, { signal });
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
