import React from 'react'
import ContentStyled from './ContentStyles'

import AppRouter from '../router/AppRouter'

const Content = props => {
  return (
    <ContentStyled>
      <AppRouter />
    </ContentStyled>
  )
}

export default Content
