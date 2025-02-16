"use client";

import {
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";

export default function EmailForm({
  openForm,
  handleOpenForm,
  inputData,
  img,
  results,
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ ok: null, message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("pending");

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, inputData, img, results }),
      });

      if (response.ok) {
        setStatus({ ok: true, message: "Звіт відправлено успішно!" });
      } else {
        const error = await response.json();
        setStatus({ ok: false, message: `Error: ${error.message}` });
      }
    } catch (error) {
      setStatus({ ok: false, message: `Error: ${error.message}` });
    }
  };
  return (
    <Dialog open={openForm} onClose={handleOpenForm}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Отримати повний звіт</DialogTitle>
        <DialogContent sx={{ maxWidth: 500 }}>
          <Stack spacing={2}>
            <Typography>
              Ми відправимо вам результати розрахунку на вказану поштову адресу.
            </Typography>
            <TextField
              required
              margin="dense"
              name="email"
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              variant="filled"
              error={status?.ok === false}
              helperText={status?.message}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOpenForm}>Назад</Button>
          <LoadingButton
            type="submit"
            loading={status === "pending"}
            disabled={status?.ok}
          >
            {status.ok ? "Відправлено" : "Відправити"}
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
}
