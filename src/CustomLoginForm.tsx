import { Login } from "react-admin";
import { TextInput, required } from "react-admin";
import { Card, CardContent, Box, Button, Typography } from "@mui/material";
import { useNotify, useLogin } from "react-admin";

const CustomLoginForm = () => {
  const notify = useNotify();
  const login = useLogin();

  const onSubmit = async (values: { email: string; password: string }) => {
    try {
      await login(values); // Викликаємо метод login з authProvider
    } catch (error) {
      notify("Невірний email або пароль", { type: "error" });
    }
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const values = {
          email: formData.get("email") as string,
          password: formData.get("password") as string,
        };
        onSubmit(values);
      }}
    >
      <TextInput
        source="email"
        label="Email"
        validate={required()} // Валідація обов'язкового поля
        fullWidth
        name="email"
      />
      <TextInput
        source="password"
        label="Пароль"
        type="password"
        validate={required()} // Валідація обов'язкового поля
        fullWidth
        name="password"
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Увійти
      </Button>
    </form>
  );
};

const CustomLoginPage = () => (
  <Login
    backgroundImage="https://source.unsplash.com/random"
    sx={{ backgroundSize: "cover" }}
  >
    <Card>
      <CardContent>
        <Box textAlign="center">
          <Typography variant="h5" gutterBottom>
            Вхід до системи
          </Typography>
          <CustomLoginForm />
        </Box>
      </CardContent>
    </Card>
  </Login>
);

export default CustomLoginPage;
