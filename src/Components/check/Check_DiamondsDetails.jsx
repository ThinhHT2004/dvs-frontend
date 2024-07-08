import React from 'react'
import exPic from "../../assets/examplediamondpic.png";
import Diamond_Proportions from "../../assets/Diamond_Proportions.png";
import errorImage from "../../assets/empty_image.jpg";
import { useLocation } from 'react-router-dom';
import { Box, Button, Card, CardContent, CardHeader, Grid, Typography, Chip } from '@mui/material';
import Navbar from '../Navbar/Navbar';
import Footer from '../footer/Footer';
import moment from 'moment';
const Check_DiamondsDetails = () => {
    const location = useLocation();
    const diamondDetails = location.state?.diamondDetails;
    return (
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Box >
                <Navbar />
            </Box>
            <Box
                marginTop={5}
                marginBottom={5}
            >
                <Box>
                    <Grid container spacing={2}>
                        <Grid
                            item
                            xl={6}
                            sm={12}
                            md={6}
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <img
                                // src={diamondDetails?.image || errorImage}
                                src={exPic}
                                alt=""
                                style={{ width: "450px", height: "450px", margin: 5 }}
                            />
                        </Grid>
                        <Grid item xl={6} sm={12} md={6}>
                            <Card
                                variant="outlined"
                                sx={{
                                    borderRadius: 0,
                                    border: 0,
                                    margin: 5,
                                    backgroundColor: "#F9FAFB",
                                }}
                            >
                                <CardHeader
                                    title={
                                        <Typography variant="h3">
                                            {`Certificate ID: ${diamondDetails?.labId}`} <Chip label={diamondDetails?.origin + " DIAMOND"} color="success" />
                                        </Typography>
                                    }
                                />
                                <CardContent>
                                    <Card sx={{ margin: 2 }}>
                                        <CardContent>
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
                                                <Grid item xl={4} md={4} sm={4} lg={4} xs={4}>
                                                    <Typography
                                                        sx={{
                                                            display: "flex",
                                                            justifyContent: "center",
                                                            alignItems: "center",
                                                            color: "#989898",
                                                        }}
                                                    >
                                                        Fair Price
                                                    </Typography>
                                                    <Typography
                                                        sx={{
                                                            display: "flex",
                                                            justifyContent: "center",
                                                            alignItems: "center",
                                                        }}
                                                    >
                                                        {diamondDetails?.finalPrice}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xl={4} md={4} sm={4} lg={4} xs={4}>
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
                                                    <Typography
                                                        sx={{
                                                            display: "flex",
                                                            justifyContent: "center",
                                                            alignItems: "center",
                                                        }}
                                                    >
                                                        {diamondDetails?.caratWeight}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xl={4} md={4} sm={4} lg={4} xs={4}>
                                                    <Typography
                                                        sx={{
                                                            display: "flex",
                                                            justifyContent: "center",
                                                            alignItems: "center",
                                                            color: "#989898",
                                                        }}
                                                    >
                                                        Cut Grade
                                                    </Typography>
                                                    <Typography
                                                        sx={{
                                                            display: "flex",
                                                            justifyContent: "center",
                                                            alignItems: "center",
                                                        }}
                                                    >
                                                        {diamondDetails?.cut}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                    <Card sx={{ margin: 2 }}>
                                        <CardContent>
                                            <Grid container spacing={2}>
                                                <Grid
                                                    item
                                                    xl={12}
                                                    container
                                                    direction="row"
                                                    spacing={2}
                                                    sx={{
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <Grid item xl={4} md={4} sm={4} lg={4} xs={4}>
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
                                                        <Typography
                                                            sx={{
                                                                display: "flex",
                                                                justifyContent: "center",
                                                                alignItems: "center",
                                                            }}
                                                        >
                                                            {diamondDetails?.shape}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xl={4} md={4} sm={4} lg={4} xs={4}>
                                                        <Typography
                                                            sx={{
                                                                display: "flex",
                                                                justifyContent: "center",
                                                                alignItems: "center",
                                                                color: "#989898",
                                                            }}
                                                        >
                                                            Measurements
                                                        </Typography>
                                                        <Typography
                                                            sx={{
                                                                display: "flex",
                                                                justifyContent: "center",
                                                                alignItems: "center",
                                                            }}
                                                        >
                                                            {diamondDetails?.measurement}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xl={4} md={4} sm={4} lg={4} xs={4}>
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
                                                        <Typography
                                                            sx={{
                                                                display: "flex",
                                                                justifyContent: "center",
                                                                alignItems: "center",
                                                            }}
                                                        >
                                                            {diamondDetails?.color}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                <Grid
                                                    item
                                                    xl={12}
                                                    container
                                                    direction="row"
                                                    spacing={2}
                                                    sx={{
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <Grid item xl={4} md={4} sm={4} lg={4} xs={4}>
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
                                                        <Typography
                                                            sx={{
                                                                display: "flex",
                                                                justifyContent: "center",
                                                                alignItems: "center",
                                                            }}
                                                        >
                                                            {diamondDetails?.clarity}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xl={4} md={4} sm={4} lg={4} xs={4}>
                                                        <Typography
                                                            sx={{
                                                                display: "flex",
                                                                justifyContent: "center",
                                                                alignItems: "center",
                                                                color: "#989898",
                                                            }}
                                                        >
                                                            Polish
                                                        </Typography>
                                                        <Typography
                                                            sx={{
                                                                display: "flex",
                                                                justifyContent: "center",
                                                                alignItems: "center",
                                                            }}
                                                        >
                                                            {diamondDetails?.polish}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xl={4} md={4} sm={4} lg={4} xs={4}>
                                                        <Typography
                                                            sx={{
                                                                display: "flex",
                                                                justifyContent: "center",
                                                                alignItems: "center",
                                                                color: "#989898",
                                                            }}
                                                        >
                                                            Fluorescence
                                                        </Typography>
                                                        <Typography
                                                            sx={{
                                                                display: "flex",
                                                                justifyContent: "center",
                                                                alignItems: "center",
                                                            }}
                                                        >
                                                            {diamondDetails?.fluorescence}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            margin: 2,
                                        }}
                                    >
                                        <Button
                                            variant="contained"
                                            href="/certificate-check"
                                            sx={{
                                                backgroundColor: "#69CEE2",
                                                borderRadius: "8px",
                                                textTransform: "none",
                                                fontSize: "20px",
                                            }}
                                        >
                                            Run another check
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                    <Box
                        sx={{ justifyContent: "center", alignItems: "center", padding: 5 }}
                    >
                        <Typography
                            variant="h4"
                            sx={{ textAlign: "center", marginBottom: 5 }}
                        >
                            Diamond Details
                        </Typography>
                        <Box>
                            <Grid container spacing={2}>
                                <Grid item xl={6} md={6}>
                                    <Card sx={{ height: "100%" }}>
                                        <CardHeader
                                            title="CERTIFICATE DETAILS"
                                            titleTypographyProps={{ variant: "h6" }}
                                            sx={{ backgroundColor: "#274472", color: "#fff" }}
                                        />
                                        <CardContent>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    padding: 1,
                                                }}
                                            >
                                                <Typography sx={{ color: "#989898" }}>
                                                    Certificate Date
                                                </Typography>
                                                <Typography>{moment(diamondDetails?.createdDate).format("yyyy-MM-dd")}</Typography>
                                            </Box>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    padding: 1,
                                                }}
                                            >
                                                <Typography sx={{ color: "#989898" }}>
                                                    Certificate Number
                                                </Typography>
                                                <Typography>{diamondDetails?.labId}</Typography>
                                            </Box>

                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    padding: 1,
                                                }}
                                            >
                                                <Typography sx={{ color: "#989898" }}>Origin</Typography>
                                                <Typography>{diamondDetails?.origin}</Typography>
                                            </Box>

                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    padding: 1,
                                                }}
                                            >
                                                <Typography sx={{ color: "#989898" }}>Shape</Typography>
                                                <Typography>{diamondDetails?.shape}</Typography>
                                            </Box>

                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    padding: 1,
                                                }}
                                            >
                                                <Typography sx={{ color: "#989898" }}>
                                                    Measurements
                                                </Typography>
                                                <Typography>{diamondDetails?.measurement} mm</Typography>
                                            </Box>
                                        </CardContent>
                                        <CardHeader
                                            title="CRADING RESULTS"
                                            titleTypographyProps={{ variant: "h6" }}
                                            sx={{ backgroundColor: "#274472", color: "#fff" }}
                                        />
                                        <CardContent>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    padding: 1,
                                                }}
                                            >
                                                <Typography sx={{ color: "#989898" }}>
                                                    Carat Weight
                                                </Typography>
                                                <Typography>{diamondDetails?.caratWeight}</Typography>
                                            </Box>

                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    padding: 1,
                                                }}
                                            >
                                                <Typography sx={{ color: "#989898" }}>
                                                    Color Grade
                                                </Typography>
                                                <Typography>{diamondDetails?.color}</Typography>
                                            </Box>

                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    padding: 1,
                                                }}
                                            >
                                                <Typography sx={{ color: "#989898" }}>
                                                    Clarity Grade
                                                </Typography>
                                                <Typography>{diamondDetails?.clarity}</Typography>
                                            </Box>
                                        </CardContent>

                                        <CardHeader
                                            title="ADDITIONAL GRADING INFORMATION"
                                            titleTypographyProps={{ variant: "h6" }}
                                            sx={{ backgroundColor: "#274472", color: "#fff" }}
                                        />
                                        <CardContent>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    padding: 1,
                                                }}
                                            >
                                                <Typography sx={{ color: "#989898" }}>Polish</Typography>
                                                <Typography>{diamondDetails?.polish}</Typography>
                                            </Box>

                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    padding: 1,
                                                }}
                                            >
                                                <Typography sx={{ color: "#989898" }}>
                                                    Symmetry
                                                </Typography>
                                                <Typography>{diamondDetails?.symmetry}</Typography>
                                            </Box>

                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    padding: 1,
                                                }}
                                            >
                                                <Typography sx={{ color: "#989898" }}>
                                                    Fluorescence
                                                </Typography>
                                                <Typography>{diamondDetails?.fluorescence}</Typography>
                                            </Box>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    padding: 1,
                                                }}
                                            >
                                                <Typography sx={{ color: "#989898" }}>
                                                    Cut Grade
                                                </Typography>
                                                <Typography>{diamondDetails?.cut}</Typography>
                                            </Box>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    padding: 1,
                                                }}
                                            >
                                                <Typography sx={{ color: "#989898" }}>
                                                    Comments
                                                </Typography>
                                                <Typography>{diamondDetails?.note}</Typography>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xl={6} md={6}>
                                    <Card sx={{ height: "100%" }}>
                                        <CardHeader
                                            title="PROPORTIONS"
                                            titleTypographyProps={{ variant: "h6" }}
                                            sx={{ backgroundColor: "#274472", color: "#fff" }}
                                        />
                                        <CardContent>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <img
                                                    src={diamondDetails?.proportion}
                                                    alt=""
                                                    style={{ width: "450px", height: "300px" }}
                                                />
                                            </Box>
                                            <Grid container spacing={2} padding={1}>
                                                <Grid item xl={3}>
                                                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                                                        <Typography>
                                                            <span style={{ color: "#989898" }} >Table:</span> {diamondDetails?.table}
                                                        </Typography>
                                                    </Box>
                                                </Grid>
                                                <Grid item xl={3}>
                                                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                                                        <Typography>
                                                            <span style={{ color: "#989898" }} >Girdle:</span> {diamondDetails?.girdle}
                                                        </Typography>
                                                    </Box>
                                                </Grid>
                                                <Grid item xl={3}>
                                                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                                                        <Typography>
                                                            <span style={{ color: "#989898" }} >Depth:</span> {diamondDetails?.depth}
                                                        </Typography>
                                                    </Box>
                                                </Grid>
                                                <Grid item xl={3}>
                                                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                                                        <Typography>
                                                            <span style={{ color: "#989898" }} >Culet:</span> {diamondDetails?.culet}
                                                        </Typography>
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                        <CardHeader
                                            title="CLARITY CHARACTERISTICS"
                                            titleTypographyProps={{ variant: "h6" }}
                                            sx={{ backgroundColor: "#274472", color: "#fff" }}
                                        />
                                        <CardContent>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <img
                                                    src={diamondDetails.characteristic}
                                                    alt=""
                                                    style={{ width: "450px", height: "270px" }}
                                                />
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box>
                <Footer />
            </Box>
        </Box>
    );

}

export default Check_DiamondsDetails