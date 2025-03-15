import { Box, Typography, CircularProgress, Button } from "@mui/material";
import { useGetSingleOrderQuery } from "../../apislice/orderApiSlice";
import { numberWithCommas } from "../../util/numberWithCommas";
import { useParams } from "react-router";
import { dateAndTimeFormat } from "../../util/dateAndTimeFormat";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import { Print } from "@mui/icons-material";
const Invoice = () => {
  const { id } = useParams();
  // Fetch invoice data using RTK Query
  const {
    data: invoice,
    error,
    isLoading,
  } = useGetSingleOrderQuery(Number(id)); // Assuming id is passed as a prop
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

  // Invoice data
  const invoiceDetail = invoice;

  return (
    <Box>
      <Box
        sx={{
          padding: "4mm",
          m: 1,
          minWidth: "7cm", // A5 width
          minHeight: "10.5cm", // A5 height
          maxWidth: "21cm",

          border: "1px solid #000",
          fontFamily: "Arial, sans-serif",
          "@media print": {
            minWidth: "14cm",
            minHeight: "21cm",
            border: "none",
            margin: "0",
          },
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
          {dateAndTimeFormat(invoiceDetail?.created_at)}{" "}
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
                {invoiceDetail?.customer?.name}
              </Typography>
              {/* <Typography variant="body2">Address</Typography>
            <Typography variant="body2">
              <span style={{ margin: "0 1mm", fontWeight: "bold" }}>:</span>
              {invoiceDetail?.customer?.address}
            </Typography> */}
              <Typography variant="body2">Contact</Typography>
              <Typography variant="body2">
                <span style={{ margin: "0 1mm", fontWeight: "bold" }}>:</span>
                {invoiceDetail?.customer?.mobile}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ textAlign: "left" }}>
            <Typography variant="body2">
              <span style={{ fontWeight: "bold", fontSize: "16px" }}>
                INVOICE NO :{invoiceDetail?.id}
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
            gridTemplateColumns: "2fr 1fr 21mm 21mm",
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
              gridTemplateColumns: "2fr 24mm 21mm 21mm",
              fontWeight: "bold",
              paddingY: "8px",
              paddingX: "2mm",
              borderBottom: "1px solid #000",
            }}
          >
            <Box sx={{ marginLeft: "" }}>Item Name</Box>
            <Box sx={{ textAlign: "left" }}>Qty</Box>
            <Box sx={{ textAlign: "left" }}>Unit</Box>
            <Box sx={{ textAlign: "right" }}>Value</Box>
          </Box>

          {/* Item List */}
          {invoiceDetail?.items?.map((item, index) => (
            <Box
              sx={{
                gridColumn: "1 / -1",
                display: "grid",
                gridTemplateColumns: "2fr 21mm 22mm 21mm",
                backgroundColor: "#fff",
                paddingX: "2mm",
                borderBottom: "1px solid #000",
              }}
              key={index}
            >
              <Box sx={{ textAlign: "left" }}>{item.product_name}</Box>
              <Box sx={{ textAlign: "left" }}>{item.quantity}</Box>
              <Box sx={{ textAlign: "left" }}>
                {numberWithCommas(item.price)}
              </Box>
              <Box sx={{ textAlign: "right" }}>
                {numberWithCommas(item.quantity * parseInt(item.price))}
              </Box>
            </Box>
          ))}

          {/* Totals */}
          <Box
            sx={{
              gridColumn: "1 / -1",
              display: "grid",
              gridTemplateColumns: "2fr 1fr 24mm 21mm",
              backgroundColor: "#fff",
            }}
          >
            <Box
              sx={{
                gridColumn: "3 / 4",
                padding: "1mm",
                borderBottom: "1px solid #000",
                borderLeft: "1px solid #000",
              }}
            >
              Subtotal
            </Box>
            <Box
              sx={{
                textAlign: "right",
                gridColumn: "4 / 6",
                padding: "1mm",
                borderBottom: "1px solid #000",
              }}
            >
              {numberWithCommas(invoiceDetail?.sub_total)}
            </Box>
          </Box>

          <Box
            sx={{
              gridColumn: "1 / -1",
              display: "grid",
              gridTemplateColumns: "2fr 1fr 24mm 21mm",
              backgroundColor: "#fff",
            }}
          >
            <Box
              sx={{
                gridColumn: "3 / 4",
                padding: "1mm",
                borderBottom: "1px solid #000",
                paddingLeft: "1mm",
                borderLeft: "1px solid #000",
              }}
            >
              Discounts
            </Box>
            <Box
              sx={{
                textAlign: "right",
                gridColumn: "4 / 6",
                padding: "1mm",
                borderBottom: "1px solid #000",
              }}
            >
              {numberWithCommas(invoiceDetail?.discount)}
            </Box>
          </Box>

          <Box
            sx={{
              gridColumn: "1 / -1",
              display: "grid",
              gridTemplateColumns: "2fr 1fr 24mm 21mm",
              backgroundColor: "#fff",
            }}
          >
            <Box
              sx={{
                gridColumn: "3 / 4",
                fontWeight: "bold",
                textAlign: "left",
                padding: "1mm",
                borderBottom: "1px solid #000",
                paddingLeft: "1mm",
                borderLeft: "1px solid #000",
              }}
            >
              Total
            </Box>
            <Box
              sx={{
                textAlign: "right",
                gridColumn: "4 / 6",
                padding: "1mm",
                borderBottom: "1px solid #000",
              }}
            >
              <strong>{numberWithCommas(invoiceDetail?.total)}</strong>
            </Box>
          </Box>

          {/* Payments and Balance */}
          <Box
            sx={{
              gridColumn: "1 / -1",
              display: "grid",
              gridTemplateColumns: "2fr 1fr 24mm 21mm",
              backgroundColor: "#fff",
            }}
          >
            <Box
              sx={{
                gridColumn: "3 / 4",
                paddingLeft: "1mm",
                borderLeft: "1px solid #000",
                borderBottom: "1px solid #000",
              }}
            >
              Payment
            </Box>
            <Box
              sx={{
                textAlign: "right",
                gridColumn: "4 / 6",
                padding: "1mm",
                borderBottom: "1px solid #000",
              }}
            >
              {numberWithCommas(invoiceDetail?.total - invoiceDetail?.balance)}
            </Box>
          </Box>

          <Box
            sx={{
              gridColumn: "1 / -1",
              display: "grid",
              gridTemplateColumns: "2fr 1fr 24mm 21mm",
              backgroundColor: "#fff",
            }}
          >
            <Box
              sx={{
                gridColumn: "3 / 4",
                fontWeight: "bold",
                paddingLeft: "1mm",
                borderLeft: "1px solid #000",
              }}
            >
              Balance
            </Box>
            <Box
              sx={{
                textAlign: "right",
                gridColumn: "4 / 6",
                fontWeight: "bold",
                padding: "1mm",
              }}
            >
              {numberWithCommas(invoiceDetail?.balance)}
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

export default Invoice;
