import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Slider,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableFooter,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../footer/Footer";
import moment from "moment";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useNavigate } from "react-router-dom";
import publicApi from "../../APIs/PublicApi";
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';


function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const Calculate = () => {
  const shapeMap = [
    "ROUND",
    "CUSHION",
    "EMERALD",
    "OVAL",
    "PRINCESS",
    "PEAR",
    "RADIANT",
    "MARQUISE",
    "ASSCHER",
    "HEART",
  ];

  const colorMap = ["K", "J", "I", "H", "G", "F", "E", "D"];
  const clarityMap = ["SI2", "SI1", "VS2", "VS1", "VVS2", "VVS1", "IF", "FL"];
  const cutMap = ["FAIR", "GOOD", "V.GOOD", "EX."];
  const polishMap = ["FAIR", "GOOD", "V.GOOD", "EX."];
  const symmetryMap = ["FAIR", "GOOD", "V.GOOD", "EX."];
  const fluorescenceMap = ["VSTG", "STG", "MED", "FNT", "NON"];
  const [open, setOpen] = useState(false);
  const [advanced, setAdvanced] = useState(false);
  const navigate = useNavigate();

  const [origin, setOrigin] = useState("LAB");
  const [shape, setShape] = useState("ROUND");
  const [carat, setCarat] = useState(0.25);
  const [color, setColor] = useState("G");
  const [clarity, setClarity] = useState("VS1");
  const [cut, setCut] = useState("EX.");
  const [symmetry, setSymmetry] = useState("EX.");
  const [polish, setPolish] = useState("EX.");
  const [fluorescence, setFluorescence] = useState("NON");

  const [diamonds, setDiamonds] = useState([]);
  const [oldDiamonds, setOldDiamonds] = useState([]);

  function handleOpen() {
    setOpen(!open);
    setAdvanced(!advanced);
  }

  

  function calculateChange(oldDiamonds, newDiamonds) {
    const oldPrice = calculateFairPrice(oldDiamonds);
    const newPrice = calculateFairPrice(newDiamonds);

    let change = Math.abs(100 - ((newPrice / oldPrice) * 100));
    change = change.toFixed(2);


    if (oldPrice == 0) change = 0;

    if (newPrice === 0.00 || oldPrice === 0.00) {
      return (
        <Typography variant="h6" fontWeight="bold" sx={{ color: "grey" }}>
          0.0%
        </Typography>
      );
    } else {
      if (newPrice > oldPrice) {
        return (
          <Typography variant="h6" fontWeight="bold" sx={{ color: "green" }}>
            {change}%
          </Typography>
        );
      } else {
        return (
          <Typography variant="h6" fontWeight="bold" sx={{ color: "red" }}>
            {change}%
          </Typography>
        );
      }
    }
  }

  function calculatePricePerCarat(list){
    let price = calculateFairPrice(list);

    return parseFloat(price * 1 / carat).toFixed(2); 
  }

  function calculateFairPrice(list) {
    let res = 0;
    if (list != null && list.length > 0) {
      for (let i = 0; i < list.length; ++i) {
        res += list[i].price;
      }
      res = res / list.length;
    }
    return res.toFixed(2);
  }

  function generateMaxMin(list) {
    if (list != null && list.length > 0) {
      const prices = list.map((d) => d.price);
      const min = Math.min(...prices);
      const max = Math.max(...prices);

      return "$" + min + " - " + "$" + max;
    } else {
      return "--";
    }
  }

  function generateSubInfo() {
    return shape + " " + carat + " Carat " + color + " " + clarity;
  }


  function handleSearch() {
    const data = {
      origin,
      shape,
      carat,
      color,
      clarity,
      cut,
      symmetry,
      polish,
      fluorescence,
    };
    try {
      publicApi
        .get("/diamond/search/" + advanced + "/" + 1 + "?", {
          params: data,
        })
        .then((resp) => {
          setDiamonds(resp.data)
        });


      publicApi
        .get("/diamond/search/" + advanced + "/" + 30 + "?", {
          params: data,
        })
        .then((resp) => setOldDiamonds(resp.data));
    } catch (err) {
      console.log(err);
    }
  }
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Box>
        <Navbar></Navbar>
      </Box>
      <Box marginTop={5} marginBottom={5}>
        <Box padding={4}>
          <Box>
            <Grid container>
              <Grid item md={6} xl={6}>
                <CardHeader
                  title={
                    <Typography
                      variant="h3"
                      sx={{
                        fontSize: {
                          xs: "1.5rem",
                          sm: "1rem",
                          md: "3rem",
                          lg: "3rem",
                          xl: "3rem",
                        },
                      }}
                    >
                      Diamond Price Calculator
                    </Typography>
                  }
                />
                <CardContent>
                  <Box>
                    <Typography fontSize="1em" color="#989898">
                      Use our free diamond price calculator to estimate the
                      current retail price for diamonds.Our price estimates are
                      updated daily based on our massive database of online
                      jeweler inventory sourced from top-rated jewelers.
                    </Typography>
                  </Box>
                  <Box>
                    <Typography>
                      Updated:{" "}
                      <span style={{ color: "#159413" }}>
                        {moment(new Date()).format("dddd MMMM DD, yyyy")}
                      </span>
                    </Typography>
                  </Box>
                </CardContent>
              </Grid>
            </Grid>
          </Box>
          <Box>
            <Box>
              <Grid container spacing={2}>
                <Grid item md={4}>
                  <CardHeader
                    title="Calculator Input"
                    titleTypographyProps={{ variant: "h4" }}
                  />
                  <CardContent>
                    <Card
                      sx={{
                        backgroundColor: "#F9FAFB",
                        borderRadius: "8px",
                      }}
                    >
                      <CardHeader title="Diamond Origin" />
                      <CardContent>
                        <Grid container spacing={2}>
                          <Grid item md={6}>
                            <Button
                              variant={
                                origin === "NATURAL" ? "contained" : "outlined"
                              }
                              onClick={() => setOrigin("NATURAL")}
                              sx={{
                                width: "100%",
                                fontSize: {
                                  xs: "16px",
                                  sm: "18px",
                                  md: "20px",
                                  lg: "12px",
                                  xl: "20px",
                                },
                                ...(origin === "NATURAL"
                                  ? {
                                    color: "white",
                                    backgroundColor: "#69CEE2",
                                    "&:hover": {
                                      backgroundColor: "#69CEE2",
                                    },
                                  }
                                  : {
                                    color: "#69CEE2",
                                    borderColor: "#69CEE2",
                                    backgroundColor: "transparent",
                                    "&:hover": {
                                      backgroundColor: "#f0f0f0",
                                    },
                                  }),
                              }}
                            >
                              Natural
                            </Button>
                          </Grid>
                          <Grid item md={6}>
                            <Button
                              variant={
                                origin === "LAB" ? "contained" : "outlined"
                              }
                              onClick={() => setOrigin("LAB")}
                              sx={{
                                width: "100%",
                                fontSize: {
                                  xs: "16px",
                                  sm: "18px",
                                  md: "20px",
                                  lg: "12px",
                                  xl: "20px",
                                },
                                ...(origin === "LAB"
                                  ? {
                                    color: "white",
                                    backgroundColor: "#69CEE2",
                                    "&:hover": {
                                      backgroundColor: "#69CEE2",
                                    },
                                  }
                                  : {
                                    color: "#69CEE2",
                                    borderColor: "#69CEE2",
                                    backgroundColor: "transparent",
                                    "&:hover": {
                                      backgroundColor: "#f0f0f0",
                                    },
                                  }),
                              }}
                            >
                              Lab
                            </Button>
                          </Grid>
                        </Grid>
                      </CardContent>
                      <CardHeader title="Shape" />
                      <CardContent>
                        <Grid container item lg={12} spacing={2}>
                          {shapeMap.map((c) => (
                            <Grid item lg={2.4} key={c}>
                              <Button
                                variant={shape === c ? "contained" : "outlined"}
                                onClick={() => setShape(c)}
                                sx={{
                                  width: "100%",
                                  fontSize: {
                                    xs: "16px",
                                    sm: "18px",
                                    md: "20px",
                                    lg: "12px",
                                    xl: "15px",
                                  },
                                  ...(shape === c
                                    ? {
                                      color: "white",
                                      backgroundColor: "#69CEE2",
                                      "&:hover": {
                                        backgroundColor: "#69CEE2",
                                      },
                                    }
                                    : {
                                      color: "#69CEE2",
                                      borderColor: "#69CEE2",
                                      backgroundColor: "transparent",
                                      "&:hover": {
                                        backgroundColor: "#f0f0f0",
                                      },
                                    }),
                                }}
                              >
                                {c}
                              </Button>
                            </Grid>
                          ))}
                        </Grid>
                      </CardContent>
                      <CardHeader title="Carat" />
                      <CardContent>
                        <Box>
                          <Box display="flex" justifyContent="center">
                            <Chip
                              label={parseFloat(carat).toFixed(2)}
                              sx={{
                                color: "white",
                                backgroundColor: "#69CEE2",
                              }}
                            ></Chip>
                          </Box>
                          <Slider
                            size="small"
                            defaultValue={0.25}
                            step={0.01}
                            min={0.25}
                            max={5.0}
                            valueLabelDisplay="auto"
                            sx={{
                              color: "#69CEE2",
                            }}
                            onChange={(e) => setCarat(e.target.value)}
                          ></Slider>
                        </Box>
                      </CardContent>
                      <CardHeader title="Color" />
                      <CardContent>
                        <Grid container item lg={12} spacing={2}>
                          {colorMap.map((c) => (
                            <Grid item lg={3} key={c}>
                              <Button
                                variant={color === c ? "contained" : "outlined"}
                                onClick={() => setColor(c)}
                                sx={{
                                  width: "100%",
                                  fontSize: {
                                    xs: "16px",
                                    sm: "18px",
                                    md: "20px",
                                    lg: "12px",
                                    xl: "15px",
                                  },
                                  ...(color === c
                                    ? {
                                      color: "white",
                                      backgroundColor: "#69CEE2",
                                      "&:hover": {
                                        backgroundColor: "#69CEE2",
                                      },
                                    }
                                    : {
                                      color: "#69CEE2",
                                      borderColor: "#69CEE2",
                                      backgroundColor: "transparent",
                                      "&:hover": {
                                        backgroundColor: "#f0f0f0",
                                      },
                                    }),
                                }}
                              >
                                {c}
                              </Button>
                            </Grid>
                          ))}
                        </Grid>
                      </CardContent>
                      <CardHeader title="Clarity" />

                      <CardContent>
                        <Grid container spacing={2}>
                          {clarityMap.map((c) => (
                            <Grid item lg={3} key={c}>
                              <Button
                                variant={
                                  clarity === c ? "contained" : "outlined"
                                }
                                onClick={() => setClarity(c)}
                                sx={{
                                  width: "100%",
                                  fontSize: {
                                    xs: "16px",
                                    sm: "18px",
                                    md: "20px",
                                    lg: "12px",
                                    xl: "15px",
                                  },
                                  ...(clarity === c
                                    ? {
                                      color: "white",
                                      backgroundColor: "#69CEE2",
                                      "&:hover": {
                                        backgroundColor: "#69CEE2",
                                      },
                                    }
                                    : {
                                      color: "#69CEE2",
                                      borderColor: "#69CEE2",
                                      backgroundColor: "transparent",
                                      "&:hover": {
                                        backgroundColor: "#f0f0f0",
                                      },
                                    }),
                                }}
                              >
                                {c}
                              </Button>
                            </Grid>
                          ))}
                        </Grid>
                      </CardContent>
                      {!open ? (
                        <Box marginTop={2}>
                          <CardContent>
                            <Box display="flex" justifyContent="center">
                              <Button
                                variant="contained"
                                onClick={handleSearch}
                                sx={{
                                  width: "30%",
                                  fontSize: {
                                    xs: "16px",
                                    sm: "18px",
                                    md: "20px",
                                    lg: "12px",
                                    xl: "15px",
                                  },
                                  color: "white",
                                  backgroundColor: "#69CEE2",
                                }}
                              >
                                Submit
                              </Button>
                            </Box>
                          </CardContent>

                          <Box
                            display="flex"
                            sx={{ justifyContent: "space-between" }}
                          >
                            <CardHeader title="More Input" />
                            <CardHeader
                              action={
                                <IconButton onClick={handleOpen}>
                                  <ArrowDropDownIcon />
                                </IconButton>
                              }
                            />
                          </Box>
                        </Box>
                      ) : (
                        <Box>
                          <CardHeader title="Cut" />
                          <CardContent>
                            <Grid container spacing={1}>
                              {cutMap.map((c) => (
                                <Grid item lg={3} key={c}>
                                  <Button
                                    variant={
                                      cut === c ? "contained" : "outlined"
                                    }
                                    onClick={() => setCut(c)}
                                    sx={{
                                      width: "100%",
                                      fontSize: {
                                        xs: "16px",
                                        sm: "18px",
                                        md: "20px",
                                        lg: "12px",
                                        xl: "15px",
                                      },
                                      ...(cut === c
                                        ? {
                                          color: "white",
                                          backgroundColor: "#69CEE2",
                                          "&:hover": {
                                            backgroundColor: "#69CEE2",
                                          },
                                        }
                                        : {
                                          color: "#69CEE2",
                                          borderColor: "#69CEE2",
                                          backgroundColor: "transparent",
                                          "&:hover": {
                                            backgroundColor: "#f0f0f0",
                                          },
                                        }),
                                    }}
                                  >
                                    {c}
                                  </Button>
                                </Grid>
                              ))}
                            </Grid>
                          </CardContent>
                          <CardHeader title="Symmetry" />
                          <CardContent>
                            <Grid container spacing={1}>
                              {symmetryMap.map((s) => (
                                <Grid item lg={3} key={s}>
                                  <Button
                                    variant={
                                      symmetry === s ? "contained" : "outlined"
                                    }
                                    onClick={() => setSymmetry(s)}
                                    sx={{
                                      width: "100%",
                                      fontSize: {
                                        xs: "16px",
                                        sm: "18px",
                                        md: "20px",
                                        lg: "12px",
                                        xl: "15px",
                                      },
                                      ...(symmetry === s
                                        ? {
                                          color: "white",
                                          backgroundColor: "#69CEE2",
                                          "&:hover": {
                                            backgroundColor: "#69CEE2",
                                          },
                                        }
                                        : {
                                          color: "#69CEE2",
                                          borderColor: "#69CEE2",
                                          backgroundColor: "transparent",
                                          "&:hover": {
                                            backgroundColor: "#f0f0f0",
                                          },
                                        }),
                                    }}
                                  >
                                    {s}
                                  </Button>
                                </Grid>
                              ))}
                            </Grid>
                          </CardContent>
                          <CardHeader title="Polish" />
                          <CardContent>
                            <Grid container spacing={1}>
                              {polishMap.map((p) => (
                                <Grid item lg={3} key={p}>
                                  <Button
                                    variant={
                                      polish === p ? "contained" : "outlined"
                                    }
                                    onClick={() => setPolish(p)}
                                    sx={{
                                      width: "100%",
                                      fontSize: {
                                        xs: "16px",
                                        sm: "18px",
                                        md: "20px",
                                        lg: "12px",
                                        xl: "15px",
                                      },
                                      ...(polish === p
                                        ? {
                                          color: "white",
                                          backgroundColor: "#69CEE2",
                                          "&:hover": {
                                            backgroundColor: "#69CEE2",
                                          },
                                        }
                                        : {
                                          color: "#69CEE2",
                                          borderColor: "#69CEE2",
                                          backgroundColor: "transparent",
                                          "&:hover": {
                                            backgroundColor: "#f0f0f0",
                                          },
                                        }),
                                    }}
                                  >
                                    {p}
                                  </Button>
                                </Grid>
                              ))}
                            </Grid>
                          </CardContent>
                          <CardHeader title="Fluorescence" />
                          <CardContent>
                            <Grid container spacing={1}>
                              {fluorescenceMap.map((f) => (
                                <Grid item lg={2.4} key={f}>
                                  <Button
                                    variant={
                                      fluorescence === f
                                        ? "contained"
                                        : "outlined"
                                    }
                                    sx={{
                                      width: "100%",
                                      fontSize: {
                                        xs: "16px",
                                        sm: "18px",
                                        md: "20px",
                                        lg: "12px",
                                        xl: "15px",
                                      },
                                      ...(fluorescence === f
                                        ? {
                                          color: "white",
                                          backgroundColor: "#69CEE2",
                                          "&:hover": {
                                            backgroundColor: "#69CEE2",
                                          },
                                        }
                                        : {
                                          color: "#69CEE2",
                                          borderColor: "#69CEE2",
                                          backgroundColor: "transparent",
                                          "&:hover": {
                                            backgroundColor: "#f0f0f0",
                                          },
                                        }),
                                    }}
                                    onClick={() => setFluorescence(f)}
                                  >
                                    {f}
                                  </Button>
                                </Grid>
                              ))}
                            </Grid>
                          </CardContent>

                          <CardContent>
                            <Box display="flex" justifyContent="center">
                              <Button
                                variant="contained"
                                onClick={handleSearch}
                                sx={{
                                  width: "30%",
                                  fontSize: {
                                    xs: "16px",
                                    sm: "18px",
                                    md: "20px",
                                    lg: "12px",
                                    xl: "15px",
                                  },
                                  color: "white",
                                  backgroundColor: "#69CEE2",
                                }}
                              >
                                Submit
                              </Button>
                            </Box>
                          </CardContent>
                          <Box
                            display="flex"
                            sx={{ justifyContent: "space-between" }}
                          >
                            <CardHeader title="Fewer Input" />
                            <CardHeader
                              action={
                                <IconButton onClick={handleOpen}>
                                  <ArrowDropUpIcon />
                                </IconButton>
                              }
                            />
                          </Box>
                        </Box>
                      )}
                    </Card>
                  </CardContent>
                </Grid>
                <Grid item lg={8}>
                  <CardHeader
                    title="Calculator Output"
                    titleTypographyProps={{ variant: "h4" }}
                  />
                  <CardContent>
                    <Card
                      sx={{
                        backgroundColor: "#F9FAFB",
                        borderRadius: "8px",
                      }}
                    >
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        flexDirection="column"
                      >
                        <CardHeader
                          title="Fair Price Estimate"
                          titleTypographyProps={{
                            variant: "h5",
                            color: "#ACACAC",
                          }}
                        />
                        <CardContent
                          sx={{
                            alignItems: "center",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                          }}
                        >
                          <Box paddingBottom={2}>
                            <Typography variant="h3" fontWeight="bold">
                              ${calculateFairPrice(diamonds)}
                            </Typography>
                          </Box>
                          <Box padding={1}>
                            <Typography color="#ACACAC" variant="h7">
                              {generateSubInfo()}
                            </Typography>
                          </Box>
                          <Box padding={1}>
                            <Chip
                              label={
                                diamonds != null && diamonds.length > 0
                                  ? origin + " DIAMOND"
                                  : "--"
                              }
                              color="success"
                              size="small"
                            ></Chip>
                          </Box>
                        </CardContent>

                        <Box width="100%" marginTop={2}>
                          <Grid container>
                            <Grid item lg={4} xl={4}>
                              <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                sx={{
                                  flexDirection: "column",
                                  borderRight: 3,
                                  borderColor: "#e6e3e3",
                                  backgroundColor: "#ACACAC33",
                                  padding: 2,
                                }}
                              >
                                <Typography>Estimate Range</Typography>
                                <Box>
                                  <Typography variant="h6" fontWeight="bold">
                                    {generateMaxMin(diamonds)}
                                  </Typography>
                                </Box>
                              </Box>
                            </Grid>
                            <Grid item lg={4} xl={4}>
                              <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                sx={{
                                  flexDirection: "column",
                                  borderRight: 3,
                                  borderColor: "#e6e3e3",
                                  backgroundColor: "#ACACAC33",
                                  padding: 2,
                                }}
                              >
                                <Typography>Last 30 Days Change</Typography>
                                <Box>
                                  {calculateChange(oldDiamonds, diamonds)}
                                </Box>
                              </Box>
                            </Grid>
                            <Grid item lg={4} xl={4}>
                              <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                sx={{
                                  flexDirection: "column",
                                  backgroundColor: "#ACACAC33",
                                  padding: 2,
                                }}
                              >
                                <Typography>
                                  Estimate Price per Carat
                                </Typography>
                                <Box>
                                  <Typography variant="h6" fontWeight="bold">
                                    ${calculatePricePerCarat(diamonds)}
                                  </Typography>
                                </Box>
                              </Box>
                            </Grid>
                          </Grid>
                        </Box>
                      </Box>
                    </Card>
                  </CardContent>
                  <CardContent>
                    <Table
                      sx={{
                        backgroundColor: "#F9FAFB",
                        borderRadius: "8px",
                      }}
                    >
                      <TableBody>
                        {(rowsPerPage > 0 ? diamonds.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : diamonds).map((d) => (
                          <List disablePadding>
                            <Box borderBottom={1} borderColor="#c7ced9" key={d.source}>
                              <ListItem disablePadding>
                                <ListItemButton href={d.source} target="_blank">
                                  <Grid
                                    container
                                    direction="row"
                                    spacing={2}
                                    sx={{
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}
                                  >
                                    <Grid
                                      item
                                      lg={2}
                                      container
                                      direction="column"
                                      justifyContent="center"
                                      alignItems="center"
                                    >
                                      <img
                                        src={d.image}
                                        alt=""
                                        width="110px"
                                        height="110px"
                                      />
                                    </Grid>
                                    <Grid item lg={2}>
                                      <ListItemText
                                        primary={d.shape}
                                        sx={{
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItems: "center",
                                        }}
                                      ></ListItemText>
                                      <Typography
                                        sx={{
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItems: "center",
                                          color: "#989898",
                                        }}
                                      >
                                        Shape
                                      </Typography>
                                    </Grid>
                                    <Grid item lg={2}>
                                      <ListItemText
                                        primary={d.caratWeight}
                                        sx={{
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItems: "center",
                                        }}
                                      ></ListItemText>
                                      <Typography
                                        sx={{
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItems: "center",
                                          color: "#989898",
                                        }}
                                      >
                                        Carat
                                      </Typography>
                                    </Grid>
                                    <Grid item lg={2}>
                                      <ListItemText
                                        primary={d.color}
                                        sx={{
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItems: "center",
                                        }}
                                      ></ListItemText>
                                      <Typography
                                        sx={{
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItems: "center",
                                          color: "#989898",
                                        }}
                                      >
                                        Color
                                      </Typography>
                                    </Grid>
                                    <Grid item lg={2}>
                                      <ListItemText
                                        primary={d.clarity}
                                        sx={{
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItems: "center",
                                        }}
                                      ></ListItemText>
                                      <Typography
                                        sx={{
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItems: "center",
                                          color: "#989898",
                                        }}
                                      >
                                        Clarity
                                      </Typography>
                                    </Grid>
                                    <Grid item lg={2}>
                                      <ListItemText
                                        primary={"$" + d.price}
                                        sx={{
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItems: "center",
                                        }}
                                      ></ListItemText>
                                    </Grid>
                                  </Grid>
                                </ListItemButton>
                              </ListItem>
                            </Box>
                          </List>
                        ))}
                      </TableBody>
                      {diamonds && diamonds.length > 0 && (
                      <TableFooter>
                        <TableRow>
                          <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            colSpan={5}
                            count={diamonds.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            slotProps={{
                              select: {
                                inputProps: {
                                  'aria-label': 'rows per page',
                                },
                                native: true,
                              },
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                          />
                        </TableRow>
                      </TableFooter>
                      )}
                    </Table>
                  </CardContent>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box>
        <Footer></Footer>
      </Box>
    </Box>
  );
};

export default Calculate;
