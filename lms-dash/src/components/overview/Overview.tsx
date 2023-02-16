import React from 'react';
import styles from './overview.module.css';
import cx from 'classnames';
import CountUp from 'react-countup';
import Chart from 'react-apexcharts';
import { Avatar, Card, Col, Radio, Row, Statistic } from 'antd';
import { GlobalDataContext } from '../../context';
import { UserAddOutlined } from '@ant-design/icons';

interface TProps {}

/**
 * Overview component
 *
 */
const Overview: React.FC<TProps> = (): JSX.Element => {
  const { overviewCard } = React.useContext(GlobalDataContext);
  const [isLoading, setIsLoading] = React.useState(true);

  const formatter = (value: any): React.ReactNode => (
    <CountUp end={value} separator="," />
  );

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 10000);
  }, []);

  return (
    <div className={cx(styles.container)}>
      <Row gutter={[16, 16]}>
        {overviewCard.stats.map((item: any) => (
          <Col key={item.key} span={8}>
            <Card bordered={false} style={{ height: '140px' }}>
              <Card.Meta
                avatar={React.createElement(item.icon, {
                  style: { fontSize: '25px' }
                })}
                title={item.title}
                description={
                  <>
                    <p
                      style={{
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {item.description}
                    </p>
                    <Statistic
                      value={item.value}
                      formatter={formatter}
                      style={{ marginTop: '10px' }}
                    />
                  </>
                }
              />
            </Card>
          </Col>
        ))}
        {overviewCard.sectionPerformance.map((item: any) => (
          <Col key={item.key} span={12}>
            <Row>
              <Col span={24}>
                <Card
                  bordered={false}
                  cover={
                    <div style={{ paddingTop: '15px' }}>
                      <Chart
                        options={item.chartData.options}
                        series={item.chartData.series}
                        type={item.chartData.type}
                        height={'175px'}
                      />
                    </div>
                  }
                >
                  <Card.Meta
                    title={item.title}
                    description={
                      <>
                        <p>{item.description}</p>
                        <Radio.Group
                          style={{ marginTop: '10px' }}
                          size="small"
                          defaultValue={item.defaultPhase}
                          onChange={item.onChange}
                        >
                          {item.phases.map((phase: any) => (
                            <Radio.Button key={phase.value} value={phase.value}>
                              {phase.label}
                            </Radio.Button>
                          ))}
                        </Radio.Group>
                      </>
                    }
                  />
                </Card>
              </Col>
            </Row>
            <Row style={{ marginTop: '16px' }}>
              <Col span={24}>
                <Card style={{ height: '327px' }} loading={isLoading}>
                  <Card.Meta
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                    title="Card title"
                    description="Example card which will show loading template whiles it fetches data and gets hydrated."
                  />
                </Card>
              </Col>
            </Row>
          </Col>
        ))}
        {overviewCard.cumulativePerformance.map((item: any) => (
          <Col key={item.key} span={12}>
            <Card
              bordered={false}
              cover={
                <div style={{ paddingTop: '15px' }}>
                  <Chart
                    options={item.chartData.options}
                    series={item.chartData.series}
                    type={item.chartData.type}
                    height={'475px'}
                  />
                </div>
              }
            >
              <Card.Meta
                title={item.title}
                description={
                  <>
                    <p>{item.description}</p>
                    <Row>
                      {item.topThreePupils.map((pupil: any) => (
                        <Col key={pupil.key} span={8}>
                          <Statistic
                            title={pupil.title}
                            value={pupil.score}
                            precision={2}
                            valueStyle={{ color: '#3f8600' }}
                            prefix={<UserAddOutlined />}
                            formatter={formatter}
                          />
                        </Col>
                      ))}
                    </Row>
                  </>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Overview;
