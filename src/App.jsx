import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import MainRouter from "./main-router";

function App() {
  return (
    // <Provider store={store}>
    <RouterProvider router={MainRouter} />
    // {/* </Provider> */}
  );
}

export default App;
