import React, { useState } from "react";
import {
    Box,
    TextField,
    Button,
    Typography,
    Container,
    InputAdornment,
    IconButton,
} from "@mui/material";
import Codth from "../../pic/codth-logo.png";
import  Base from "../../pic/Base.png";


import { Visibility, VisibilityOff, Lock } from "@mui/icons-material";
import PersonIcon from '@mui/icons-material/Person';
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import loginService  from "services/loginService";


const validationSchema = yup.object({
    username: yup.string().required("username is required"),
    password: yup.string().required("Password is required"),
});

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleClickShowPassword = () => setShowPassword(!showPassword);

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await loginService(values);
                if (response.status === 200) {
                    navigate("/");
                }
            } catch (error) {
                console.error("Login failed", error);
            }
        },
    });

    return (
        <Container
            maxWidth={false}
            disableGutters
            sx={{
                width: "100vw",
                height: "100vh",
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundImage: `url(${Base})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <Box
                sx={{
                    width: "450px",
                    top: "50%",
                    left: "50%",
                    border: "1px",
                    background: "#F5F5F5",
                    position: "absolute",
                    transform: "translate(-50%, -50%)",
                    p: "120px",
                    textAlign: "center",
                }}
            >
                <Box>
                    <img src={Codth} alt="Company Logo" style={{ width: "178px", height: "auto", margin: "0 auto" }} />
                </Box>

                <Typography
                    variant="h5"
                    sx={{
                        fontFamily: "Calibri, sans-serif", 
                        fontWeight: 700, 
                        fontSize: "32px", 
                        color: "#101012", 
                        textAlign: "center", 
                    }}
                >
                    Login to your account
                </Typography>

                <form onSubmit={formik.handleSubmit}>
                    <TextField 
                        sx={{ top: "40px", border: "1px solid #E6E6E6" }}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        placeholder="username"
                        name="username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.username && Boolean(formik.errors.username)}
                        helperText={formik.touched.username && formik.errors.username}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PersonIcon sx={{ color: "#BEBEBF" }} />
                                </InputAdornment>
                            ),
                        }}
                    />

                    <TextField 
                        sx={{ top: "30px", border: "1px solid #E6E6E6" }}
                        fullWidth
                        margin="normal"
                        placeholder="Password"
                        variant="outlined"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Lock sx={{ color: "#BEBEBF" }} />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton sx={{ color: "#BEBEBF" }} onClick={handleClickShowPassword} edge="end">
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <Button
                        fullWidth
                        variant="contained"
                        sx={{
                            mt: 2,
                            color: "#FFFFFF;",
                            top: "20px",
                            padding: "10px",
                            fontWeight: "700",
                            fontSize: "14px"
                        }}
                        type="submit"
                    >
                        Login now
                    </Button>
                </form>

                <Typography sx={{ mt: 4, cursor: "pointer", color: "#1B84FF", alignItems: "end", display: "flex", justifyContent: "end" }} variant="body2">
                    Forget Password?
                </Typography>
            </Box>
        </Container>
    );
};

export default LoginPage;
