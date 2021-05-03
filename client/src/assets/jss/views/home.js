import { container, title } from '../main.js'

import imagesStyle from '../imageStyles.js'

const profilePageStyle = {
  ...imagesStyle,
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
    margin: '0.33rem auto 0',
    maxWidth: '600px',
    color: '#5a5a5a',
    textAlign: 'center !important',
    lineHeight:'2rem',
  },

  img_container:{
    position: 'relative',
    width: '100%',
    // maxWidth: "300px",
    '&:hover $overlay': {
      opacity:'1',

    }

  },

  img_txt:{
    fontWeight: '400',
    fontFamily: '"Roboto", sans-serif',
    display: 'inline-block',
    position: 'relative',
    fontSize:'26px',
    minHeight: '32px',
    textDecoration: 'none',
    textAlign:'center',
    padding:'auto',
    opacity:'0.85',
    '@media (max-width: 992px)': {
      fontSize:'16px',
    },
  },



  overlay:{
    position: 'absolute',
    bottom: '0',
    background: 'rgb(0, 0, 0)',
    background: 'rgba(0, 0, 0, 0.5)', /* Black see-through */
    color: '#f1f1f1',
    width: '100%',
    height:'39%',
    transition: '.8s ease',
    opacity:'0',
    color: 'white',
    fontSize: '20px',
    marginBottom: '2.142rem',
    '&>p':{

      marginTop:'1rem',
      lineHeight:'0',
    },
    '@media (max-width: 992px)': {
      opacity: '1',
      '& p':{
        display: 'none',
      }
    },


  },


  name: {
    marginTop: '-80px'
  },

  main: {
    background: '#FFFFFF',
    position: 'relative',
    zIndex: '3'
  },
  mainRaised: {
    margin: '-60px 30px 0px',
    borderRadius: '6px',
    boxShadow:
      '0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)'
  },
  title: {
    ...title,
    display: 'inline-block',
    position: 'relative',
    marginTop: '30px',
    minHeight: '32px',
    textDecoration: 'none'
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
