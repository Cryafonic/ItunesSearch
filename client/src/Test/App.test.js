import {cleanup, React, render, renderer} from "@testing-library/react";
import App from '../App';
import FormInputClass from "../components/formInput/FormInputClass";
import {mount, shallow} from 'enzyme';
// import { expect } from "chai";

afterEach(cleanup);

describe("Tests for app.js" , () => {
  it("checking for unexpected changes.", () => {
    const wrapper = render(<App />)
    expect(wrapper).toMatchSnapshot();
  })

  it("testing if components match is falsy", async () => {
    const wrapper = render(<FormInputClass />);
    const wrapper1 = render(<App />);
    expect(wrapper).not.toBe(wrapper1);
  });

  it("test's if the input handles change events when given a new value", () => {
    const wrapper = shallow(<FormInputClass />);
    wrapper.find('input').simulate("change",{
      target: { input: "Hello"}
    });
  });
})


