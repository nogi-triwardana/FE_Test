import { forwardRef } from "react";
import { DatePicker as MuiXDatePicker } from "@mui/x-date-pickers";
import { Controller } from "react-hook-form";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { TDatePickerProps } from "@/@types/components/atoms";

const DatePicker = forwardRef<TDatePickerProps, any>(({
  control,
  controllerName,
  placeholder = '',
  asController = true,
  ...props
}, ref) => {
  if(asController) {
    return (
      <Controller
        control={control}
        name={controllerName}
        render={({
          field: { value, onChange },
          fieldState: { error, invalid },
        }) => {
          return (
            <MuiXDatePicker
              value={value}
              onChange={onChange}
              slotProps={{
                textField: {
                  placeholder: placeholder
                },
              }}
              slots={{
                openPickerIcon: CalendarMonthIcon,
              }}
              {...props}
            />
          );
        }}
      />
    );
  } else {
    return (
      <MuiXDatePicker
        slotProps={{
          textField: {
            placeholder: placeholder
          }
        }}
        slots={{
          openPickerIcon: CalendarMonthIcon,
        }}
        {...props}
      />
    );
  }
});

export default DatePicker;