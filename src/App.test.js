import { render } from '@testing-library/react';
import App from './App';

describe('The <App>', function() {
  it('renders without crashing', function() {
    render(<App/>)
  })
})
