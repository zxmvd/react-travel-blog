/*eslint-disable*/
import React from "react";
// react components for routing our app without refresh
import { Link, useHistory, NavLink } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import {PanoramaRounded, SupervisedUserCircle, ExitToApp, Explore } from "@material-ui/icons"

// core components
import Button from "./CustomButton/Button.js";

import styles from "../assets/jss/headerLinksStyle.js";
import  { logOutUser } from '../reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'

const useStyles = makeStyles(styles);


export default function HeaderLinks(props) {
  const classes = useStyles();
  const dispatch = useDispatch()
  const history = useHistory()
  const loggedInUser = useSelector(state=>state.user)

  return (
    <List className={classes.list}>
        <NavLink to={{pathname:'/', hash:'destinationSection'}} className={classes.listItem}>
        <Button
          color="transparent"
          className={classes.navLink}
        >
          <Explore   className={classes.icons} /> Destinations
        </Button>
      </NavLink>
      <NavLink to='/blogs' className={classes.listItem} activeStyle={{backgroundColor:'rgba(200, 200, 200, 0.2)'}}>
        <Button
          color="transparent"
          className={classes.navLink}>
          <PanoramaRounded   className={classes.icons} /> Blogs
        </Button>
      </NavLink>
      <NavLink to='/authors' className={classes.listItem} activeStyle={{backgroundColor:'rgba(200, 200, 200, 0.2)'}}>
        <Button
          color="transparent"
          className={classes.navLink}
        >
          <SupervisedUserCircle className={classes.icons} /> Authors
        </Button>
      </NavLink>

      {
        loggedInUser?
        <ListItem className={classes.listItem}>
        <Button
           onClick={() => {logOutUser(dispatch)}}
          color="transparent"
          className={classes.navLink}
        >
          <ExitToApp  className={classes.icons} /> LogOut
        </Button>
      </ListItem>
      :
      <ListItem className={classes.listItem}>
        <Link to={{pathname:'/login', state: { from: JSON.stringify(location) }}} style={{color:'inherit'}}>
        <Button
        color="transparent"
        className={classes.navLink}
      >
        <ExitToApp  className={classes.icons} /> LogIn
      </Button>
        </Link>
    </ListItem>
      }
       
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-twitter"
          title="Follow us on twitter"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            href="https://twitter.com"
            target="_blank"
            color="transparent"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-twitter"} />
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-facebook"
          title="Follow us on facebook"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="https://www.facebook.com"
            target="_blank"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-facebook"} />
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-tooltip"
          title="Follow us on instagram"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="https://www.instagram.com"
            target="_blank"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-instagram"} />
          </Button>
        </Tooltip>
      </ListItem>
    </List>
  );
}
