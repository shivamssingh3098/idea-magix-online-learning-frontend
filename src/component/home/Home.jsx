import { Box, Container, Grid, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./Card";

const Home = () => {
  const [data, setData] = useState([]);

  const getAllInstructors = async () => {
    const res = await axios.get(`/api/v1/admin/all-instructors`);
    setData(res.data.data.instructors);

    console.log("All instructor", res);

    try {
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllInstructors();
  }, []);

  const textStyles = {
    display: "flex",
    justifyContent: "space-around",
  };

  return (
    <Container>
      <Grid container spacing={2} sx={textStyles}>
        {data.map((data, i) => (
          <>
            <Card key={i} instructor={data} />
          </>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
