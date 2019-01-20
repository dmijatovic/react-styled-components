import React from 'react'
import HeaderStyles from './HeaderStyles'

const Header = props => {
  return <HeaderStyles>{props.children}</HeaderStyles>
}

export default Header
