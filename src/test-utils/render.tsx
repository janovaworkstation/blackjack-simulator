import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';

// If you have context providers (e.g., for theme, state management), you can wrap the UI here.
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
  // Example with a theme provider:
  // import { ThemeProvider } from 'my-theme-provider';
  // return <ThemeProvider>{children}</ThemeProvider>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options });

// Re-export everything from testing-library/react
export * from '@testing-library/react';

// Override the render method with our custom one
export { customRender as render };
