 import React from 'react';
 import { shallow } from 'enzyme';
 import ListGroup from './ListGroup'
 
 let wrapped;

 beforeEach(() => {
   wrapped = shallow(<ListGroup />)
 });

 afterEach(() => {
   wrapped.unmount();
 });

 describe('<ListGroup />', () => {
   
   it('exists', () => {
     expect(wrapped.exists()).toBe(true)
   })

   it('has a class of list-group', () => {
     expect(wrapped.hasClass('list-group')).toBe(true)
   })
 })