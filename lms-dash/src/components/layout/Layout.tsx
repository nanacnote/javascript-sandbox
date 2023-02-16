import React from 'react';
import { Layout as ALayout, Breadcrumb, Menu } from 'antd';
import { GlobalDataContext } from '../../context';

interface TProps {
  header: JSX.Element;
  body: JSX.Element | string;
  footer: JSX.Element | string;
}

/**
 * Layout component
 *
 * @property JSX.Element
 * @property JSX.Element
 * @property JSX.Element
 */
const Layout: React.FC<TProps> = ({ header, body, footer }): JSX.Element => {
  const [collapsed, setCollapsed] = React.useState(false);
  const { sideMenuItems, breadcrumbItems, currentViewKey, changeView } =
    React.useContext(GlobalDataContext);

  return (
    <ALayout style={{ height: '100vh', overflow: 'hidden' }}>
      <ALayout.Sider
        theme="dark"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          style={{
            height: 32,
            margin: 16,
            background: 'rgba(255, 255, 255, 0.2)'
          }}
        />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[currentViewKey]}
          items={sideMenuItems}
          onClick={changeView}
        />
      </ALayout.Sider>
      <ALayout>
        <ALayout.Header style={{ padding: 0 }}>{header}</ALayout.Header>
        <ALayout>
          <ALayout.Content
            style={{
              padding: '0 16px',
              overflow: 'hidden scroll'
            }}
          >
            <Breadcrumb style={{ margin: '16px 0' }}>
              {breadcrumbItems.map((item: any) => (
                <Breadcrumb.Item key={item.key} href={item.href}>
                  {item.label}
                </Breadcrumb.Item>
              ))}
            </Breadcrumb>
            {body}
          </ALayout.Content>
          <ALayout.Footer>{footer}</ALayout.Footer>
        </ALayout>
      </ALayout>
    </ALayout>
  );
};

export default Layout;
