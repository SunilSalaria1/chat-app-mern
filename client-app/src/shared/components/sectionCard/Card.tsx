import { CardContent, Typography, Card } from "@mui/material";
import React, { ReactElement } from "react";
interface IProps {
  title: string;
  children: ReactElement;
}
function SectionCard(props: IProps) {
  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius:"8px",
        transition: "linear 300ms",
        "&:hover": {
          transform: "scale(1.1)",
        },
      }}
    >
      <CardContent sx={{ transitionDelay: "300ms" }}>
        <Typography
          sx={{ fontSize: 14 }}
          textAlign="center"
          color="text.primary"
          gutterBottom
        >
          {props.children}
        </Typography>
        <Typography textAlign="center" variant="body1">
          {props.title}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default SectionCard;
