import { Dispatch, FC, SetStateAction, useState } from "react";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableFooter,
  TablePagination,
  useTheme,
} from "@mui/material";
import { transformDocumentsData } from "./helpers/transformDocumentsData";
import { TablePaginationActions } from "./TablePaginationActions";
import { Document } from "../../mocks/responses/documentsQueryResponse";

interface DocumentsTableProps {
  data: ReturnType<typeof transformDocumentsData>;
  selectedDocumentId: Document["id"];
  setSelectedDocumentId: Dispatch<SetStateAction<Document["id"]>>;
}

export const DocumentsTable: FC<DocumentsTableProps> = ({
  data,
  selectedDocumentId,
  setSelectedDocumentId,
}) => {
  const { palette } = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="documents table">
        <TableHead>
          <TableRow>
            <TableCell>Numer</TableCell>
            <TableCell>Nazwa obiegu</TableCell>
            <TableCell>Nazwa etapu</TableCell>
            <TableCell>Data przekazania</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Etap</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : data
          ).map((row) => (
            <TableRow
              key={row.id}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                backgroundColor:
                  selectedDocumentId === row.id ? palette.grey[100] : undefined,
              }}
              onClick={() => setSelectedDocumentId(row.id)}
            >
              <TableCell component="th" scope="row">
                {row.internalId}
              </TableCell>
              <TableCell>{row.runName}</TableCell>
              <TableCell>{row.stageName}</TableCell>
              <TableCell>{row.lastRunAt}</TableCell>
              <TableCell>{row.stageStatus}</TableCell>
              <TableCell>{row.assignee}</TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[
                10,
                25,
                50,
                100,
                { label: "All", value: -1 },
              ]}
              colSpan={3}
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  "aria-label": "rows per page",
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};
