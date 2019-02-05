/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { ThemeProvider } from 'emotion-theming'
import theme from '../components/theme'
import Layout from '../components/Layout'
import Hero from '../components/Hero'

export default class IndexPage extends React.Component {
  render() {
    const { data } = this.props;
    const { edges } = data.allMarkdownRemark;
    const heroes = edges[0].node.frontmatter.heroes;

    return (
      <Layout>
        <ThemeProvider theme={theme}>
          <section>
            {heroes.map((hero, i) => {
              const {
                background: bg,
                body,
                button,
                context,
                heading,
                image,
                subsections,
              } = hero;

              return (
                <Hero
                  key={heading}
                  altBG={i % 2 !== 0}
                  bgAlign={bg && bg.align}
                  bgImage={bg && bg.image && bg.image.childImageSharp.fixed.src}
                  buttonText={button && button.text}
                  buttonURL={button && button.url}
                  context={context}
                  heading={heading}
                  image={image && image.image.childImageSharp.fixed.src}
                  imageAlign={image && image.align}
                  subsections={subsections}
                >
                  {body}
                </Hero>
              )
            })}
          </section>
        </ThemeProvider>
      </Layout>
    )
  }
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] },
      filter: { frontmatter: { templateKey: { eq: "_home-page" } }}
    ) {
      edges {
        node {
          frontmatter {
            heroes {
              background {
                align
                image {
                  childImageSharp {
                    fixed(width: 1000) {
                      src
                    }
                  }
                }
              }
              body
              button {
                text
                url
              }
              context
              heading
              image {
                align
                image {
                  childImageSharp {
                    fixed(width: 400) {
                      src
                    }
                  }
                }
              }
              subsections {
                heading
                body
              }
            }
          }
        }
      }
    }
  }
`