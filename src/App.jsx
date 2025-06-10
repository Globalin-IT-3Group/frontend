import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import MainRouter from "./main-router";
import ThemeProvider from "./contexts/ThemeContext";

function App() {
  return (
    // <Provider store={store}>

    <ThemeProvider>
      <RouterProvider router={MainRouter} />
    </ThemeProvider>

    // {/* </Provider> */}
  );
}

export default App;
