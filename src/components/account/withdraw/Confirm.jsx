import React from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const Confirm = ({ open, handleClose }) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">알림!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            같은 이메일, 별명으로 30일 동안 재가입이 불가합니다.
            <br />
            이메일을 입력해주세요.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="이메일"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            취소
          </Button>
          <Button onClick={handleClose} color="secondary">
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default React.memo(Confirm);
