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
import { useState } from "react";

export default function EmailForm({
  openForm,
  handleOpenForm,
  inputData,
  img,
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ ok: null, message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, inputData, img }),
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
        <DialogContent sx={{ minWidth: 500 }}>
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
          <Button type="submit" disabled={status?.ok}>
            Відправити
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
