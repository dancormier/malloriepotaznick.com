import React from 'react'
import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/core'

class CSSInjector extends React.Component {
  constructor() {
    super()
    const iframe = document.getElementsByTagName('iframe')[0]
    const iframeHead = iframe.contentDocument.head
    this.cache = createCache({ container: iframeHead })
  }

  render() {
    return (
      <CacheProvider value={this.cache}>
        {this.props.children}
      </CacheProvider>
    )
  }
}

export default CSSInjector;