import { login, logout, useUser } from '../lib/auth';

export function LoginForm() {
  const { user, setUser, isLoading } = useUser();
  return (
    <div>
      { user
        ? <>
          <h1>logged in</h1>
          <button onClick={() => logout().then(setUser)}>Logout</button>
          { user === true
            ? <h1>must register</h1>
            : <h1>does not need to register</h1>
          }
        </>
        : <>
          <h1>Login Form</h1>
          <button disabled={isLoading} onClick={() => login().then(setUser)}>Login with google</button>
        </>
      }
    </div>
  );
}