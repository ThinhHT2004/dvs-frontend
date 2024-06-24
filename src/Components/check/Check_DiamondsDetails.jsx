import React from 'react'
import exPic from "../../assets/examplediamondpic.png";
import Diamond_Proportions from "../../assets/Diamond_Proportions.png";
import exCla from "../../assets/exCla.jpg";
import { useLocation } from 'react-router-dom';
import { Box, Button, Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import Navbar from '../Navbar/Navbar';
import Footer from '../footer/Footer';
const Check_DiamondsDetails = () => {
    const location = useLocation();
    const diamondDetails = location.state?.diamondDetails;
    return (
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Box sx={{ zIndex: 2 }}>
                <Navbar />
            </Box>
            <Box sx={{ flexGrow: 1, zIndex: 1 }}>
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
                                src={exPic}
                                alt="example diamond"
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
                                            {`Certificate ID: ${diamondDetails?.reportNumber}`}
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
                                                <Grid item xl={3} md={3} sm={3} lg={3} xs={3}>
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
                                                        {diamondDetails?.fairPrice}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xl={3} md={3} sm={3} lg={3} xs={3}>
                                                    <Typography
                                                        sx={{
                                                            display: "flex",
                                                            justifyContent: "center",
                                                            alignItems: "center",
                                                            color: "#989898",
                                                        }}
                                                    >
                                                        Origin
                                                    </Typography>
                                                    <Typography
                                                        sx={{
                                                            display: "flex",
                                                            justifyContent: "center",
                                                            alignItems: "center",
                                                        }}
                                                    >
                                                        {diamondDetails?.origin}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xl={3} md={3} sm={3} lg={3} xs={3}>
                                                    <Typography
                                                        sx={{
                                                            display: "flex",
                                                            justifyContent: "center",
                                                            alignItems: "center",
                                                            color: "#989898",
                                                        }}
                                                    >
                                                        Cert Lab
                                                    </Typography>
                                                    <Typography
                                                        sx={{
                                                            display: "flex",
                                                            justifyContent: "center",
                                                            alignItems: "center",
                                                        }}
                                                    >
                                                        {diamondDetails?.CertificateLab}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xl={3} md={3} sm={3} lg={3} xs={3}>
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
                                                        {diamondDetails?.cutGrade}
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
                                                    <Grid item xl={3} md={3} sm={3} lg={3} xs={3}>
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
                                                    <Grid item xl={3} md={3} sm={3} lg={3} xs={3}>
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
                                                            {diamondDetails?.measurements}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xl={3} md={3} sm={3} lg={3} xs={3}>
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
                                                    <Grid item xl={3} md={3} sm={3} lg={3} xs={3}>
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
                                                            {diamondDetails?.colorGrade}
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
                                                    <Grid item xl={3} md={3} sm={3} lg={3} xs={3}>
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
                                                            {diamondDetails?.clarityGrade}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xl={3} md={3} sm={3} lg={3} xs={3}>
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
                                                    <Grid item xl={3} md={3} sm={3} lg={3} xs={3}>
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
                                                    <Grid item xl={3} md={3} sm={3} lg={3} xs={3}>
                                                        <Typography
                                                            sx={{
                                                                display: "flex",
                                                                justifyContent: "center",
                                                                alignItems: "center",
                                                                color: "#989898",
                                                            }}
                                                        >
                                                            Symmetry
                                                        </Typography>
                                                        <Typography
                                                            sx={{
                                                                display: "flex",
                                                                justifyContent: "center",
                                                                alignItems: "center",
                                                            }}
                                                        >
                                                            {diamondDetails?.symmetry}
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
                                            href="/diamond-check"
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
                                                <Typography>{diamondDetails?.certificateDate}</Typography>
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
                                                <Typography>{diamondDetails?.reportNumber}</Typography>
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
                                                <Typography>{diamondDetails?.measurements} mm</Typography>
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
                                                <Typography>{diamondDetails?.colorGrade}</Typography>
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
                                                <Typography>{diamondDetails?.clarityGrade}</Typography>
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
                                                <Typography>{diamondDetails?.cutGrade}</Typography>
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
                                                <Typography>{diamondDetails?.comments}</Typography>
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
                                                    src={Diamond_Proportions}
                                                    alt=""
                                                    style={{ width: "450px", height: "300px" }}
                                                />
                                            </Box>
                                            <Grid container spacing={2} padding={1}>
                                                <Grid item xl={3}>
                                                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                                                        <Typography sx={{ color: "#989898" }}>
                                                            Table:
                                                        </Typography>
                                                        <Typography>{diamondDetails?.table}</Typography>
                                                    </Box>
                                                </Grid>
                                                <Grid item xl={3}>
                                                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                                                        <Typography sx={{ color: "#989898" }}>
                                                            Girdle:
                                                        </Typography>
                                                        <Typography>{diamondDetails?.girdle}</Typography>
                                                    </Box>
                                                </Grid>
                                                <Grid item xl={3}>
                                                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                                                        <Typography sx={{ color: "#989898" }}>
                                                            Depth:
                                                        </Typography>
                                                        <Typography>{diamondDetails?.depth}</Typography>
                                                    </Box>
                                                </Grid>
                                                <Grid item xl={3}>
                                                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                                                        <Typography sx={{ color: "#989898" }}>
                                                            Culet:
                                                        </Typography>
                                                        <Typography>{diamondDetails?.culet}</Typography>
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
                                                    src={exCla}
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