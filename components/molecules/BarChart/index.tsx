import { Stack, Typography } from '@mui/material';
import { BarChartProps, BarChart as MuiXBarChart } from '@mui/x-charts/BarChart';
import React from 'react';

const BarChart: React.FC<BarChartProps> = ({
  title,
  series,
  ...props
}) => {
  return (
    <Stack
      sx={{ width: "100%", height: "100%" }}
      spacing={2}
      justifyContent={"center"}
      alignItems={"center"}
      alignContent={"center"}
    >
      <Typography color={'#585858'} fontWeight={700}>
        {title}
      </Typography>
      <MuiXBarChart
        height={150}
        series={series}
        {...props}
      />
    </Stack>
  );
};

export default BarChart;