import '@testing-library/jest-dom';

// Setup JSDOM environment
import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Setup DOM globals for testing
global.URL = {
  createObjectURL: jest.fn(() => 'mock-url'),
  revokeObjectURL: jest.fn(),
} as unknown as typeof URL;

// Mock Blob for CSV download tests
global.Blob = jest.fn((content, options) => ({
  content,
  options,
})) as unknown as typeof Blob;

// Ensure document has a body
if (!document.body) {
  document.body = document.createElement('body');
}

// Add basic document setup
const originalCreateElement = document.createElement.bind(document);
document.createElement = jest.fn((tagName) => {
  if (tagName === 'a') {
    const element = originalCreateElement(tagName);
    element.click = jest.fn();
    element.setAttribute = jest.fn();
    Object.defineProperty(element, 'download', {
      writable: true,
      value: '',
    });
    Object.defineProperty(element, 'href', {
      writable: true,
      value: '',
    });
    return element;
  }
  return originalCreateElement(tagName);
});

const originalAppendChild = document.body.appendChild.bind(document.body);
document.body.appendChild = jest.fn((node) => {
  return originalAppendChild(node);
});

const originalRemoveChild = document.body.removeChild.bind(document.body);
document.body.removeChild = jest.fn((node) => {
  return originalRemoveChild(node);
});
