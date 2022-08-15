import React, { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import { Box } from '@mui/system';
import { Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Iconify from './Iconify';

import LargeActionButton from '../sections/@ngo/LargeActionButton';
import { HideModalAction } from '../store/actions/AuthActions';

function CustomModal({ btnText, component, color, icon, largeBtn = false, width = 0 }) {
  const [open, setOpen] = useState(false);

  const hideModal = useSelector((state) => state.auth.hideModal);
  const dispatch = useDispatch();
  const handleOpen = () => setOpen(true);
  const handleClose = (event, reason) => {
    if (reason && reason === 'backdropClick') return;
    setOpen(false);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: width ? { width } : 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    if (hideModal === true) {
      setOpen(false);
      dispatch(HideModalAction(false));
    }
  }, [hideModal]);

  return (
    <div>
      {largeBtn ? (
        <LargeActionButton title={btnText} icon={icon} color={color} onClick={handleOpen} />
      ) : (
        <Button variant="contained" color={color} startIcon={<Iconify icon={icon} />} onClick={handleOpen}>
          {btnText}
        </Button>
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Button
            variant="contained"
            color="error"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: '-8px',
              top: '-10px',
              p: 0,
              height: '35px',
              width: '35px',
              borderRadius: '100px',
              minWidth: 'auto',
            }}
          >
            <Iconify icon="ep:close-bold" />
          </Button>
          {component}
        </Box>
      </Modal>
    </div>
  );
}

export default CustomModal;
