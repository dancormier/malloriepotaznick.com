/** @jsx jsx */
import { jsx } from '@emotion/core'
import { StaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types'
import { ThemeProvider } from 'emotion-theming'
import theme from '../components/Utility/theme'
import Hero from '../components/Hero'

export const HomePageTemplate = ({ heroes, isPreview = false }) => (
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
            buttonText={button && button.text}
            buttonURL={button && button.url}
            context={context}
            heading={heading}
            image={img}
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
    `}
    render={data => {
      const { edges } = data.allMarkdownRemark;
      const heroes = edges[0].node.frontmatter.heroes;

      return <HomePageTemplate heroes={heroes} />;
    }}
  />
);

export default HomePage;