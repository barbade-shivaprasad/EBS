import {useState, useEffect} from 'react'
import {useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import {autoPlay} from 'react-swipeable-views-utils';
import './slides.css';
import {Link} from 'react-router-dom'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);



const Slides = ({postsOngoing, postsUpcoming}) => {
    const [posts, setPosts] = useState([]);
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    let maxSteps = 2;
    if (posts != undefined)
        maxSteps = posts.length;
    else
        maxSteps = 0;


    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step) => {
        setActiveStep(step);
    };
    useEffect(() => {
        let temp = postsOngoing;
        temp = temp.concat(postsUpcoming)
        setPosts(temp)
    }, [])

    return (
        // <div>hellow</div>
        <div className="carousel-container" style={{backgroundColor:"transparent"}}>
            <div className="carousel">
                <Box sx={{}} className='text-center'>
                    <Paper
                        square
                        elevation={0}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            height: 40,
                            pl: 2,
                            bgcolor: "aquamarine",
                        }}
                    >

                    </Paper>
                    <AutoPlaySwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={activeStep}
                        onChangeIndex={handleStepChange}
                        enableMouseEvents
                    >
                        {posts?.map((step, index) => (
                            <div key={step.title}>
                                {Math.abs(activeStep - index) <= 2 ? (
                                    <>
                                        <div className="typograph">{step.title}</div>
                                        <Link  to={`/event/${step.eventId}`}>
                                            <Box
                                                component="img"
                                                sx={{
                                                    display: 'block',
                                                    height: 400,
                                                    overflow: 'hidden',
                                                    width: '100%'
                                                }}
                                                src={`${process.env.REACT_APP_API_URL}/admin/getimg/${step.eventId}`}
                                                alt={step.title}
                                            />
                                        </Link>
                                    </>
                                ) : null}
                            </div>
                        ))}
                    </AutoPlaySwipeableViews>
                    <div className='navigationColor'>
                        <MobileStepper
                            variant='text'
                            steps={maxSteps}
                            position="static"
                            activeStep={activeStep}
                            nextButton={
                                <Button
                                    size="small"
                                    onClick={handleNext}
                                    disabled={activeStep === maxSteps - 1}
                                >
                                    Next
                                    {theme.direction === 'rtl' ? (
                                        <KeyboardArrowLeft />
                                    ) : (
                                        <KeyboardArrowRight />
                                    )}
                                </Button>
                            }
                            backButton={
                                <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                                    {theme.direction === 'rtl' ? (
                                        <KeyboardArrowRight />
                                    ) : (
                                        <KeyboardArrowLeft />
                                    )}
                                    Back
                                </Button>
                            }
                        />
                    </div>
                </Box>
            </div>
        </div>
    );
}

export default Slides;
