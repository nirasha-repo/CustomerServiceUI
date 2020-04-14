import React from 'react';
import ReactDOM, { render } from 'react-dom';
import Customer from "./../customer";

import { shallow } from "enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });


it("renders without crashing", ()=>{
    const div = document.createElement("div");
    ReactDOM.render(<button type='submit'></button>,div);
})


describe("Customer component", () => {
    let wrapper
    let props
    let label
    let input
    let button
    let pdesc

    beforeEach(() => {
         wrapper = shallow(<Customer {...props}/>, { disableLifecycleMethods: true });
         label = wrapper.find('div div form div label');
         input = wrapper.find('div div form div input');
         button= wrapper.find('div div button');
         pdesc = wrapper.find('div div p');
            props = {
                currentCustomer: {
                  id: 1,
                  title: "",
                  description: "",
                  published: true
                },
                message: ""
            }
   
    });

    it("customer heading expected", () => {
        const text = wrapper.find('div div h4')
        expect(text.text()).toBe("Customer");
    });

    it("title label expected ", () => {
       expect(label.first().text()).toBe("Title");
    });
    it("Status: label expected ", () => {
        expect(label.last().text()).toBe("Status:");
     });

     it("title input expected ", () => {
        expect(input.first().prop('id')).toBe("title");
     });
     it("description input expected ", () => {
         expect(input.last().prop('id')).toBe("description");
      });

     it("button button expected ", () => {
        expect(button.first().text()).toBe("Publish");
     });

     it("delete button expected ", () => {
         expect(button.last().text()).toBe("Update");
      });
     
});



