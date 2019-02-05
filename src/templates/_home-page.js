/** @jsx jsx */
import { jsx } from '@emotion/core'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { ThemeProvider } from 'emotion-theming'
import theme from '../components/theme'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import { HTMLContent } from '../components/Content'

export const HomePageTemplate = ({ heroes }) => {
  // const PageContent = contentComponent || Content

  return (
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
              bgImage={bg && bg.image}
              buttonText={button && button.text}
              buttonURL={button && button.url}
              context={context}
              heading={heading}
              image={image && image.image}
              imageAlign={image && image.align}
              subsections={subsections}
            >
              {body}
            </Hero>
          )
        })}
      </section>
    </ThemeProvider>
  )
}

HomePageTemplate.propTypes = {
  heroes: PropTypes.shape({
    context: PropTypes.string,
  }),
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const HomePage = ({ data }) => {
  // const { markdownRemark: post } = data
  // const { edges } = data.allMarkdownRemark;
  // const heroes = edges[0].node.frontmatter.heroes;

  console.log(data, 'data HomePage')
  return (
    <Layout>
      <h1>HomePage Component Loaded</h1>
      <HomePageTemplate
        heroes={data}
        content={data.html}
        contentComponent={HTMLContent}
      />
    </Layout>
  )
}

HomePage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default HomeHeroes

export const homePageQuery = graphql`
  query HomePage {
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
