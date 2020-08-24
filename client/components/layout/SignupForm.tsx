import * as React from 'react';
import FormInput from './FormInput';

interface Props {
  myClassName: string;
  emailValue: string;
  inviteValue: string;
  passwordValue: string;
  handleEmailChange: (event: any) => void;
  handlePasswordChange: (event: any) => void;
  handleInviteChange: (event: any) => void;
  handleSubmit: (event: any) => void;
}

const SignupForm = (props: Props): JSX.Element => (
  <form onSubmit={props.handleSubmit} className={props.myClassName}>
    <label htmlFor="email">E-mail:</label>
    <FormInput
      inputType="email"
      inputName="email"
      inputId="email"
      inputValue={props.emailValue}
      handleInput={props.handleEmailChange}
    />

    <label htmlFor="password">Password:</label>
    <FormInput
      inputType="password"
      inputName="password"
      inputId="password"
      inputValue={props.passwordValue}
      handleInput={props.handlePasswordChange}
    />

    <label htmlFor="invite">Invite:</label>
    <FormInput
      inputType="text"
      inputName="invite"
      inputId="invite"
      inputValue={props.inviteValue}
      handleInput={props.handleInviteChange}
    />

    <input type="submit" value="Submit" className="button--submit" />
  </form>
);

export default SignupForm;
