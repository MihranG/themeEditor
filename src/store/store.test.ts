import configureStore from "redux-mock-store";
import { setError, resetToInitialState } from "./store";

// import {initialThemeState as data} from './initialData';

describe("Redux store", () => {
  describe("should have appropriate", () => {
    const mockStore = configureStore();
    const store = mockStore();
    afterEach(() => {
      store.clearActions();
    });

    test("setError action", () => {
      store.dispatch(setError({ id: "h1", parentId: "sizes", error: true }));
      expect(store.getActions()[0]).toEqual({
        payload: {
          error: true,
          id: "h1",
          parentId: "sizes",
        },
        type: "themeReducerSlice/setError",
      });
    });

    test("resetToInitialState action", () => {
      store.dispatch(resetToInitialState());
      expect(store.getActions()[0]).toMatchSnapshot();
      expect(store.getActions()[0]).toEqual({
        type: "themeReducerSlice/resetToInitialState",
      });
    });
  });
});
