import { Box, Stack, Typography } from '@mui/material';
import { PieChart as MuiXPieChart, PieChartProps } from '@mui/x-charts/PieChart';

const PieChart: React.FC<PieChartProps> = ({
  title,
  series,
}) => {
  return (
    <Stack
      sx={{ width: "100%" }}
      spacing={2}
      justifyContent={"center"}
      alignItems={"center"}
      alignContent={"center"}
    >
      <MuiXPieChart
        height={150}
        series={series}
        slotProps={{
          legend: {
            hidden: true,
            direction: "column",
            position: {
              horizontal: 'middle',
              vertical: "bottom",
            },
          },
        }}
      />
      <Stack spacing={3}>
        <Typography color={'#585858'} fontWeight={700}>
          {title}
        </Typography>
        <Stack 
          sx={{
            width: "100%"
          }}
          spacing={2}
        >
          {series[0].data.map((item, key) => (
            <Box 
              key={'legend-pie-chart-' + key}
              sx={{ 
                display: "flex", 
                justifyContent: "space-between",
                width: "100%", 
              }}
            >
              <Box 
                sx={{
                  display: "flex",
                  gap: 2
                }}
              >
                <Box
                  sx={{
                    width: '24px',
                    height: '24px',
                    ...(item?.color && { bgcolor: item?.color }),
                  }}
                />
                <Typography fontSize={14}>{item.label as string}</Typography>
              </Box>
              <Typography
                fontSize={14}
              >
                {item.value}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default PieChart;