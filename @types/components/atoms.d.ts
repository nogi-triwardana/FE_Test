import { DatePickerProps } from "@mui/x-date-pickers";
import { Control } from "react-hook-form";

type TButtonProps = {
  isLoading?: boolean;
  loadingWithoutText?: boolean;
} & ButtonProps;

type TDropdownProps = {
  trigger: ReactElement<any, string | JSXElementConstructor<any>>;
  menu?: React.ReactNode[];
  width?: string;
  onClose?: () => void;
} & Partial<MenuProps>;

type TFormInputProps = {
  control?: Control<any>;
  controllerName: string;
  id?: string;
  startIcon?: React.ReactNode | null;
  endIcon?: React.ReactNode | null;
  placeholder?: string;
  maxCharCounter?: boolean | number;
  borderRadius?: string;
  borderColor?: string;
  width?: string;
  customLabelBottom?: React.ReactNode | boolean;
  isPaddingWrapper?: boolean;
  prefixInput?: string;
} & TextFieldProps;

type IPaginationProps = {
  totalPages?: number;
  onChangePagination?: (e: any, page: any) => void;
}

type TDatePickerProps = {
  control?: Control<any>;
  controllerName?: string;
  asContoller: boolean;
} & DatePickerProps;
