import { Backdrop, Box, IconButton, Modal as MuiModal, Stack, Typography } from "@mui/material";
import Fade from '@mui/material/Fade';

import CloseIcon from '@mui/icons-material/Close';
import { Button } from "@/components/atoms";
import { TFormModalProps } from "@/@types/components/molecules";

const styles = (theme: any) => ({
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 650,
  bgcolor: 'background.paper',
  border: '2px solid #BCBCBC',
  borderRadius: '12px',
  boxShadow: 24,
  [theme.breakpoints.down('xl')]: {
    p: 2,
  },
  [theme.breakpoints.up('xl')]: {
    p: 4,
  },
  '&:focus': {
    outline: 'none',
  },
  "*::-webkit-scrollbar": {
    width: "5px"
  },
  "*::-webkit-scrollbar-track": {
    background: (theme: any) => theme.palette?.whiteGray?.main,
  },
  "*::-webkit-scrollbar-thumb": {
    background: (theme: any) => theme.palette?.whiteGray?.dark,
    borderRadius: "12px"
  }
});

const FormModal: React.FC<TFormModalProps> = ({
  title,
  children,
  description,
  onCancel,
  onSubmit,
  titleConfirm = 'Confirm',
  disabledConfirmButton = false,
  sxTitle = {
    fontSize: 28,
    fontWeight: 700,
    color: '#585858',
    textAlign: 'left',
  },
  heightContent = '64vh',
  isLoading,
  loadingWithoutText,
  ...props
}) => {
  return (
    <MuiModal 
      slots={{
        backdrop: Backdrop
      }}
      slotProps={{
        backdrop: {
          timeout: 300
        }
      }}
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      {...props}
    >
      <Fade in={props.open}>
        <Box
          sx={(theme) => styles(theme)}
        >
          <Stack spacing={3}>
            <Stack spacing={1}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ width: '100%' }}>
                  <Typography 
                    id="transition-modal-title" 
                    {...sxTitle}
                  >
                    {title}
                  </Typography>
                </Box>
                <IconButton
                  onClick={props.onClose}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
              <Box>
                <Typography 
                  id="transition-modal-description"
                  fontSize={14} 
                  color={'#585858'}
                >
                  {description}
                </Typography>
              </Box>
            </Stack>
            <Box
              sx={{
                overflowY: 'auto',
                overflowX: 'hidden',
                maxHeight: heightContent,
              }}
            >
              {children}
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                '& > :not(:last-child)': {
                  marginRight: '16px',
                }
              }}
            >
              <Button 
                onClick={onCancel}
              >
                Cancel
              </Button>
              <Button
                onClick={onSubmit}
                disabled={disabledConfirmButton}
                variant="contained"
                isLoading={isLoading}
                loadingWithoutText={loadingWithoutText}
              >
                {titleConfirm}
              </Button>
            </Box>
          </Stack>
        </Box>
      </Fade>
    </MuiModal>
  );
};

export default FormModal;