import React from 'react';
import { Link } from 'react-router-dom';
import FontIconPicker from '../../../js/FontIconPicker';
import * as iconDefs from '../../helpers/iconDefs';

class Examples extends React.PureComponent {
	state = {
		value1: 57436,
		value2: [],
		value3: 57595,
		value4: [57475, 57476, 57477, 57539, 57662, 57404, 57405, 57408],
	};

	handleChange = (key, value) => {
		const newValue = Array.isArray(value) ? [...value] : value;
		this.setState({ [key]: newValue });
	};

	renderSVG = svg => (
		<svg>
			<use xlinkHref={`#${svg}`} />
		</svg>
	);

	render() {
		return (
			<React.Fragment>
				<h2>Examples and Few Use Cases</h2>
				<p>Here you will find plenty of examples and use cases.</p>
				<p>
					You can get the full source code{' '}
					<a href="https://github.com/fontIconPicker/react-fonticonpicker/blob/master/src/docs/components/pages/Examples.jsx">
						here
					</a>.
				</p>
				<ul className="list-group">
					<li className="list-group-item list-group-item-action flex-column align-items-start">
						<div className="d-flex w-100 justify-content-between">
							<h5 className="mb-1">
								Append to Body & Single Picker
							</h5>
							<small>
								<code>
									isMulti={'{false}'}{' '}
									appendTo=&quot;body&quot;
								</code>
							</small>
						</div>
						<p className="mb-1">
							The picker element uses{' '}
							<code>appendTo=&quot;body&quot;</code> to append the
							protal to body. This uses{' '}
							<code>React.createPortal</code> to append the
							dropdown to another element.
						</p>
						<FontIconPicker
							icons={iconDefs.icomoonIcons}
							search={iconDefs.icomoonIconsSearch}
							onChange={value =>
								this.handleChange('value1', value)
							}
							appendTo="body"
							value={this.state.value1}
							isMulti={false}
							theme="bluegrey"
							renderUsing="data-icomoon"
						/>
						<p>
							<small>
								Current value:{' '}
								<span className="badge badge-light">
									<i
										data-icomoon={String.fromCodePoint(
											this.state.value1,
										)}
									/>
								</span>
							</small>
						</p>
					</li>
					<li className="list-group-item list-group-item-action flex-column align-items-start">
						<div className="d-flex w-100 justify-content-between">
							<h5 className="mb-1">
								Append to Body & Multi Picker
							</h5>
							<small className="text-muted">
								<code>
									isMulti={'{true}'} appendTo=&quot;body&quot;
								</code>
							</small>
						</div>
						<p className="mb-1">
							The component uses <code>isMulti</code> (default) to
							pick multiple values.
						</p>
						<FontIconPicker
							icons={iconDefs.icomoonIcons}
							search={iconDefs.icomoonIconsSearch}
							onChange={value =>
								this.handleChange('value2', value)
							}
							appendTo="body"
							value={this.state.value2}
							isMulti
							theme="bluegrey"
							renderUsing="data-icomoon"
						/>
						<p>
							<small className="text-muted">
								Current values:{' '}
								{this.state.value2.map(value => (
									<span
										className="badge badge-light"
										key={value}
									>
										<i
											data-icomoon={String.fromCodePoint(
												value,
											)}
										/>
									</span>
								))}
							</small>
						</p>
					</li>
					<li className="list-group-item list-group-item-action flex-column align-items-start">
						<div className="d-flex w-100 justify-content-between">
							<h5 className="mb-1">
								Append to Self & Single Picker
							</h5>
							<small className="text-muted">
								<code>
									isMulti={'{false}'}{' '}
									appendTo=&quot;self&quot;
								</code>
							</small>
						</div>
						<p className="mb-1">
							The element uses{' '}
							<code>
								appendTo=&quot;self&quot; isMulti={'{false}'}
							</code>{' '}
							to append to the current div instead of somewhere
							else.
						</p>
						<FontIconPicker
							icons={iconDefs.icomoonIcons}
							search={iconDefs.icomoonIconsSearch}
							value={this.state.value3}
							onChange={value =>
								this.handleChange('value3', value)
							}
							isMulti={false}
							renderUsing="data-icomoon"
						/>
						<p>
							<small className="text-muted">
								Current value:{' '}
								<span className="badge badge-light">
									<i
										data-icomoon={String.fromCodePoint(
											this.state.value3,
										)}
									/>
								</span>
							</small>
						</p>
					</li>
					<li className="list-group-item list-group-item-action flex-column align-items-start">
						<div className="d-flex w-100 justify-content-between">
							<h5 className="mb-1">
								Append to Self & Multi Picker
							</h5>
							<small className="text-muted">
								<code>
									isMulti={'{true}'} appendTo=&quot;self&quot;
								</code>
							</small>
						</div>
						<p className="mb-1">
							The element uses{' '}
							<code>
								appendTo=&quot;self&quot; isMulti={'{true}'}
							</code>{' '}
							to pick multiple icons.
						</p>
						<FontIconPicker
							icons={iconDefs.icomoonIcons}
							search={iconDefs.icomoonIconsSearch}
							value={this.state.value4}
							onChange={value =>
								this.handleChange('value4', value)
							}
							isMulti
							renderUsing="data-icomoon"
						/>
						<p>
							<small className="text-muted">
								Current value<strong>s</strong>:{' '}
								{this.state.value4.map(value => (
									<span
										className="badge badge-light"
										key={value}
									>
										<i
											data-icomoon={String.fromCodePoint(
												value,
											)}
										/>
									</span>
								))}
							</small>
						</p>
					</li>
					<li className="list-group-item list-group-item-action flex-column align-items-start">
						<div className="d-flex w-100 justify-content-between">
							<h5 className="mb-1">Implied Search</h5>
							<small className="text-muted">
								<code>search={'{null}'}</code>
							</small>
						</div>
						<p className="mb-1">
							When <code>search</code> is null, the value of{' '}
							<code>icons</code> are used.
						</p>
						<FontIconPicker
							icons={iconDefs.fontelloIcons}
							value={['icon-th', 'icon-video']}
							onChange={val => val}
							renderUsing="class"
							isMulti
						/>
						<small className="text-muted">
							try searching for <em>video</em>.
						</small>
					</li>
					<li className="list-group-item list-group-item-action flex-column align-items-start">
						<div className="d-flex w-100 justify-content-between">
							<h5 className="mb-1">SVG with Custom Rendered</h5>
							<small className="text-muted">
								<code>renderFunc={'{renderSVG}'}</code>
							</small>
						</div>
						<p className="mb-1">
							A custom renderer function is used to render SVG.
							The function takes the value as argument, and should
							return a react element or JSX.
						</p>
						<FontIconPicker
							icons={iconDefs.svgs}
							value={[
								'004-green_lantern',
								'066-daredevil_glasses',
							]}
							onChange={val => val}
							renderFunc={this.renderSVG}
							theme="indigo"
							isMulti
						/>
						<Link
							href="/basic-usage/fip-custom-rendering/"
							to="/basic-usage/fip-custom-rendering/"
							className="btn btn-light"
						>
							See Code
						</Link>
					</li>
					<li className="list-group-item list-group-item-action flex-column align-items-start">
						<div className="d-flex w-100 justify-content-between">
							<h5 className="mb-1">Do not show Category</h5>
							<small className="text-muted">
								<code>showCategory={'{false}'}</code>
							</small>
						</div>
						<p className="mb-1">
							When <code>showCategory={'{false}'}</code>, even
							categorized source is flattened.
						</p>
						<FontIconPicker
							icons={iconDefs.fontAwesome}
							value={[]}
							onChange={val => val}
							showCategory={false}
							theme="purple"
							isMulti
						/>
					</li>
					<li className="list-group-item list-group-item-action flex-column align-items-start">
						<div className="d-flex w-100 justify-content-between">
							<h5 className="mb-1">Do not show Search</h5>
							<small className="text-muted">
								<code>showSearch={'{false}'}</code>
							</small>
						</div>
						<p className="mb-1">
							With <code>showSearch={'{false}'}</code> the search
							input is not displayed.
						</p>
						<FontIconPicker
							icons={iconDefs.fontAwesome}
							value={[]}
							onChange={val => val}
							showSearch={false}
							theme="purple"
							isMulti
						/>
					</li>
					<li className="list-group-item list-group-item-action flex-column align-items-start">
						<div className="d-flex w-100 justify-content-between">
							<h5 className="mb-1">Autoclose on Select</h5>
							<small className="text-muted">
								<code>closeOnSelect={'{true}'}</code>
							</small>
						</div>
						<p className="mb-1">
							With <code>closeOnSelect={'{true}'}</code> the modal
							is closed on icon select.
						</p>
						<FontIconPicker
							icons={iconDefs.fontAwesome}
							value={[]}
							onChange={val => val}
							showSearch={false}
							theme="purple"
							isMulti={false}
							closeOnSelect
						/>
					</li>
					{/* <li className="list-group-item list-group-item-action flex-column align-items-start">
						<div className="d-flex w-100 justify-content-between">
							<h5 className="mb-1">List group item heading</h5>
							<small className="text-muted">3 days ago</small>
						</div>
						<p className="mb-1">
							Donec id elit non mi porta gravida at eget metus.
							Maecenas sed diam eget risus varius blandit.
						</p>
						<small className="text-muted">
							Donec id elit non mi porta.
						</small>
					</li> */}
				</ul>
			</React.Fragment>
		);
	}
}

export default Examples;
