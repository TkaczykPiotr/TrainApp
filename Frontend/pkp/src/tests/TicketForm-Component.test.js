import React from "react";

import ReactDOM from 'react-dom/client';
import {Site} from "../components/Site";

describe("Button component", () => {
  test("Matches the snapshot", () => {

      const div= ReactDOM.createRoot(document.getElementById('root'));
      ReactDOM.render(<Site></Site>, div)
  });
});

