import {
  NewtonsCradle,
  PureSnake,
  DrumMachine,
  BasicCalculator,
  MarkdownViewer,
  PomodoroTimer,
} from '../my_apps'

// all projects object
export const projectsDictionary = {
  'Web Development': [
    {
      slug: 'NewtonsCradle',
      name: 'Pusher v1.0',
      component: <NewtonsCradle key="NewtonsCradle" />,
      imageLink: '/test_drive/newton.jpg',
      title:
        "Pusher v1.0 | Using Matter JS physics engine to simulate a Newoton's Cradle",
      size: 'default',
    },
    {
      slug: 'PureSnake',
      name: 'SnakeX v2.0',
      component: <PureSnake key="PureSnake" />,
      imageLink: '/test_drive/snake.jpg',
      title:
        'SnakeX v2.0 | A HTML 5 game coded entirely in vanilla JS and wrapped into a React component',
      size: 'default',
    },
    {
      slug: 'DrumMachine',
      name: 'C-Note dM20',
      component: <DrumMachine key="DrumMachine" />,
      imageLink: '/test_drive/drum.jpg',
      title:
        'C-Note dM20 | CSS designed Drum Machine with sounds handled with Howler audio API for cross platform compatibility',
      size: 'custom',
    },
    {
      slug: 'BasicCalculator',
      name: 'Basio 112',
      component: <BasicCalculator key="BasicCalculator" />,
      imageLink: '',
      title:
        'Basio 112 | Basic mathematics calculator designed with CSS grid and uses object oriented JS to handle all logic',
      size: 'default',
    },
    {
      slug: 'MarkdownViewer',
      name: 'Transformer v1.0',
      component: <MarkdownViewer key="MarkdownViewer" />,
      imageLink: '',
      title:
        'Transformer v1.0 | Mark JS powered markdown code parser the source and parsed code are displayed concurrently',
      size: 'default',
    },
    {
      slug: 'PomodoroTimer',
      name: 'TicToc 25',
      component: <PomodoroTimer key="PomodoroTimer" />,
      imageLink: '',
      title:
        'TicToc 25 | The famous pomodoro time management system built into a react component',
      size: 'default',
    },
  ],
  'Data Science': [
    {
      slug: 'GameOfChance',
      name: 'Uneven Match',
      component: (
        <div key="GameOfChance" children="available on next deployment" />
      ),
      imageLink: '',
      title:
        'Uneven Match | A Monte Carlo simulation of how the house always has an advantage in 50/50 roulette spin',
      size: 'default',
    },
  ],
}
