import React from "react";
import { render, unmountComponentAtNode} from "react-dom";
import {cleanup } from '@testing-library/react';
import { act } from "react-dom/test-utils";
import {TicketForm} from "../components/TicketForm-Component";
import ReactDOM from 'react-dom/client';
import {Site} from "../components/Site";
import {SiteService} from "../services/sitesService";
import renderer from 'react-test-renderer';
import { create } from "react-test-renderer";
//import {TestRenderer} from 'react-test-renderer';
//import {ShallowRenderer} from 'react-test-renderer/shallow';


//it('renders correctly enzyme', () => {
//  const wrapper = shallow(<Basic />)
//
//  expect(toJson(wrapper)).toMatchSnapshot();
//});




describe("Button component", () => {
  test("Matches the snapshot", () => {
//    const site = ReactDOM.render(document.getElementById('root'));
    //expect(site.toJSON()).toMatchSnapshot() ;

      const div= ReactDOM.createRoot(document.getElementById('root'));
      ReactDOM.render(<Site></Site>, div)
  });
});

//it("renders without crashing", ()=> {
//    const div = document.createElement("div");
//    ReactDOM.renderer(<Site></Site>, div)
//
//})

//afterEach(cleanup);
//
//  it('should equal to 0', () => {
//    const { getByTestId } = render(<Site />);
//    expect(getByTestId('currentUser')).toHaveTextContent(0)
//   });


//let container = null;
//beforeEach(() => {
//  // ustaw element DOM jako cel renderowania
//  container = document.createElement("div");
//  document.body.appendChild(container);
//});
//
//afterEach(() => {
//  // posprzątaj po zakończeniu
//  unmountComponentAtNode(container);
//  container.remove();
//  container = null;
//});
//act(() => {
//  render(<TicketForm />, container);
//});
//expect(container.textContent).toBe("aaaa");
// wykonaj sprawdzenia
//it("renders without crashing", ()=> {
//    //const root = ReactDOM.document.getElementById('root');
//    const div = document.createElement("div");
//    ReactDOM.render(<TicketForm></TicketForm>, div)
//
//})