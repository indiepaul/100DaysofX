import React from 'react';
import { Grid, PageHeader } from 'react-bootstrap';

import Header from './Header';

const App = ({ children, auth, ...props }) => (
  <Grid>
    <Header auth={auth} />
    <main style={{paddingTop: 20}}>
      <PageHeader>
        100 Days of X <small>Challenge</small>
      </PageHeader>
      {children}
    </main>
  </Grid>
);

export default App;