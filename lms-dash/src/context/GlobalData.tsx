import React from 'react';
import {
  DashboardOutlined,
  FolderOpenOutlined,
  FormOutlined,
  TeamOutlined
} from '@ant-design/icons';
import { Spin } from 'antd';

export const GlobalDataContext = React.createContext<any>(undefined);

export const GlobalData: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [data, setData] = React.useState<any>({});

  const changeView = (e: any) => {
    setData((prev: any) => ({ ...prev, currentViewKey: e.key }));
  };

  React.useEffect(() => {
    fetch('./mock/feed.json')
      .then((res) => res.json())
      .then((data) => {
        setData({
          currentViewKey: 'pupils',
          sideMenuItems: [
            {
              key: 'overview',
              label: 'Overview',
              icon: <DashboardOutlined />,
              children: undefined
            },
            {
              key: 'pupils',
              label: 'Pupils',
              icon: <TeamOutlined />,
              children: undefined
            }
          ],
          breadcrumbItems: [
            { key: 'link 1', label: 'link 1', href: '#' },
            { key: 'link 2', label: 'link 2', href: '#' },
            { key: 'link 3', label: 'link 3', href: '#' }
          ],
          overviewCard: {
            stats: [
              {
                key: 'stats_01',
                title: 'No. Pupils',
                description: 'Head count of cohort',
                value: data.noOfPupils,
                icon: TeamOutlined
              },
              {
                key: 'stats_02',
                title: 'No. Phases',
                description: 'Phases with enrollment',
                value: data.noOfPhases,
                icon: FolderOpenOutlined
              },
              {
                key: 'stats_03',
                title: 'No. Sections',
                description: 'Sections in phase',
                value: data.noOfSessions,
                icon: FormOutlined
              }
            ],
            sectionPerformance: [
              {
                key: 'sec_perf_01',
                title: 'Performance Across Section',
                description:
                  'Collective performance across all sections for phase',
                defaultPhase: 'phase_1',
                phases: [
                  { value: 'phase_1', label: data.assignmentPhaseLabels[0] },
                  { value: 'phase_2', label: data.assignmentPhaseLabels[1] }
                ],
                chartData: {
                  type: 'pie',
                  series: data.pupilsAveragePerformanceAcrossSections,
                  options: {
                    labels: data.sectionPieChartLabels,
                    plotOptions: {
                      pie: {
                        startAngle: -90,
                        endAngle: 270
                      }
                    },
                    dataLabels: {
                      enabled: true
                    },
                    fill: {
                      type: 'gradient'
                    },
                    legend: {
                      formatter: function (val: any, opts: any) {
                        return (
                          val + ' - ' + opts.w.globals.series[opts.seriesIndex]
                        );
                      }
                    }
                  }
                },
                onChange: (e: any) => console.log(e)
              }
            ],
            cumulativePerformance: [
              {
                key: 'cum_perf_01',
                title: 'Cumulative Performance',
                description:
                  'Pupils overall performance score across all completed sections',
                topThreePupils: [
                  {
                    key: 'pupil_1',
                    title: 'Star Pupil',
                    score: data.topThreePupilsScore[0]
                  },
                  {
                    key: 'pupil_2',
                    title: '1st Runner up',
                    score: data.topThreePupilsScore[1]
                  },
                  {
                    key: 'pupil_3',
                    title: '2nd Runner up',
                    score: data.topThreePupilsScore[2]
                  }
                ],
                chartData: {
                  type: 'boxPlot',
                  series: [{ data: data.pupilsCumulativePerformance }],
                  options: {}
                }
              }
            ]
          },
          pupilsCard: {
            tableData: data.pupilsDetailsAsTableEntries
          }
        });
      })
      .then(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <GlobalDataContext.Provider
      value={{
        currentViewKey: data.currentViewKey,
        sideMenuItems: data.sideMenuItems,
        breadcrumbItems: data.breadcrumbItems,
        overviewCard: data.overviewCard,
        pupilsCard: data.pupilsCard,
        changeView
      }}
    >
      {isLoading ? (
        <div
          style={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center'
          }}
        >
          <Spin size="large" />
        </div>
      ) : (
        children
      )}
    </GlobalDataContext.Provider>
  );
};
