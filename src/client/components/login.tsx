import * as React from 'react';
import { connect } from 'react-redux';
import * as cx from 'classnames';
import { userLogin } from '../actions/user';

interface IEventsProps {
	userLogin: (form: any) => void,
}

class Login extends React.Component<IEventsProps, {}> {
	public render() {
		return (
			<form>
				<ul>
					<li>
						<input
							name="email_address"
							placeholder="Email address"
							type="text"
						/>
					</li>
					<li>
						<input
							name="password"
							placeholder="Password"
							type="password"
						/>
					</li>
					<li>
						<div
							className="submit"
							onClick={this.submit}
						>
							Submit
						</div>
					</li>
				</ul>
			</form>
		);
	}

	private submit = (ev) => {
		const form = document.querySelector('form');
		const formData = new FormData(form);
		this.props.userLogin(formData);
	}
}

export default connect(
	(state) => ({
		authenticated: state.user.authenticated,
		user: state.user.user,
	}),
	{ userLogin },
)(Login);
