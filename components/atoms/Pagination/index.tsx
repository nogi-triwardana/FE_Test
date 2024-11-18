import { TPaginationProps } from "@/@types/components/molecules";
import { Pagination as MuiPagination, TablePagination, TablePaginationProps } from "@mui/material";

const Pagination: React.FC<TPaginationProps> = ({
  onChangeRowPerPage,
  onPageChange,
  // ...props
}) => {
  return (
    <TablePagination
      component={"div"}
      page={1}
      rowsPerPage={10}
      onPageChange={onPageChange}
      onRowsPerPageChange={onChangeRowPerPage}
      count={100}
      // {...props}
    />
    // <MuiPagination
    //   sx={{
    //     display: 'flex',
    //     justifyContent: 'center',
    //     color: '#969696',
    //     '& .Mui-selected': {
    //       border: '2px solid #128DA6',
    //     },
    //     '& .MuiPaginationItem-root:focus': {
    //       outline: 'none'
    //     },
    //   }}
    //   onChange={onChangePagination}
    //   showFirstButton
    //   showLastButton
    //   count={totalPages}
      
    //   variant="outlined"
    //   shape="rounded"
    // />
  );
};

export default Pagination;