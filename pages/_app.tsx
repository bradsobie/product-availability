import NextApp from 'next/app'
import React from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { ThemeProvider as MaterialThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Head from 'next/head';
import { GlobalStyle } from '../src/GlobalStyles';

const theme = {
  ...createMuiTheme()
}

export default class App extends NextApp {
  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentNode)
      jssStyles.parentNode.removeChild(jssStyles)
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <StyledThemeProvider theme={theme}>
        <MaterialThemeProvider theme={theme}>
          <Head>
            <title>Product Availability</title>
            <link rel="icon" href="/favicon.svg" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
            <script dangerouslySetInnerHTML={{ __html: `
              window.initMap = function(){}
            `}} />
            <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBhWfPD2n4uuD_cHbASZJQncDY1RQOBKpM&callback=initMap&libraries=places"></script>
          </Head>

          <GlobalStyle />

          <Component {...pageProps} />
        </MaterialThemeProvider>
      </StyledThemeProvider>
    )
  }
}
