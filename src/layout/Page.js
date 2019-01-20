import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { PageStyles } from './PageStyles'
import { GlobalStyles } from './GlobalStyles'
import Header from './Header'
import Footer from './Footer'
import Content from './Content'

class Page extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <GlobalStyles />
          <PageStyles>
            <Header>
              <h1 css={'color:var(--color-primary);'}>
                Page 1 title
              </h1>
            </Header>
            <Content />
            <Footer>
              <h3>This is my footer content</h3>
            </Footer>
          </PageStyles>
        </React.Fragment>
      </BrowserRouter>
    )
  }
}

export default Page
