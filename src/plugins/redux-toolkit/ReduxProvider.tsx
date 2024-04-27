import { Provider } from "react-redux";
import { store } from "./store";
import React from "react";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

function ReduxProvider<T>(Component: React.FunctionComponent<T>) {
  let persistor = persistStore(store);
  return function inject(props: any) {
    //need to replace any, "Type 'T' is not assignable to type 'IntrinsicAttributes & T'."
    const EnhancedComponent = () => (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Component {...props} />
        </PersistGate>
      </Provider>
    );

    return <EnhancedComponent />;
  };
}

export default ReduxProvider;
