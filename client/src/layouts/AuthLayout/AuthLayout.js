import React, { Component } from 'react'

class AuthLayout extends Component {
  render() {
    const { children } = this.props

    return (
      <main className="auth-layout">
        <section className="auth-layout__body">{children}</section>
      </main>
    )
  }
}

export default AuthLayout
