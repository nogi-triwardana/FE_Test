"use client" 

import { FormModal, Table } from "@/components/molecules";
import { Layout } from "@/components/templates";
import { Box, IconButton, SvgIcon, Typography, Stack } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import withAuth from "@/utils/withAuth";
import { useQueryGateMasterList } from "@/hooks/Queries";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FormInput } from "@/components/atoms";
import * as yup from "yup";
import { useYupValidationResolver } from "@/utils/helpers";
import { useMutation } from "@tanstack/react-query";
import { deleteGateMasterService, postGateMasterService, putGateMasterService } from "@/services";
import { useSnackbar } from "notistack";
import { debounce } from "lodash";

type TDefaultValues = {
  id: number | null;
  IdCabang: number | null;
  NamaCabang?: string;
  NamaGerbang?: string;
}

const defaultValues = {
  id: null,
  IdCabang: null,
  NamaCabang: "",
  NamaGerbang: "",
};

const validationSchema = yup.object({
  NamaCabang: yup.string().required("Nama ruas wajib diisi"),
  NamaGerbang: yup.string().required("Nama gerbang wajib diisi")
});

function GateMaster() {
  const [modal, setModal] = useState<{
    open: boolean;
    type: string;
    title: string;
  }>({
    open: false,
    type: "",
    title: "",
  });
  const [namaCabangKeyword, setNamaCabangKeyword] = useState<string>("");
  const [namaGerbangKeyword, setNamaGerbangKeyword] = useState<string>("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const resolver = useYupValidationResolver(validationSchema);
  const methods = useForm<TDefaultValues>({
    defaultValues,
    resolver,
  });
  const { enqueueSnackbar } = useSnackbar();
  const { control, setValue } = methods;

  const params = {
    NamaCabang: namaCabangKeyword,
    NamaGerbang: namaGerbangKeyword,
    page: page,
    limit: limit,
  };

  const { gateMasterListData, paginationData, gateMasterIsLoading, gateMasterRefetch } = useQueryGateMasterList(params);

  const handleSearch = debounce(
    useCallback((event) => {
      setNamaCabangKeyword(event.target.value);
      setNamaGerbangKeyword(event.target.value);
    }, [namaCabangKeyword, namaGerbangKeyword]),
    1000
  );

  const handleOpenModal = (type: string, title: string) => {
    setModal((curr) => ({
      ...curr,
      title: title,
      type: type,
      open: !curr.open
    }))
  }

  const handleCloseModal = () => {
    setModal((curr) => ({
      ...curr,
      title: "",
      open: false,
      type: ""
    }))
  }

  const handleOpenEditModal = (data: TDefaultValues) => {
    methods.reset(data);
    handleOpenModal("edit", "Edit Master Gerbang")
  }

  const handleOpenRemoveModal = (data: TDefaultValues) => {
    methods.reset(data);
    handleOpenModal("remove", "Hapus Master Gerbang");
  }

  const masterGateAddMutation = useMutation({
    mutationFn: postGateMasterService,
    onSuccess: (res) => {
      enqueueSnackbar(res?.data?.message, { variant: "success" });
      handleCloseModal();
      gateMasterRefetch();
      methods.reset();
    }
  });

  const masterGateEditMutation = useMutation({
    mutationFn: putGateMasterService,
    onSuccess: (res) => {
      enqueueSnackbar(res?.data?.message, { variant: "success" });
      handleCloseModal();
      gateMasterRefetch();
      methods.reset();
    }
  });
  
  const masterGateRemoveMutation = useMutation({
    mutationFn: deleteGateMasterService,
    onSuccess: (res) => {
      enqueueSnackbar(res?.data?.message, { variant: "success" });
      handleCloseModal();
      gateMasterRefetch();
      methods.reset();
    }
  });

  const handleSubmit = (payload: TDefaultValues) => {
    if(modal.type === "add") masterGateAddMutation.mutate(payload);
    if(modal.type === "edit") masterGateEditMutation.mutate(payload);
    if(modal.type === "remove") {
      delete payload["NamaCabang"];
      delete payload["NamaGerbang"];
      masterGateRemoveMutation.mutate(payload);
    }
  };

  useEffect(() => {
    gateMasterRefetch();
  }, [page, limit, namaCabangKeyword, namaGerbangKeyword]);

  // for generating id gate and id cabang
  useEffect(() => {
    if(gateMasterListData.length > 0) {
      setValue(
        "IdCabang",
        gateMasterListData[gateMasterListData.length - 1].IdCabang + 1
      );
      setValue(
        "id",
        gateMasterListData[gateMasterListData.length - 1].id + 1
      );
    }
  }, [gateMasterListData]);

  const columns = useMemo(() => ([
    {
      index: 'NamaCabang',
      label: 'Ruas',
    },
    {
      index: 'NamaGerbang',
      label: 'Gerbang',
    },
    {
      index: '',
      label: 'Aksi',
      render: (data: TDefaultValues) => {
        return (
          <Box
            sx={{
              display: "flex",
              gap: 2,
              flex: 'none',
              flexGrow: 0,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <IconButton
              onClick={() => handleOpenEditModal(data)}
            >
              <SvgIcon 
                component={EditIcon}
                sx={{
                  width: '24px',
                  height: '24px',
                  color: '#edc213',
                }}
                inheritViewBox
              />
            </IconButton>
            <IconButton>
              <SvgIcon 
                component={VisibilityIcon}
                sx={{
                  width: '24px',
                  height: '24px',
                  color: '#1337ed',
                }}
                inheritViewBox
              />
            </IconButton>
            <IconButton
              onClick={() => handleOpenRemoveModal(data)}
            >
              <SvgIcon 
                component={DeleteIcon}
                sx={{
                  width: '24px',
                  height: '24px',
                  color: '#ed2213',
                }}
                inheritViewBox
              />
            </IconButton>
          </Box>
        );
      }
    },
  ]), []);

  return (
    <FormProvider {...methods}>
      <Layout>
        <Stack>
          <Typography 
            fontSize={24} 
            fontWeight={700}
            color={'#585858'}
            marginY={2}
          >
            Master Data Gerbang
          </Typography>
          <Table
            title={''}
            columns={columns}
            dataSource={gateMasterListData}
            pagination={paginationData}
            isLoading={gateMasterIsLoading}
            handleChangeSearch={handleSearch}
            isFilterButton={false}
            handlePageChange={(event: React.MouseEvent<HTMLButtonElement> | null, page: number) => 
              setPage(page)
            }
            onChangeRowPerPage={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => 
              setLimit(parseInt(event.target.value, 10))
            }
            isCreateButton
            titleCreateButton="Tambah"
            onCreateButton={() => handleOpenModal("add", "Tambah Master Gerbang")}
          />
        </Stack>
      </Layout>
      <FormModal
        open={modal.open}
        title={modal.title}
        onClose={handleCloseModal}
        onCancel={handleCloseModal}
        onSubmit={() => methods.handleSubmit(handleSubmit)()}
        isLoading={(
          masterGateAddMutation.isPending ||
          masterGateEditMutation.isPending ||
          masterGateRemoveMutation.isPending
        )}
        titleConfirm={modal.type === 'remove' ? 'Yes' : 'Confirm'}
        loadingWithoutText
      >
        {modal.type === "remove" ? (
          <Typography color={'#585858'}>
            Apakah anda yakin mau menghapus data ini?
          </Typography>
        ) : (
          <Stack spacing={2}>
            <FormInput
              control={control}
              controllerName={'NamaCabang'}
              label={'Ruas'}
            />
            <FormInput
              control={control}
              controllerName={'NamaGerbang'}
              label={'Gerbang'}
            />
          </Stack>
        )}
      </FormModal>
    </FormProvider>
  );
};

export default withAuth(GateMaster);