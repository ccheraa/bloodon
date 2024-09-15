import { login } from '../lib/auth';

export function LoginForm() {
  return (
    <div>
      <h1>Login Form</h1>
      <button onClick={login}>Login with google</button>
    </div>
  );
}