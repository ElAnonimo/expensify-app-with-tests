import React from 'react';
import { Header } from '../../components/Header';
import { shallow } from 'enzyme';
// import toJson from 'enzyme-to-json';
import ReactShallowRenderer from 'react-test-renderer/shallow';

test('should render Header', () => {
	const wrapper = shallow(<Header startLogout={() => {}} />);
	// expect(toJson(wrapper)).toMatchSnapshot();
	expect(wrapper).toMatchSnapshot();

	// expect(wrapper.find('h1').text()).toBe('Expensify');
	// expect(wrapper.find('h1').length).toBe(1);

	/* const renderer = new ReactShallowRenderer();
	renderer.render(<Header />);
	expect(renderer.getRenderOutput()).toMatchSnapshot(); */
});

test('should call startLogout()', () => {
	const startLogout = jest.fn();
	const wrapper = shallow(<Header startLogout={startLogout} />);
	wrapper.find('button').simulate('click');
	expect(startLogout).toHaveBeenCalled();
});
