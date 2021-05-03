import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import NewBlogButton from './NewBlogButton'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'


const Togglable = React.forwardRef((props, ref) => {
  const [ visibility, setVisibility ] = useState(false)
  const childrenVisibilityStyle ={ display: visibility? '':'none' }
  const buttonVisibilityStyle = { display: visibility? 'none': '' }


  const toggle = () => {
    setVisibility(!visibility)
  }

  useImperativeHandle(ref, () => {
    return {
      toggle
    }
  })
  return (
    <ClickAwayListener onClickAway={() => setVisibility(false)}>
      <div style={{ position:'sticky', display:'block' }}>
        <div style={buttonVisibilityStyle} >
          <NewBlogButton toggle={toggle} lable={props.buttonLable} style={{ position:'sticky' }}/>
        </div>
        <div style={childrenVisibilityStyle}>
          {props.children}
        </div>
      </div>
    </ClickAwayListener>
  )
})
Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLable: PropTypes.string.isRequired
}


export default Togglable