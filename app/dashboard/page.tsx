"use client"

import { Button, DatePicker } from "@/components/atoms";
import { PieChart, BarChart } from "@/components/molecules";
import { Layout } from "@/components/templates";
import { Box, Stack, Typography } from "@mui/material";
import withAuth from "@/utils/withAuth";

const datasetJumlahLalinByPaymentMethods = [
  {
    lalin: 60,
    paymentMethod: 'BRI',
  },
  {
    lalin: 84,
    paymentMethod: 'BCA',
  },
  {
    lalin: 96,
    paymentMethod: 'BNI',
  },
  {
    lalin: 70,
    paymentMethod: 'DKI',
  },
  {
    lalin: 60,
    paymentMethod: 'Mandiri',
  },
  {
    lalin: 40,
    paymentMethod: 'Mega',
  },
  {
    lalin: 56,
    paymentMethod: 'Fio',
  },
];

const datasetJumlahLalinByGerbang = [
  {
    lalin: 56,
    gerbang: 'Gerbang 1',
  },
  {
    lalin: 70,
    gerbang: 'Gerbang 2',
  },
  {
    lalin: 98,
    gerbang: 'Gerbang 3',
  },
  {
    lalin: 80,
    gerbang: 'Gerbang 4',
  },
  {
    lalin: 75,
    gerbang: 'Gerbang 5',
  },
]

const datasetLalinByShift = [
  { label: "Shift 1", value: 50.5, color: '#32a852' }, 
  { label: "Shift 2", value: 67.5, color: '#4c32a8' }, 
  { label: "Shift 3", value: 90, color: '#ebe534' },
];

const datasetLalinByRuas = [
  { label: "Ruas 1", value: 50.5, color: '#32a852' }, 
  { label: "Ruas 2", value: 67.5, color: '#4c32a8' }, 
  { label: "Ruas 3", value: 90, color: '#ebe534' },
];

function Dashboard() {
  return (
    <Layout>
      <Stack spacing={4}>
        <Box>
          <Typography 
            fontSize={24} 
            fontWeight={700}
            color={'#585858'}
            marginY={2}
          >
            Dashboard
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 2
            }}
          >
            <DatePicker
              asController={false}
            />
            <Button
              variant="outlined"
            >
              Filter
            </Button>
          </Box>
        </Box>
        <Stack spacing={4}>
          <Box sx={{ display: "flex", gap: 4 }}>
            <BarChart
              title="Jumlah Lalin"
              dataset={datasetJumlahLalinByPaymentMethods}
              xAxis={[
                { 
                  scaleType: 'band', 
                  dataKey: 'paymentMethod',
                }
              ]}
              series={[
                {
                  dataKey: 'lalin',
                }
              ]}
            />
            <PieChart
              title="Total Lalin"
              series={
                [
                  {
                    data: datasetLalinByShift,
                    innerRadius: 30,
                  }
                ]
              }
            />
          </Box>
          <Box sx={{ display: "flex", gap: 4 }}>
            <BarChart
              title="Jumlah Lalin"
              dataset={datasetJumlahLalinByGerbang}
              xAxis={[
                { 
                  scaleType: 'band', 
                  dataKey: 'gerbang',
                }
              ]}
              series={[
                {
                  dataKey: 'lalin',
                }
              ]}
            />
            <PieChart
              title="Total Lalin"
              series={
                [
                  {
                    data: datasetLalinByRuas,
                    innerRadius: 30,
                  }
                ]
              }
            />
          </Box>
        </Stack>
      </Stack>
    </Layout>
  );
};

export default withAuth(Dashboard);