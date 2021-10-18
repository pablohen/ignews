import React, { cloneElement, ReactElement } from 'react';
import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';

interface Props extends LinkProps {
  children: ReactElement;
  activeClassName: string;
}

const ActiveLink = ({ children, activeClassName, ...rest }: Props) => {
  const { asPath } = useRouter();

  const className = asPath === rest.href ? activeClassName : '';

  return (
    <Link {...rest}>
      {cloneElement(children, {
        className,
      })}
    </Link>
  );
};

export default ActiveLink;
