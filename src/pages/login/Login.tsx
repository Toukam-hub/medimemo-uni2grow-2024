import { useState, type FC } from 'react';
import "./Login.css"
import oh from "../../assets/icons/Group.png"
import medimemo from "../../assets/icons/MEDIMEMO.png"
import { Typography, TextField, Link, Button, Alert, AlertTitle,CircularProgress } from '@mui/material';
import { validateForm, validateField } from '../../utils/validateShema';
import { useNavigate } from 'react-router-dom';

interface LoginProps {}

const Login: FC<LoginProps> = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const [identifiers, setIdentifiers] = useState({
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState({
        email: "",
        password: ""
    });

    const handleInputs = (e) => {
        const FieldName = e.target.name;
        const FieldValue = e.target.value;

        const err = validateField(FieldName, FieldValue);
       
        if (!err) {
            setErrors(prevState => {
                const newState = { ...prevState };
                delete newState[FieldName];
                return newState;
            });
             setLoginError(false);
        } else {
            setErrors(prevState => ({ ...prevState, [FieldName]: err }));
        }

        setIdentifiers(prevState => ({ ...prevState, [FieldName]: FieldValue }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm(identifiers);
        
        if (Object.keys(errors).length === 0) {
             setLoading(true);
            try {
                const result = await fetch("http://localhost:3000/users");
                const data = await result.json();
                
                const isThere = data.some(item => 
                    identifiers.email === item.name && identifiers.password === item.password
                );

                if (isThere) {
                    // Redirection ou succès de la connexion
                    console.log("Connexion réussie !");
                    setLoginError(false);
                   // navigate('/home'); // Remplacez par votre route cible
                } else {
                    setLoginError(true);
                }
            } catch (error) {
                console.error(error);
                setLoginError(true); // En cas d'erreur de connexion
            }finally {
                setLoading(false); // Arrêtez le chargement dans tous les cas
            }
        } else {
            setErrors(errors);
            setLoginError(false);
        }
    };

    return (
        <div className="login">
            <div className="logoLogin">
                <img src={oh} width={100} />
                <img src={medimemo} width={200} />
            </div>
            <div className="formLogin">
                <Typography fontSize={40} marginLeft={10} marginBottom={5}>Let'&nbsp;s Sign You in!</Typography>

                {loginError && (
                    <Alert severity="error">
                        <AlertTitle>Connection failure</AlertTitle>
                        Identifiants incorrects.
                    </Alert>
                )}

                <form onSubmit={handleSubmit} style={{marginTop:"20px"}}>
                    <TextField
                        fullWidth
                        label="Email or username"
                        name='email'
                        onChange={handleInputs}
                        value={identifiers.email}
                        error={!!errors.email}
                        helperText={errors.email}
                    />

                    <TextField 
                        type='password'
                        error={!!errors.password}
                        helperText={errors.password}
                        margin="normal"
                        label="Password"
                        fullWidth
                        name='password'
                        value={identifiers.password}
                        onChange={handleInputs}
                    />
                    
                    <Typography marginLeft={39} marginBottom={5} marginTop={2}>
                        <Link>Forgot password?</Link>
                    </Typography>
                    
                    <Button
                        style={{ backgroundColor: 'red' }}
                        variant="contained"
                        fullWidth
                        type='submit'
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <CircularProgress size={24} style={{ marginRight: 8 }} />
                                Loading...
                            </>
                        ) : (
                            'LOGIN'
                        )}
                    </Button>
                </form>
                <Typography marginLeft={10} marginTop={5}>
                    Don't have an account? <Link sx={{ color: 'red' }}>Sign up!</Link>
                </Typography>
            </div>
        </div>
    );
}

export default Login;
