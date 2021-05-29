// import React from 'react'
/** @jsx jsx */
import { jsx } from "@emotion/react";
import theme from "./Utility/theme";

const style = {
  maxWidth: theme.prop("max"),
  margin: "auto",
  paddingLeft: theme.size(3),
  paddingRight: theme.size(3),
  [theme.mq("sm")]: {
    paddingLeft: theme.size(6),
    paddingRight: theme.size(6),
  },
  [theme.mq("xl")]: {
    paddingLeft: 0,
    paddingRight: 0,
  },
};

const Container = ({ customCSS, children }) => (
  <div css={{ ...style, ...customCSS }}>{children}</div>
);

export default Container;
