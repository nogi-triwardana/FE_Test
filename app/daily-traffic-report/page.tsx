"use client"

import { Layout } from "@/components/templates";
import { Table } from "@/components/molecules";
import { Box, Stack, Typography } from "@mui/material";
import withAuth from "@/utils/withAuth";
import { useQueryGetTrafficList } from "@/hooks/Queries";
import { useEffect, useMemo, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { Button, DatePicker } from "@/components/atoms";

function DailyTrafficReport() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [date, setDate] = useState<string | null>(null);
  const filter = {
    page: page,
    limit: limit,
    tanggal: date
  };
  const { trafficListData, trafficIsLoading, trafficRefetch, paginationData } = useQueryGetTrafficList(filter);

  useEffect(() => {
    trafficRefetch();
  }, [page, limit, date]);

  const paymentMethodBadge = (item: any) => {
    switch(true) {
      case (item.DinasKary !== 0 || item.DinasMitra !== 0 || item.DinasOpr !== 0):
        return 'KTP';
      case (item.eBca !== 0 || item.eBni !== 0 || item.eBri !== 0 || item.eDKI !== 0 || item.eMandiri !== 0):
        return 'E-Toll';
      case (item.eFlo !== 0):
        return 'Flo';
      case (item.Tunai !== 0):
        return 'Tunai';
      default:
        return '-'; 
    }
  }

  const columns = useMemo(() => ([
    {
      index: 'IdCabang',
      label: 'Ruas',
      render: (data: any) => {
        return 'Ruas ' + data?.IdCabang;
      }
    },
    {
      index: 'IdGerbang',
      label: 'Gerbang',
      render: (data: any) => {
        return 'Gerbang ' + data?.IdGerbang;
      }
    },
    {
      index: 'IdGardu',
      label: 'Gardu',
      render: (data: any) => {
        return 'Gardu ' + data?.IdGardu;
      }
    },
    {
      index: 'day',
      label: 'Hari',
      render: (data: any) => {
        return dayjs(data?.Tanggal).format("dddd");
      }
    },
    {
      index: 'Tanggal',
      label: 'Tanggal',
      render: (data: any) => {
        return dayjs(data?.Tanggal).format("DD MMM YYYY");
      }
    },
    {
      index: 'payment_method',
      label: 'Metode Pembayaran',
      render: (data: any) => {
        return paymentMethodBadge(data);
      }
    },
    {
      index: 'gol1',
      label: 'Gol I',
      render: () => {
        return '-';
      }
    },
    {
      index: 'gol2',
      label: 'Gol II',
      render: () => {
        return '-';
      }
    },
    {
      index: 'gol3',
      label: 'Gol III',
      render: () => {
        return '-';
      }
    },
    {
      index: 'gol4',
      label: 'Gol IV',
      render: () => {
        return '-';
      }
    },
    {
      index: 'gol5',
      label: 'Gol V',
      render: () => {
        return '-';
      }
    },
    {
      index: 'total_lalin',
      label: 'Total Lalin',
      render: () => {
        return '-';
      }
    },
  ]), []);

  return (
    <Layout>
      <Stack 
        spacing={3}
      >
        <Typography 
          fontSize={24} 
          fontWeight={700}
          color={'#585858'}
          marginY={2}
        >
          Laporan Lalin Per Hari
        </Typography>
        <Table
          title={''}
          columns={columns}
          dataSource={trafficListData}
          pagination={paginationData}
          isLoading={trafficIsLoading}
          isFilterButton={false}
          isSearchInput={false}
          customFilter={(
            <Box sx={{ display: "flex", gap: 2 }}>
              <DatePicker
                asController={false}
                onChange={(date: Dayjs) => setDate(dayjs(date).format('YYYY-MM-DD'))}
                value={dayjs(date)}
              />
              <Button
                variant="contained"
                onClick={() => setDate(null)}
              >
                Reset
              </Button>
            </Box>
            
          )}
          handlePageChange={(event: React.MouseEvent<HTMLButtonElement> | null, page: number) => 
            setPage(page)
          }
          onChangeRowPerPage={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => 
            setLimit(parseInt(event.target.value, 10))
          }
          titleCreateButton="Tambah"
        />
      </Stack>
    </Layout>
  );
};

export default withAuth(DailyTrafficReport);