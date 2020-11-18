import React from "react";
/** @jsx jsx */
import { jsx } from '@emotion/react'
import { event } from 'react-ga'
import { navigate } from "gatsby-link"
import Button from './Button'
import theme from './Utility/theme'

const inputStyle = {
  border: `1px solid ${theme.color('gray-l')}`,
  borderRadius: '3px',
  boxSizing: 'border-box',
  fontFamily: theme.font('serif'),
  fontSize: theme.size(2),
  padding: `${theme.size(0)} ${theme.size(0)}`,
  width: '100%',
}

const fields = [
  {
    label: 'Name',
    name: 'name',
    required: true,
    type: 'text',
  }, {
    label: 'Email',
    name: 'email',
    required: true,
    type: 'email',
  }, {
    label: 'Message',
    name: 'message',
    required: true,
    type: 'textarea',
  }, {
    label: 'Send Message',
    name: 'button',
    type: 'submit',
  },
];

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

export default class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isValidated: false };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    event({
      category: 'contact-form',
      action: 'submit',
      label: 'send',
    });
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": form.getAttribute("name"),
        ...this.state
      })
    })
      .then(() => {
        navigate(form.getAttribute("action"));
        event({
          category: 'contact-form',
          action: 'submit',
          label: 'success',
        });
      })
      .catch(error => {
        alert(error);
        event({
          category: 'contact-form',
          action: 'submit',
          label: 'failure',
        });
      });
  };

  render() {
    const {
      onClick,
    } = this.props;
    return (
      <form
        name="contact"
        method="post"
        action="/contact/thanks"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={(e) => {
          if (onClick) {
            onClick();
          }
          this.handleSubmit(e);
        }}
      >
        {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
        <input type="hidden" name="form-name" value="contact" />
        <div hidden>
          <label>
            Don’t fill this out:{" "}
            <input name="bot-field" onChange={this.handleChange} />
          </label>
        </div>

        {fields.map(field => {
          const {
            label,
            name,
            required,
            type,
          } = field;

          return type === 'text' || type === 'email' || type === 'textarea' ? (
            <div
              key={name}
              css={{
                marginBottom: theme.size(4),
              }}
            >
              <label
                htmlFor={name}
                css={{
                  display: 'block',
                  fontSize: theme.size(2),
                  marginBottom: theme.size(-1),
                }}
              >
                {label}
              </label>
              {type !== 'textarea' ? (
                <input
                  css={{
                    ...inputStyle,
                  }}
                  id={name}
                  onChange={this.handleChange}
                  name={name}
                  required={required}
                  type={type}
                />
              ) : (
                <textarea
                  css={{
                    ...inputStyle,
                    minHeight: theme.size(13),
                  }}
                  id={name}
                  onChange={this.handleChange}
                  name={name}
                  required={true}
                />
              )}
            </div>
          ) : type === 'submit' && (
            <Button
              key={name}
              type={type}
            >
              {label}
            </Button>
          );
        })}
      </form>
    );
  }
}