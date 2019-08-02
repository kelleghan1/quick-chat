import React from 'react';
import ChatForm from './ChatForm';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme'

Enzyme.configure({ adapter: new Adapter() })

describe('ChatForm component exists', () => {
  test('renders', () => {
    const chatForm = shallow(<ChatForm />);

    expect(chatForm.exists()).toBe(true)
  })

  test('user text is echoed', () => {
    const chatForm = shallow(<ChatForm />);

    chatForm.find('#message-input').simulate('change', {
      target: { value: 'Hello' }
    })

    expect(chatForm.find('#message-input').props().value).toEqual('Hello')
  })
})
