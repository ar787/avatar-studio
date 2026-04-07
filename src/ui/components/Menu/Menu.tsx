import { type MenuProps as MUIMenuProps } from '@mui/material/Menu';
import { StyledMenu } from './Menu.styles';

export type MenuProps = MUIMenuProps;

export const Menu = ({ children, ...props }: MenuProps) => {
  return <StyledMenu {...props}>{children}</StyledMenu>;
};
