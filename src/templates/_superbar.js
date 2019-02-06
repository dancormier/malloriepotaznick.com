/** @jsx jsx */
import { jsx } from '@emotion/core';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'emotion-theming';
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import Container from '../components/Container';
import theme from '../components/Utility/theme';

const contactBarItems = [
  {
    label: 'address',
    text: '9732 W Sample Rd, Coral Springs, FL 33065',
    icon: <FaMapMarkerAlt />,
  }, {
    label: 'email',
    text: 'malloriepotaznick@gmail.com',
    icon: <FaEnvelope />,
  }, {
    label: 'phone',
    text: '(561) 536-3980‬',
    icon: <FaPhone />,
  },
];

export const SuperbarTemplate = () => (
  <ThemeProvider theme={theme}>
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
          paddingTop: theme.size(1),
          paddingBottom: theme.size(1),
        }}
      >
        {contactBarItems.map(c =>
          <div
            key={c.label}
            css={{
              alignItems: 'center',
              display: 'flex',
              marginRight: c.label === 'address' && 'auto',
              marginLeft: c.label !== 'address' && theme.size(2),
            }}
          >
            {c.icon}
            <span css={{ marginLeft: theme.size(-1) }}>
              {c.text}
            </span>
          </div>
        )}
      </Container>
    </div>
  </ThemeProvider>
);

SuperbarTemplate.propTypes = {
  nothing: PropTypes.any,
}

const Superbar = () => (
  <SuperbarTemplate />
);

Superbar.propTypes = {
  nothing: PropTypes.any,
};

export default Superbar;