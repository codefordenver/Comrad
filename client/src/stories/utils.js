import { withInfo } from '@storybook/addon-info';

const wInfoStyle = {
  header: {
    body: {
      border: 'none',
      paddingTop: 0,
      paddingBottom: 0,
      paddingLeft: 0,
      backgroundColor: 'white',
    },
    h1: {
      border: 'none',
      display: 'inline',
      fontSize: '50px',
      marginRight: '2rem',
    },
    h2: {
      display: 'inline',
    },
  },
  infoBody: {
    backgroundColor: '',
    padding: '0px 5px',
    lineHeight: '2',
    margin: '0 20px',
    border: 'none',
  },
  storyBody: {
    backgroundColor: 'red',
  },
};
export const wInfo = text =>
  withInfo({ inline: true, source: false, styles: wInfoStyle, text: text });
