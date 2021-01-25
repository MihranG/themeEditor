import { unmountComponentAtNode, render } from "react-dom";
import store from "./store/store";
import SimpleEditor from "./SimpleEditor";
import { Provider } from "react-redux";
import { act } from "react-dom/test-utils";
import * as localStorageService from "./helpers/localStorage";

describe("<SimpleEditor />", () => {
  let container: HTMLDivElement | null = null;

  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    // cleanup on exiting
    if (container) {
      unmountComponentAtNode(container);
      container.remove();
      container = null;
    }
  });

  it("renders correctly and adds content", () => {
    act(() => {
      render(
        <Provider store={store}>
          <SimpleEditor />
        </Provider>,
        container
      );
    });
    expect(
      container?.querySelector("[data-testid='editor_title']")?.textContent
    ).toBe("simple text editor");
  });

  it("renders and get theme from localstorage", () => {
    const spy = jest.spyOn(localStorageService, "getThemeFromLocalStorage");
    act(() => {
      render(
        <Provider store={store}>
          <SimpleEditor />
        </Provider>,
        container
      );
    });
    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });

  it("saves and resets on clicks", () => {
    const setLocalStorageSpy = jest.spyOn(
      localStorageService,
      "setThemeToLocalStorage"
    );
    const deleteLocalStorageSpy = jest.spyOn(
      localStorageService,
      "removeThemeFromLocalStorage"
    );
    act(() => {
      render(
        <Provider store={store}>
          <SimpleEditor />
        </Provider>,
        container
      );
    });
    const resetButton = document.querySelector("[data-testid='reset_button']");
    const saveButton = document.querySelector("[data-testid='save_button']");

    expect(resetButton?.innerHTML).toBe("Reset to initial");
    expect(saveButton?.innerHTML).toBe("Save");
    act(() => {
      saveButton?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(setLocalStorageSpy).toHaveBeenCalledTimes(1);

    act(() => {
      resetButton?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(deleteLocalStorageSpy).toHaveBeenCalledTimes(1);
  });
});
