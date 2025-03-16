import { Box, Typography, CircularProgress, Button } from "@mui/material";
import { useGetRepairQuery } from "../../apislice/repairApiSlice";
import { numberWithCommas } from "../../util/numberWithCommas";
import { useParams } from "react-router";
import { dateAndTimeFormat } from "../../util/dateAndTimeFormat";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import { Print } from "@mui/icons-material";

const RepairInvoice = () => {
  const { id } = useParams();
  const { data: repair, error, isLoading } = useGetRepairQuery(Number(id));

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  // Loading state
  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  // Error state
  if (error) {
    return (
      <Typography variant="h6" color="error" align="center">
        Error fetching invoice details.
      </Typography>
    );
  }

  return (
    <Box>
      <Box
        sx={{
          padding: "2mm",
          m: 1,
          maxWidth: "21cm",

          border: "1px solid #000",
        }}
        ref={contentRef}
      >
        {/* Logo and Header */}
        <Box display="flex" justifyContent="center" alignItems="center">
          {/* <img
          src={invoiceDetail.logo}
          alt="Vision Plus Logo"
          style={{ height: "8mm", margin: "0 -4mm" }}
        /> */}
          <Typography
            sx={{ fontFamily: "Algerian", fontSize: "6mm" }}
            variant="h6"
            align="center"
            fontWeight="bold"
          >
            BEST WAY MOBILE (PVT) LTD
          </Typography>
        </Box>

        <Typography variant="body2" align="center">
          Tel: 071- 9990599 / 075 2296970
        </Typography>
        <Typography variant="body2" align="center">
          {dateAndTimeFormat(repair?.created_at)}{" "}
          {/* Use DateView utility function */}
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <Box sx={{ alignSelf: "flex-end" }}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "15mm 1fr",
                gridTemplateRows: "repeat(3, 1fr)", // 3 equal columns
              }}
            >
              <Typography variant="body2">Name</Typography>
              <Typography variant="body2">
                <span style={{ margin: "0 1mm", fontWeight: "bold" }}>:</span>
                {repair?.customer?.name}
              </Typography>
              {/* <Typography variant="body2">Address</Typography>
            <Typography variant="body2">
              <span style={{ margin: "0 1mm", fontWeight: "bold" }}>:</span>
              {invoiceDetail?.customer?.address}
            </Typography> */}
              <Typography variant="body2">Contact</Typography>
              <Typography variant="body2">
                <span style={{ margin: "0 1mm", fontWeight: "bold" }}>:</span>
                {repair?.customer?.mobile}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ textAlign: "left" }}>
            <Typography variant="body2">
              <span style={{ fontWeight: "bold", fontSize: "16px" }}>
                Repair NO :{repair?.id}
              </span>
            </Typography>
            <Typography variant="body2">York Complex</Typography>
            <Typography variant="body2">No 90/2 Main Street</Typography>
            <Typography variant="body2">Mawanella</Typography>
          </Box>
        </Box>

        {/* Table using CSS Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "2fr 21mm",
            gap: "1px",
            border: "2px solid #000",
            mt: "2mm",
          }}
        >
          {/* Table Header */}
          <Box
            sx={{
              gridColumn: "1 / -1",
              display: "grid",
              gridTemplateColumns: "2fr 21mm",
              fontWeight: "bold",
              paddingY: "8px",
              paddingX: "2mm",
              borderBottom: "1px solid #000",
            }}
          >
            <Box sx={{ marginLeft: "" }}>Description</Box>
            <Box sx={{ textAlign: "right" }}>Amount</Box>
          </Box>

          {/* Item List */}

          <Box
            sx={{
              gridColumn: "1 / -1",
              display: "grid",
              gridTemplateColumns: "2fr 21mm",
              backgroundColor: "#fff",
              padding: "2mm",
              borderBottom: "1px solid #000",
            }}
          >
            <Box sx={{ textAlign: "left" }}>{repair?.repair_issue}</Box>
            <Box sx={{ textAlign: "right" }}>
              {numberWithCommas(repair?.total_price || 0)}
            </Box>
          </Box>
          <Box
            sx={{
              gridColumn: "1 / -1",
              display: "grid",
              gridTemplateColumns: "2fr 21mm",
              backgroundColor: "#fff",
              padding: "2mm",
              borderBottom: "1px solid #000",
            }}
          >
            <Box sx={{ textAlign: "left" }}>Total Payment</Box>
            <Box sx={{ textAlign: "right" }}>
              {numberWithCommas(
                (repair?.total_price || 0) - (repair?.balance || 0)
              )}
            </Box>
          </Box>
          <Box
            sx={{
              gridColumn: "1 / -1",
              display: "grid",
              gridTemplateColumns: "2fr 21mm",
              backgroundColor: "#fff",
              padding: "2mm",
              borderBottom: "1px solid #000",
            }}
          >
            <Box sx={{ textAlign: "left" }}>Balance</Box>
            <Box sx={{ textAlign: "right" }}>
              {numberWithCommas(repair?.balance || 0)}
            </Box>
          </Box>
        </Box>
      </Box>
      <Button variant="contained" onClick={() => reactToPrintFn()}>
        <Print /> Print
      </Button>
    </Box>
  );
};

export default RepairInvoice;
