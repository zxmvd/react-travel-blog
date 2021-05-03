import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../reducers/userReducer'
// @material-ui/core components
import { makeStyles, InputAdornment,Icon } from '@material-ui/core'
// @material-ui/icons
import People from '@material-ui/icons/People'
// core components
import Footer from './Footer/Footer.js'
import GridContainer from './Grid/GridContainer.js'
import GridItem from './Grid/GridItem.js'
import Button from './CustomButton/Button.js'
import Card from './Card/Card.js'
import CardBody from './Card/CardBody.js'
import CardFooter from './Card/CardFooter.js'
import CustomInput from './CustomInput/CustomInput.js'

import styles from '../assets/jss/views/loginPageStyle.js'
import classNames from 'classnames'
import image from '../static/images/profile-bg.jpg'

const useStyles = makeStyles(styles)

export default function LoginPage(props) {
  const [cardAnimation, setCardAnimation] = useState('cardHidden')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()
  let user = useSelector(({ user }) => user)

  let from = location.state? JSON.parse(location.state.from).hash.slice(1):'/'

  window.scrollTo(0,0)

  useEffect(() => {
    if(user){
      history.replace(from)
    }
  },[user])


  const handleLogin = (event) => {
    event.preventDefault()
    dispatch(loginUser({ username, password }))
    setUsername('')
    setPassword('')
  }

  const loginDemoUser = (event) => {
    dispatch(loginUser({ username:'explorer', password:'1234' }))
  }

  setTimeout(function() {
    setCardAnimation('')
  }, 700)

  const classes = useStyles()
  const orBtn = classNames(classes[cardAnimation],classes.demoBtn)

  return (
    <div>
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: 'url(' + image + ')',
          backgroundSize: 'cover',
          backgroundPosition: 'top center'
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimation]}>
                <form className={classes.form} onSubmit={handleLogin}>

                  <CardBody className={classes.card}>
                    <CustomInput
                      labelText="User Name..."
                      formControlProps={{
                        fullWidth: true
                      }}

                      inputProps={{
                        type: 'text',
                        onChange:({ target }) => {
                          dispatch({
                            type: 'SET NOTIFICATION',
                            data: null })
                          setUsername(target.value)},
                        value:username,
                        endAdornment: (
                          <InputAdornment position="end">
                            <People className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    />

                    <CustomInput
                      labelText="Password"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: 'password',
                        onChange:({ target }) => setPassword(target.value),
                        value:password,
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: 'off'
                      }}
                    />
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button type='submmit' simple color="green" size="lg" style={{ fontWeight:'400', fontSize:'1rem' }}>
                      Sign In
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={1} className={classNames(classes.midGrid,classes[cardAnimation])}>
              <div className={classes.vl}></div>
              <h3 className={classes.or}>OR</h3>
              <div className={classes.vl2}></div>
              <div className={classes.vl3}></div>
            </GridItem>
            <GridItem xs={12} sm={12} md={3}>
              <div style={{ padding:'auto' }}>
                <Button onClick={loginDemoUser} className={orBtn}
                  simple
                  color='green'
                  size="lg" style={{ fontWeight:'400', fontSize:'1rem' }}>
                    Log In as Demo User
                </Button>
              </div>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  )
}
