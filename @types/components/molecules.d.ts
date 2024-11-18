import { PieChartProps } from "@mui/x-charts";
import { TButtonProps } from "./atoms";
import { TablePaginationProps } from "@mui/material";

type TPaginationProps = {
  totalPages?: number;
  onPageChange?: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  onChangeRowPerPage?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
} & TablePaginationProps;

type TBaseTableProps = {
  title: string;
  dataSource: any[];
  columns: any[];
  customFooter?: React.ReactNode;
  titleCreateButton?: string;
  isCreateButton?: boolean;
  onCreateButton?: () => void;
  placeholderSearch?: string;
  onSelectedCheckbox?: (val: readonly number[]) => void;
  checkboxSelection?: boolean;
  bulkActions?: React.ReactNode;
  isExportButton?: boolean;
  isFilterButton?: boolean;
  isSearchInput?: boolean;
  customFilter?: React.ReactNode;
  onClickExport?: () => void;
  itemsFilter?: any[];
  pagination?: {
    total?: number;
    currentPage?: number;
    lastPage?: number;
    limit?: number;
  };
  handleChangeFilter?: (key: string) => void;
  selectedFilter?: string;
  handleChangeSearch?: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  isLoading?: boolean;
  onChangeRowPerPage: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handlePageChange: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
};

type TFormModalProps = {
  title: string;
  children: React.ReactNode;
  description?: string;
  onCancel: () => void;
  onSubmit?: () => void;
  onClose: () => void;
  titleConfirm: string;
  disabledConfirmButton?: boolean;
  sxTitle?: TypographyProps;
  heightContent?: string;
} & ModalProps & TButtonProps