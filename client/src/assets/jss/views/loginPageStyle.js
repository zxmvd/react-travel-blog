import { container } from '../main.js'

const loginPageStyle = {
  container: {
    ...container,
    zIndex: '2',
    position: 'relative',
    paddingTop: '20vh',
    color: '#FFFFFF',
    paddingBottom: '200px',

  },
  cardHidden: {
    opacity: '0',
    transform: 'translate3d(0, -60px, 0)'
  },
  vl:{

    borderLeft: '2px solid white',
    height: '35%',
    position: 'absolute',
    left: '50%',
    marginLeft: '-1px',
    top: '0',
    '@media (max-width: 992px)': {
      border:'none',
      margin:'auto',
      backgroundColor:'white',
    },
  },
  vl2:{

    borderLeft: '2px solid white',
    height: '35%',
    position: 'absolute',
    left: '50%',
    marginLeft: '-1px',
    bottom: '0',
    '@media (max-width: 992px)': {
      border: '1px solid white',
      width:'12px',
      left: '0',
      position: 'absolute',
      marginLeft: '-1px',
    },
  },

  vl3:{
    '@media (max-width: 992px)': {
      height:'0',
      margin:'0 0 0 1rem',
      borderBottom: '2px solid white',
      left: '2.5rem',
      position: 'relative',
      marginLeft: '-1px',
      width:'80%',
    },
  },

  or:{
    padding:'auto',
    position:'absolute',
    top:'25%',
    left:'30%',
    '@media (max-width: 992px)': {
      position:'absolute',
      left:'1rem',
      top:'-2rem',
    },
  },

  midGrid:{
    margin:'6rem 1rem',
    transition: 'all 500ms linear',
    '@media (max-width: 992px)': {
      margin:'0 0 0 1rem',
    },
  },

  demoBtn:{
    color:'#8e24aa',
    fontWeight:'300',
    backgroundColor:'#e7fdf3',
    marginTop:'50%',
    transition: 'all 800ms linear',
    '&:hover':{
      color:'#8e24aa',
      backgroundColor:'#b8f9dc',
    },
    '@media (max-width: 992px)': {
      marginTop:'1rem',
    },
  },

  pageHeader: {
    minHeight: '100vh',
    height: 'auto',
    display: 'inherit',
    position: 'relative',
    margin: '0',
    padding: '0',
    border: '0',
    alignItems: 'center',
    '&:before': {
      background: 'rgba(0, 0, 0, 0.5)'
    },
    '&:before,&:after': {
      position: 'absolute',
      zIndex: '1',
      width: '100%',
      height: '100%',
      display: 'block',
      left: '0',
      top: '0',
      content: '""'
    },
    '& footer li a,& footer li a:hover,& footer li a:active': {
      color: '#FFFFFF'
    },
    '& footer': {
      position: 'absolute',
      bottom: '0',
      width: '100%'
    }
  },
  form: {
    margin: '0',
  },

  cardFooter: {
    paddingTop: '0rem',
    border: '0',
    borderRadius: '6px',
    backgroundColor:'#e7fdf3',

    justifyContent: 'center !important'
  },
  card:{
    backgroundColor:'#e7fdf3',
    borderRadius: '6px',


  },
  inputIconsColor: {
    color: '#495057'
  }
}

export default loginPageStyle
