import React  from 'react'

import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

export default function MessageSnackbar({ n }) {
  const [open, setOpen] = React.useState(true)

  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  return (


    <Snackbar
      open={open}
      onClose={handleClose}
      message={n.message}
      action={
        <div>
          <IconButton size="medium" aria-label="close" color="inherit" onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </div>


      }
    />

  )
}