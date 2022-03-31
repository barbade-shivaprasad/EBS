import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {Container, Grid} from '@material-ui/core';
import {Link} from 'react-router-dom';


const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

const Posts = ({posts, loading}) => {
    const classes = useStyles();

    const [fileName, setFileName] = useState("");

    useEffect(() => {
    }, [loading])
    if (loading) {
        return <h2>Loading...</h2>
    }
    if (posts?.length == 0) return <h1> NO EVENTS</h1>
    // console.log("posts", posts)
    return (
        <>
            <Container maxWidth="md" style={{minHeight: "50rem"}}>
                <Grid container spacing={5} alignItems="flex-end">
                    {posts?.map((post) => {
                        return (
                            <Grid item key={post.eventId} xs={12} md={4}>
                                <Card className={classes.card}>
                                    <Link to={`/event/${post.eventId}`} style={{textDecoration: "inherit", color: "inherit"}}>
                                        <CardActionArea>
                                            <CardMedia
                                                className={classes.media}
                                                image={`${process.env.REACT_APP_API_URL}/admin/getimg/${post.eventId}`}
                                                title="title name"
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="h2" className="text-truncate" >
                                                    {post.title}
                                                </Typography>
                                                <div className="d-flex flex-row text-truncate">
                                                    <label>Panel:
                                                        <span className="p-2">{post.organizedBy}</span>
                                                    </label>
                                                </div>
                                            </CardContent>
                                        </CardActionArea>
                                    </Link>
                                    <CardActions>
                                        <Link to={`/event/${post.eventId}`} className="btn btn-light">View</Link>
                                    </CardActions>
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>
            </Container>
        </>
    );
};
export default Posts;
