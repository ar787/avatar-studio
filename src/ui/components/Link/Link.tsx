import { createLink } from '@tanstack/react-router';
import MuiLink from '@mui/material/Link';
import type { LinkProps as MuiLinkProps } from '@mui/material/Link';
import React from 'react';

export type LinkProps = MuiLinkProps;

const MuiLinkComponent = React.forwardRef<HTMLAnchorElement, MuiLinkProps>(
  ({ underline = 'none', variant = 'body1', ...rest }, ref) => (
    <MuiLink ref={ref} underline={underline} variant={variant} {...rest} />
  ),
);

export const Link = createLink(MuiLinkComponent);
