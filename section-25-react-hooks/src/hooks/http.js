import { useReducer, useCallback } from "react";

const initialState = {
  loading: false,
  error: "",
  data: null,
  extra: null,
};

const httpReducer = (httpState, action) => {
  switch (action.type) {
    case "SEND":
      return { loading: true, error: null, data: null, extra: null };

    case "RESPONSE":
      return {
        ...httpState,
        loading: false,
        data: action.responseData,
        extra: action.extra,
      };

    case "ERROR":
      return { loading: false, error: action.error };

    case "CLEAR":
      return initialState;

    default:
      throw new Error("Ingredients -> httpReducer -> Case not handled");
  }
};

// custom hooks have to be `use<Something>
const useHttp = () => {
  const [httpState, dispatchHttp] = useReducer(httpReducer, initialState);

  const clear = useCallback(() => {
    dispatchHttp({type: "CLEAR"})
  }, [])

  const sendRequest = useCallback((url, method, body, extra) => {
    dispatchHttp({ type: "SEND" });
    fetch(url, {
      method: method,
      body: body,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        dispatchHttp({
          type: "RESPONSE",
          responseData: responseData,
          extra: extra,
        });
      })
      .catch((error) => {
        dispatchHttp({ type: "ERROR", error: error.message });
      });
  }, []);

  return {
    isLoading: httpState.loading,
    data: httpState.data,
    error: httpState.error,
    extra: httpState.extra,
    sendRequest: sendRequest,
    clear: clear,
  };
};

export default useHttp;
