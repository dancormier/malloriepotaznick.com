/** @jsx jsx */
import { jsx, ThemeProvider } from '@emotion/react'
import { StaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types'
import theme from '../components/Utility/theme'
import Hero from '../components/Hero'

export const HomePageTemplate = ({ heroes, isPreview = false }) => (
  <ThemeProvider theme={theme}>
    <section>
      {heroes.map((hero, i) => {
        const {
          background: bg,
          body,
          buttons,
          context,
          heading,
          image,
          subsections,
        } = hero;

        const img = image && (
          isPreview ? image.image : image.image.childImageSharp.fixed.src
        );
        const imgBG = bg && (
          isPreview ? bg.image : bg && bg.image.childImageSharp.fixed.src
        );

        return (
          <Hero
            key={heading}
            altBG={i % 2 !== 0}
            bgAlign={bg && bg.align}
            bgImage={imgBG}
            bgInvert={imgBG && bg && bg.invert}
            buttons={buttons}
            context={context}
            heading={heading}
            image={img}
            imageAlign={image && image.align}
            subsections={subsections}
            isPreview={isPreview}
          >
            {body}
          </Hero>
        )
      })}
    </section>
  </ThemeProvider>
)

HomePageTemplate.propTypes = {
  heroes: PropTypes.array.isRequired,
  isPreview: PropTypes.bool,
}

const HomePage = () => (
  <StaticQuery
    query={graphql`
      query HomePageQuery {
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
                    invert
                    image {
                      childImageSharp {
                        fixed(width: 1600) {
                          src
                        }
                      }
                    }
                  }
                  body
                  buttons {
                    text
                    type
                    url
                  }
                  context
                  heading
                  image {
                    align
                    image {
                      childImageSharp {
                        fixed(width: 800) {
                          src
                        }
                      }
                    }
                  }
                  subsections {
                    body
                    title
                    url
                    image {
                      childImageSharp {
                        fixed(width: 600) {
                          src
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={data => {
      const { edges } = data.allMarkdownRemark;
      const heroes = edges[0].node.frontmatter.heroes;

      return <HomePageTemplate heroes={heroes} />;
    }}
  />
);

export default HomePage;