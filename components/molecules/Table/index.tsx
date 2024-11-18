import { styled } from '@mui/material/styles';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Card, Divider, MenuItem, Stack, TablePagination, Table as MuiTable } from '@mui/material';
import { Button, DatePicker, Dropdown, SearchInput } from '@/components/atoms';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import TableSortLabel from '@mui/material/TableSortLabel';
import { Fragment } from 'react/jsx-runtime';
import Checkbox from "@mui/material/Checkbox";
import { memo, useEffect, useRef, useState } from 'react';
import DownloadIcon from '@mui/icons-material/Download';
import FilterListIcon from '@mui/icons-material/FilterList';
import { TBaseTableProps } from '@/@types/components/molecules';
import { TDropdownProps } from '@/@types/components/atoms';

const StyledTableCellHead = styled(TableSortLabel)((theme: any) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette?.blueSky?.main,
    color: 'white',
  },
  color: 'white',
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }: any) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette?.blueSky?.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  '&:nth-of-type(even)': {
    backgroundColor: '#E1EEF7',
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const getValueCell = (data: any, col: any) => {
  if(typeof col?.render === 'function') return col?.render(data);
  return data[col?.index];
}

const ColumnTableHead = memo(({ column, index }: any) => {
  const [sortMethod, setSortMethod] = useState<'desc' | 'asc'>('asc');

  const handleSort = () => {
    setSortMethod((curr) => {
      return curr === 'asc' ? 'desc' : 'asc';
    });

    const newSorter = sortMethod === 'asc' ? 'desc' : 'asc';

    column?.sorter(`${column.index}:${newSorter}`);
  }

  return (
    <StyledTableCell 
      key={'column-table-' + index}
      align="center"
    >
      <StyledTableCellHead 
        active={column?.sortable}
        direction={sortMethod}
        onClick={handleSort}
        sx={{
          '&.Mui-active': {
            color: 'white'
          },
          '& .MuiTableSortLabel-icon': {
            color: 'white !important',
          },
        }}
      >
        {column?.label}
      </StyledTableCellHead>
    </StyledTableCell>
  );
});

const Table = ({
  title,
  dataSource,
  columns,
  isCreateButton = false,
  titleCreateButton = '',
  onCreateButton,
  placeholderSearch = 'Search',
  checkboxSelection = false,
  onSelectedCheckbox,
  isExportButton = false,
  isFilterButton = true,
  isSearchInput = true,
  customFilter = <Fragment />,
  onClickExport,
  itemsFilter = [],
  handleChangeFilter,
  selectedFilter,
  handleChangeSearch,
  isLoading = false,
  pagination,
  handlePageChange,
  onChangeRowPerPage,
}: TBaseTableProps) => {
  const [selected, setSelected] = useState<readonly number[]>([]);
  const dropdownRef = useRef<Partial<TDropdownProps>>(null);

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  useEffect(() => {
    onSelectedCheckbox?.(selected);
  }, [selected]);

  return (
    <Card
      sx={{
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0px 1px 6px 1px rgba(9, 21, 28, 0.15)',
        padding: '16px',
        '& > :not(:last-child)': {
          marginBottom: '16px',
        },
        '&:focus': {
          outline: 'none',
        },
        overflowX: 'scroll',
        // width: '100%'
      }}
    >
      <Stack 
        sx={{ 
          minWidth: '900px',
          width: '100%', 
          overflowX: 'auto',
        }}
        spacing={2}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box 
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: "100%",
              '& > :not(:last-child)': {
                marginRight: '16px',
              },
            }}
          >
            {isSearchInput && (
              <SearchInput
                startIcon={<SearchIcon htmlColor='#128DA6' />}
                placeholder={placeholderSearch}
                onChange={handleChangeSearch}
              />
            )}
            {customFilter}
            <Box sx={{ display: "flex", gap: 2 }}>
              {isFilterButton && (
                <Dropdown
                  ref={dropdownRef}
                  trigger={(
                    <Button
                      startIcon={<FilterListIcon />}
                      variant="outlined"
                    >
                      Filter
                    </Button>
                  )}
                  menu={
                    itemsFilter?.map((el, key) => (
                      <Fragment key={'fragment-' + key}>
                        <MenuItem 
                          onClick={() => {
                            dropdownRef?.current?.onClose?.();
                            handleChangeFilter?.(el?.value)
                          }} 
                          sx={{ 
                            color: '#585858', 
                            fontWeight: 500,
                            backgroundColor: el.value === selectedFilter ? '#E1EEF7' : 'transparent',
                          }}
                        >
                          {el?.label}
                        </MenuItem>
                        <Divider sx={{ borderColor: '#E1E1E1', my: '20px' }} />
                      </Fragment>
                    ))
                  }
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                />
              )}
              {isExportButton && (
                <Button
                  startIcon={<DownloadIcon width={18} height={18} />}
                  onClick={onClickExport}
                  variant="outlined"
                >
                  Export
                </Button>
              )}
              {isCreateButton && (
                <Button
                  startIcon={<AddIcon />}
                  variant="contained"
                  onClick={onCreateButton}
                >
                  {titleCreateButton}
                </Button>
              )}
            </Box>
          </Box>
        </Box>
        <TableContainer 
          component={Paper} 
          sx={{ borderRadius: '12px', maxWidth: '70vw', width: '100%' }}
        >
          <MuiTable aria-label="customized table">
            <TableHead
              sx={{
                backgroundColor: '#3990CA'
              }}
            >
              <TableRow 
                sx={{
                  backgroundColor: '#3990CA'
                }}
              >
                {columns.map((col: any, key: number) => (
                  <ColumnTableHead
                    key={'column-head' + key}
                    index={key}
                    column={col}
                  />
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <StyledTableRow>
                  <TableCell
                    sx={{
                      color: '#585858',
                      textAlign: 'center'
                    }}
                    colSpan={columns.length}
                  >
                    Loading...
                  </TableCell>
                </StyledTableRow>
              ) : (
                dataSource?.length > 0 ?
                  dataSource?.map((data: any, key: number) => {
                    const isItemSelected = isSelected(data.id);
                    const labelId = `enhanced-table-checkbox-${key}`;

                    return (
                      <StyledTableRow 
                        key={'row-table-' + key}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        {columns.map((col: any) => {
                          return (
                            <TableCell 
                              key={'column-' + col.index}
                              align="center"
                              sx={{
                                color: '#585858'
                              }}
                            >
                              {getValueCell(data, col)}
                            </TableCell>
                          )
                        })}
                      </StyledTableRow>
                    )
                  })
                : (
                  <StyledTableRow>
                    <TableCell
                      sx={{
                        color: '#585858',
                        textAlign: 'center'
                      }}
                      colSpan={columns.length}
                    >
                      data is not available
                    </TableCell>
                  </StyledTableRow>
                )
              )}
            </TableBody>
          </MuiTable>
        </TableContainer>
        <TablePagination
          component={"div"}
          page={pagination?.currentPage ?? 1}
          rowsPerPage={pagination?.limit ?? 10}
          onPageChange={handlePageChange}
          onRowsPerPageChange={onChangeRowPerPage}
          count={pagination?.total ?? 0}
        />
      </Stack>
    </Card>
  );
};

export default Table;