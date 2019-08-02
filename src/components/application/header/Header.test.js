import React from 'react';
import Header from './Header';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from "enzyme"

Enzyme.configure({ adapter: new Adapter() })

describe("Header component", () => {
  test("renders", () => {
    const header = shallow(<Header />);

    expect(header.exists()).toBe(true)
  })
})
