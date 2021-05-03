import { container, title } from '../main.js'

import imagesStyle from '../imageStyles.js'

const profilePageStyle = {
  container,
  profile: {
    textAlign: 'center',
    '& img': {
      maxWidth: '160px',
      width: '100%',
      margin: '0 auto',
      transform: 'translate3d(0, -50%, 0)'
    }
  },
  description: {
    margin: '0.33rem auto 1rem',
    paddingBottom:'2rem',
    maxWidth: '82%',
    color: '#5a5a5a',
    fontSize: '18px',
    fontWeight:'200',
    // textAlign: "center !important",
    lineHeight:'2.4rem',
    '&>p':{
      fontSize:'24px',
    }
  },

  img_container:{
    position: 'relative',
    width: '100%',
    // maxWidth: "300px",
    '&:hover $overlay': {
      opacity:'1',

    }

  },


  overlay:{
    position: 'absolute',
    bottom: '0',
    background: 'rgb(0, 0, 0)',
    background: 'rgba(0, 0, 0, 0.5)', /* Black see-through */
    color: '#f1f1f1',
    width: '100%',
    height:'39%',
    transition: '.5s ease',
    opacity:'0',
    color: 'white',
    fontSize: '20px',
    marginBottom: '2.142rem'

  },
  name: {
    marginTop: '-80px'
  },
  ...imagesStyle,
  main: {
    background: '#FFFFFF',
    position: 'relative',
    zIndex: '3'
  },
  mainRaised: {
    margin: '-60px 30px 0px',
    borderRadius: '6px',
    paddingBottom:'2rem',
    boxShadow:
      '0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)'
  },
  title: {
    ...title,
    display: 'inline-block',
    position: 'relative',
    marginTop: '30px',
    minHeight: '32px',
    textDecoration: 'none',
    '&>h2':{
      fontWeight: '400',
    }
  },
  img_txt:{
    fontWeight: '400',
    fontFamily: '"Roboto", sans-serif',
    display: 'inline-block',
    position: 'relative',
    minHeight: '32px',
    textDecoration: 'none',
    opacity:'0.85',
    top:'15%',


  },
  socials: {
    marginTop: '0',
    width: '100%',
    transform: 'none',
    left: '0',
    top: '0',
    height: '100%',
    lineHeight: '41px',
    fontSize: '20px',
    color: '#999'
  },
  navWrapper: {
    margin: '20px auto 50px auto',
    textAlign: 'center',
    overflow:'hidden',
  }
}

export default profilePageStyle
