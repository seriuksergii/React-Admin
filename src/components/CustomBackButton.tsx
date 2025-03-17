import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CustomBackButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={() => navigate(-1)}
      sx={{
        marginTop: "16px",
        textTransform: "none",
        bgcolor: "#d88f42",
        "&:hover": {
          bgcolor: "#d9862d",
        },
      }}
    >
      Назад
    </Button>
  );
};

export default CustomBackButton;
