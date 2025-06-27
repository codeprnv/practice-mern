import { closeSnackbar, enqueueSnackbar } from "notistack";

const action = (snackbarId) => (
  <div className="flex w-fit items-center px-2">
    <button
      className="cursor-pointer"
      onClick={() => {
        closeSnackbar(snackbarId);
      }}
    >
      Dismiss
    </button>
  </div>
);

export const Notify = (message, variant="success") => {
  enqueueSnackbar(message, {
    variant: variant,
    anchorOrigin: {
      vertical: "top",
      horizontal: "center",
    },
    autoHideDuration: 5000,
    action: action,
  });
};
