import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { store } from "./store";

export const ReduxProvider = <T extends {}>(
  Component: React.ComponentType<T>
) => {
  const persistor = persistStore(store);

  const EnhancedComponent: React.FC<T> = (props) => (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Component {...props} />
      </PersistGate>
    </Provider>
  );

  return EnhancedComponent;
};
