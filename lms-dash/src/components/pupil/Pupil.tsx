import React from 'react';
import styles from './pupil.module.css';
import cx from 'classnames';
import { Table, Tag } from 'antd';
import { GlobalDataContext } from '../../context';

interface TProps {}

const Pupil: React.FC<TProps> = (): JSX.Element => {
  const { pupilsCard } = React.useContext(GlobalDataContext);

  return (
    <div className={cx(styles.container)}>
      <Table
        bordered
        rowSelection={{ type: 'checkbox' }}
        dataSource={pupilsCard.tableData}
        columns={[
          {
            title: 'Name',
            dataIndex: 'name'
          },
          {
            title: 'Track',
            dataIndex: 'track'
          },
          {
            title: 'Games',
            children: [
              {
                title: 'Played',
                dataIndex: 'playedGames'
              },
              {
                title: 'Favourite',
                dataIndex: 'favouriteGame'
              },
              {
                title: 'Best Score',
                dataIndex: 'bestGameScore',
                render: (text: string) => <Tag color={'blue'}>{text}</Tag>
              }
            ]
          },
          {
            title: 'Books',
            children: [
              {
                title: 'Read',
                dataIndex: 'readBooks'
              },
              {
                title: 'Favourite',
                dataIndex: 'favouriteBook'
              }
            ]
          },
          {
            title: 'Last Seen',
            dataIndex: 'lastSeen',
            render: (text: string) => <Tag color={'green'}>{text}</Tag>
          }
        ]}
      />
    </div>
  );
};

export default Pupil;
