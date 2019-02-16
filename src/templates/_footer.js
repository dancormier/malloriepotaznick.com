/** @jsx jsx */
import { jsx } from '@emotion/core';
import { StaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'emotion-theming';
import Container from '../components/Container';
import FooterContact from '../components/FooterContact';
import theme from '../components/Utility/theme';

const group = (items, grouping) => items.filter(item => item.align === grouping);
const FooterItem = ({ item }) => {
  const {
    align,
    text,
  } = item;

  return (
    <ThemeProvider theme={theme}>
      <div
        key={text}
        css={{
          alignItems: 'center',
          display: 'flex',
          marginRight: align === 'left' && theme.size(2),
          marginLeft: align === 'right' && theme.size(2),
        }}
      >
        {text}
      </div>
    </ThemeProvider>
  );
}

export const FooterTemplate = ({
  body,
  buttons,
  items,
  showFooterContact,
}) => (
  <ThemeProvider theme={theme}>
    <div>
      {showFooterContact && (
        <FooterContact
          body={body}
          buttons={buttons}
          text="Testy!"
        />
      )}
      <div
        css={{
          backgroundColor: theme.color('accent'),
          color: theme.color('white'),
        }}
      >
        <Container
          customCSS={{
            display: 'flex',
            fontFamily: theme.font('sans'),
            fontSize: theme.size(0),
            justifyContent: 'space-between',
            paddingTop: theme.size(1),
            paddingBottom: theme.size(1),
          }}
        >
          <div>
            {group(items, 'left').map(item =>
              <FooterItem item={item} key={item.text} />
            )}
          </div>
          <div css={{ display: 'flex' }}>
            {group(items, 'right').map(item =>
              <FooterItem item={item} key={item.text} />
            )}
          </div>
        </Container>
      </div>
    </div>
  </ThemeProvider>
);

FooterTemplate.propTypes = {
  body: PropTypes.string,
  buttons: PropTypes.any,
  items: PropTypes.any,
  showContactFooter: PropTypes.bool,
}

const Footer = ({ showFooterContact }) => (
  <StaticQuery
    query={graphql`
      query Footer {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] },
          filter: { frontmatter: { templateKey: { eq: "_footer" } }}
        ) {
          edges {
            node {
              frontmatter {
                buttons {
                  text
                  type
                  url
                }
                items {
                  align
                  text
                }
              }
              rawMarkdownBody
            }
          }
        }
      }
    `}
    render={data => {
      const { edges } = data.allMarkdownRemark;
      const { rawMarkdownBody: body, frontmatter } = edges[0].node;
      const {
        buttons,
        items,
      } = frontmatter;

      return (
        <FooterTemplate
          body={body}
          buttons={buttons}
          items={items}
          showFooterContact={showFooterContact}
        />
      )
    }}
  />
);

export default Footer;