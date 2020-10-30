import React, { ReactNode } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { ChakraProvider, ColorModeProvider } from "@chakra-ui/core";
import store from "../../../store/store";
import { Provider } from "react-redux";

const AllTheProviders = ({ children }: { children?: ReactNode }) => {
  return (
    <ChakraProvider>
      <ColorModeProvider options={{ useSystemColorMode: true }}>
        {children}
      </ColorModeProvider>
    </ChakraProvider>
  );
};

const customRender = (
  ui: JSX.Element,
  options:
    | Pick<
        RenderOptions<typeof import("@testing-library/dom/queries")>,
        "container" | "baseElement" | "hydrate" | "wrapper"
      >
    | undefined
) => render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
