import * as React from 'react';

import Page from './layouts/page';

export default class App extends React.Component<any, any> {
  render() {
    return (
      <Page>
        <app id="app">Loading...</app>

        <script src="/jspm_packages/system.js"></script>
        <script src="/config.js"></script>
      </Page>
    );
  }
}
