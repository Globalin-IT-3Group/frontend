import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import MainRouter from "./main-router";
import { store, persistor } from "./store/index";
import { PersistGate } from "redux-persist/integration/react";
import NotificationHandler from "./components/events/NotificationHandler";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* ✅ 알림 수신 핸들러 */}
        <NotificationHandler />
        <Toaster position="top-right" />
        <RouterProvider router={MainRouter} />
      </PersistGate>
    </Provider>
  );
}

export default App;
