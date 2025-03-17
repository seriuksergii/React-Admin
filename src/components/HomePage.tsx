import { Card, CardContent, Typography, Box } from "@mui/material";

const HomePage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card sx={{ width: 500, padding: 5, textAlign: "center" }}>
        <CardContent>
          <Typography variant="h5" component="h1" gutterBottom>
            Welcome to the ChytAi Admin Panel
          </Typography>
          <Typography variant="body1">
            Use the menu on the left to navigate through the resources
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default HomePage;
