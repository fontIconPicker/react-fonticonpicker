// Copyright (c) 2018 Swashata Ghosh <swashata@wpquark.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import className from 'classnames';
import routes from '../helpers/routes';

class Sidebar extends React.Component {
	state = {
		isOpen: true,
	};

	handleToggle = e => {
		e.preventDefault();
		this.setState(prevState => {
			const isOpen = !prevState.isOpen;
			return { isOpen };
		});
	};

	render() {
		const menuClass = className('hamburger', 'hamburger--elastic', {
			'is-active': this.state.isOpen,
		});
		return (
			<div className="sidebar">
				<nav>
					<button
						className={menuClass}
						type="button"
						onClick={this.handleToggle}
					>
						<span className="hamburger-box">
							<span className="hamburger-inner" />
						</span>
					</button>
					<ul className="nav-main">
						{routes.map(item => (
							<li key={item.component} className="asd">
								<NavLink
									to={item.path}
									activeClassName="active"
								>
									{item.menu}
								</NavLink>
							</li>
						))}
					</ul>
				</nav>
			</div>
		);
	}
}

export default Sidebar;
