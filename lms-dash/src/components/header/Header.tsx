import React from 'react';
import styles from './header.module.css';
import cx from 'classnames';
import { Avatar, theme } from 'antd';

interface TProps {}

/**
 * Header component
 *
 */
const Header: React.FC<TProps> = (): JSX.Element => {
  const { token } = theme.useToken();

  return (
    <div
      className={cx(styles.container)}
      style={{
        padding: '0 16px',
        textAlign: 'right',
        background: token.colorBgContainer
      }}
    >
      <Avatar
        size="large"
        style={{ backgroundColor: '#1890ff' }}
        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
      />
    </div>
  );
};

export default Header;
