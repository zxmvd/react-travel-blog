import { container, title } from '../main.js'

import imagesStyle from '../imageStyles.js'

const blogListPageStyle = {
  container,


  list: {
    width: '100%',
    // border:'5px solid rgba(204, 102, 255, .3)',
    // borderRadius:'8px',
    margin: '4rem auto 2rem',
    '@media (max-width: 992px)': {
      border:'none',
      margin:'auto',
      backgroundColor:'white',
    },


  },
  divider:{
    height:'1.5px',
    backgroundColor:'rgba(204, 102, 255, .2)',

  },
  blogItem:{
    transition: '0.8s ease',

    '&:hover':{
      background: 'rgba(242, 242, 242, 0.7)',
    },
    '&:hover $large':{
      width: '4rem',
      height: '4rem',
      transition: '0.3s ease',
      margin:'2.5rem 0.5rem auto 1.5rem',
      // border:'8px solid rgba(129, 248, 190, .5)',
    }
  },
  large: {
    width: '3rem',
    height: '3rem',
    margin:'3rem 1rem auto 2rem',
    '@media (max-width: 992px)': {
      marginTop:'1.5rem',
    },
  },


  ...imagesStyle,
  main: {
    background: '#FFFFFF',
    position: 'relative',
    // zIndex: "3"
  },
  mainRaised: {
    margin: '-60px 30px 0px',
    borderRadius: '6px',
    paddingBottom:'6rem',
    boxShadow:
      '0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
      '@media (max-width: 992px)': {
        paddingBottom: 0,
      },
  },

  name: {
    // ...title,
    display: 'inline-block',
    position: 'relative',
    marginTop: '12px',
    fontSize:'1rem',
    color: 'black',
    fontWeight:'400',
    lineHeight: '1.2rem',
    padding:'1rem 0rem 0 2rem',
    minHeight: '32px',
    textDecoration: 'none',
    wordBreak:'break-word',
    fontFamily:'"Roboto", "Helvetica", "Arial", sans-serif',
    // border:'1px solid rgba(129, 248, 190, .2)',
    // borderStyle:'none solid none none',
    '& span':{
      fontWeight: '100',
      fontSize:'10px',
      lineHeight:'2rem',
      wrap:'nowrap',
      '& p':{
        color:'rgba(2, 158, 82, 1)',

      }

    },
    '@media (max-width: 992px)': {
      // padding:'0.5rem',
      marginTop:'5px',
      padding:'1rem 0rem 0 1rem',
      margin:'0'
      // paddingTop:'1rem',

      // '& p':{
      //   display: "none",
      // }
    },
  },

  blogTitle: {
    // ...title,
    display: 'inline-block',
    position: 'relative',
    margin:'1.5rem 0',
    lineHeight: '1',
    fontWeight:'400',
    fontSize:'1.6rem',
    overflow:'hidden',
    padding: 'auto 15px auto 20px',
    minHeight: '32px',
    color:'rgba(0, 0, 0, .8)',
    textDecoration: 'none',
    '& p':{
      fontSize:'14px',
      color:'#4a4a4a',
      lineHeight: '1.8',
      fontWeight:'200',
      marginTop:'0.5rem',
    },
    '@media (max-width: 992px)': {
      width: '100%',
      // border:'1px solid rgba(129, 248, 190, .5)',
      // borderStyle:'solid none none none',
    },

  },
  // inline:{
  //   display:'inline',
  //   wordBreak: 'break-all',

  // },

}

export default blogListPageStyle
