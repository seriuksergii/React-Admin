import { Login, TextInput, required, Form } from "react-admin";
import { Card, CardContent, Box, Button, Typography } from "@mui/material";
import { useNotify, useLogin } from "react-admin";

const CustomLoginForm = () => {
  const notify = useNotify();
  const login = useLogin();

  const onSubmit = async (values: { email: string; password: string }) => {
    try {
      await login(values);
    } catch (error) {
      notify("Невірний email або пароль", { type: "error" });
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <TextInput
        source="email"
        label="Email"
        validate={required()}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextInput
        source="password"
        label="Пароль"
        type="password"
        validate={required()}
        fullWidth
        sx={{ mb: 2 }}
      />
      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{
          backgroundColor: "#d88f42",
          "&:hover": {
            backgroundColor: "#c77d3a",
          },
          borderRadius: "8px",
          padding: "10px",
          fontSize: "16px",
          fontWeight: "bold",
        }}
      >
        Увійти
      </Button>
    </Form>
  );
};

const CustomLoginPage = () => {
  return (
    <Login backgroundImage="/bg-image.jpg">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <Card
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            borderRadius: "16px",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.5)",
            width: { xs: "90%", sm: "400px" },
          }}
        >
          <CardContent>
            <Box textAlign="center">
              <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
                Вхід до системи
              </Typography>
              <CustomLoginForm />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Login>
  );
};

export default CustomLoginPage;
