import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import MainRouter from "./main-router";
import { store, persistor } from "./store/index";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={MainRouter} />
      </PersistGate>
    </Provider>
  );
}

export default App;
