import { FC } from "react";
import {
  Box,
  Button,
  Divider,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { MainNavigation } from "../layouts/MainNavigation";
import { Loader } from "../ui-components/Loader";
import { useIsImageLoaded } from "./scan/hooks/useIsImageLoaded";
import { Controller, useForm } from "react-hook-form";
import AddIcon from "@mui/icons-material/Add";

export const Scan: FC = () => {
  const scanSrc = "/assets/images/faktura.jpg";
  const isScanLoaded = useIsImageLoaded(scanSrc);
  const { control } = useForm();

  if (isScanLoaded) {
    return (
      <MainNavigation title="Skanowanie OCR">
        <Loader>Ładowanie danych...</Loader>
      </MainNavigation>
    );
  }

  const renderForm = () => {
    return (
      <Box
        gap={4}
        component="form"
        display="flex"
        flexWrap="wrap"
        height="fit-content"
      >
        <Controller
          control={control}
          name="number"
          defaultValue="FV 1/09/2021"
          render={({ field }) => (
            <TextField {...field} label="Numer dokumentu" />
          )}
        />
        <Controller
          control={control}
          name="sellerNip"
          defaultValue="97200952739"
          render={({ field }) => (
            <TextField {...field} label="NIP sprzedawcy" />
          )}
        />
        <Controller
          control={control}
          name="receivedAt"
          defaultValue="2019-09-28"
          render={({ field }) => (
            <TextField {...field} label="Data wpływu dokumentu" />
          )}
        />
        <Controller
          control={control}
          name="paymentAt"
          defaultValue="2019-10-10"
          render={({ field }) => (
            <TextField {...field} label="Data płatności" />
          )}
        />
        <Controller
          control={control}
          name="vat"
          defaultValue="2990.80"
          render={({ field }) => <TextField {...field} label="Podatek VAT" />}
        />
        <Controller
          control={control}
          name="gross"
          defaultValue="15953.10"
          render={({ field }) => <TextField {...field} label="Kwota brutto" />}
        />
        <Controller
          control={control}
          name="currency"
          defaultValue="PLN"
          render={({ field }) => <TextField {...field} label="Waluta" />}
        />
      </Box>
    );
  };

  return (
    <MainNavigation title="Skanowanie OCR">
      <Stack padding={4} gap={4}>
        <Box>
          <Button variant="contained">
            <AddIcon />
            <Typography marginLeft={1}>Rozpocznij nowe skanowanie</Typography>
          </Button>
        </Box>

        <Typography component="h1" variant="h5">
          Podgląd skanu
        </Typography>

        <Box display="flex" gap={4}>
          <img src={scanSrc} height={450} alt="invoice" />
          <Stack gap={4} divider={<Divider />}>
            {renderForm()}

            <TableContainer component={Paper}>
              <Table aria-label="documents table">
                <TableHead>
                  <TableRow>
                    <TableCell>Lp.</TableCell>
                    <TableCell>Towar</TableCell>
                    <TableCell>Ilość</TableCell>
                    <TableCell>Cena netto</TableCell>
                    <TableCell>Wartość netto</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell>
                      <Controller
                        control={control}
                        name="lp1"
                        defaultValue="1"
                        render={({ field }) => (
                          <TextField {...field} sx={{ width: 50 }} />
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <Controller
                        control={control}
                        name="item1"
                        defaultValue="Oprogramowanie"
                        render={({ field }) => <TextField {...field} />}
                      />
                    </TableCell>
                    <TableCell>
                      <Controller
                        control={control}
                        name="quantity1"
                        defaultValue="1 szt."
                        render={({ field }) => (
                          <TextField {...field} sx={{ width: 75 }} />
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <Controller
                        control={control}
                        name="netPrice1"
                        defaultValue="16200"
                        render={({ field }) => <TextField {...field} />}
                      />
                    </TableCell>
                    <TableCell>
                      <Controller
                        control={control}
                        name="finalPrice1"
                        defaultValue="12950"
                        render={({ field }) => <TextField {...field} />}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell>
                      <Controller
                        control={control}
                        name="lp2"
                        defaultValue="2"
                        render={({ field }) => (
                          <TextField {...field} sx={{ width: 50 }} />
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <Controller
                        control={control}
                        name="item2"
                        defaultValue="Dostawa"
                        render={({ field }) => <TextField {...field} />}
                      />
                    </TableCell>
                    <TableCell>
                      <Controller
                        control={control}
                        name="quantity2"
                        defaultValue="1 szt."
                        render={({ field }) => (
                          <TextField {...field} sx={{ width: 75 }} />
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <Controller
                        control={control}
                        name="netPrice2"
                        defaultValue="10"
                        render={({ field }) => <TextField {...field} />}
                      />
                    </TableCell>
                    <TableCell>
                      <Controller
                        control={control}
                        name="finalPrice2"
                        defaultValue="10"
                        render={({ field }) => <TextField {...field} />}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <Box>
              <Button variant="contained">
                <Typography>Zapisz skan</Typography>
              </Button>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </MainNavigation>
  );
};
