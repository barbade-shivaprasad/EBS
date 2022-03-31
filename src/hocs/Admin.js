import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useState, useEffect} from 'react'
import {DropzoneAreaBase} from "material-ui-dropzone";
import Button from '@material-ui/core/Button';
import {Redirect} from 'react-router-dom'
import axios from 'axios'
import './admin.css'
import CustomToolbar from '../Components/CustomToolbar'
import TextField from '@mui/material/TextField';
import {useHistory} from 'react-router-dom/cjs/react-router-dom.min';


const Admin = ({setSuccess, setError}) => {
    const REACT_APP_API_URL = process.env.REACT_APP_API_URL
    const history = useHistory();
    const main = async () => {
        let transport = axios.create({withCredentials: true});

        transport.post(`${REACT_APP_API_URL}/admin/verifyadmin`,
            {}, {
            headers: {
                'Authorization': `${localStorage.getItem('token')}`
            }
        }).then(res => {
            console.log(res.data)
            if (res.status == 200) {
                setLoading(false)
            } else {
                history.push('/')
            }
        }).catch((err) => {
            console.log(err)
        })
    }
    const panels = ['Food', 'Arts and Culture', 'Sports', 'Academics', 'Training and Placements', 'Research and Development', 'Hostel and Health'];

    const [files, setFiles] = useState([]);
    const [uploaded, isUploaded] = useState(false);

    const onTitleChange = (e) => {
        setTitle(e.target.value);
    }
    const onContactChange = (e) => {
        setContact(e.target.value);
    }
    const onOrganiserChange = (e) => {
        setOrganiser(e.target.value);
    }

    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState("Hello markdown!");
    const [contact, setContact] = useState(null);
    const [organiser, setOrganiser] = useState("Food");
    const [loading, setLoading] = useState(true);
    const [seatCount, setSeatCount] = useState(null)
    useEffect(() => {
        main();
    }, [])
    const handleAdd = newFiles => {
        newFiles = newFiles.filter(file => !files.find(f => f.data === file.data));
        setFiles([...files, ...newFiles]);
    };

    const handleDelete = deleted => {
        setFiles(files.filter(f => f !== deleted));
    };

    const submitHandler = (e) => {
        if (title && description && contact && organiser) {

            console.log(description)
            e.preventDefault();
            const uploadData = new FormData();;
            uploadData.append('title', title);
            uploadData.append('description', description);
            uploadData.append('contactDetails', contact);
            uploadData.append('organizedBy', organiser);
            uploadData.append('date', document.getElementById('dat').value);
            uploadData.append('file', files[0].file, files[0].file.name);
            uploadData.append('seatCount', seatCount)

            const url = `${REACT_APP_API_URL}/admin/addevent`;

            console.log(uploadData);
            console.log(title);

            axios.post(url, uploadData, {
                headers: {
                    'content-type': 'multipart/form-data',
                }
            })
                .then(res => {
                    if (res.status != 200) {
                        throw new Error(res.data);
                    }
                    console.log(res.data);
                    isUploaded(true);
                    window.alert("Upload Successful");
                    setError(null)
                })
                .catch(err => {
                    console.log(err)
                    setSuccess(null)
                    setError(err.message)
                })
        } else {
            toast.error(`Some field is missing.`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    if (loading) return <div>please wait</div>
    else if (uploaded) {
        return <Redirect to='/' />
    }
    return (
        <div className="container">
            <TextField
                margin="normal"
                required
                fullWidth
                id="title"
                label="Title"
                name="title"
                placeholder="Enter title name"
                value={title} onChange={e => onTitleChange(e)}
            />
            <div className="flex-row">
                <div className="select">
                    <select value={organiser} onChange={e => onOrganiserChange(e)}>
                        {panels.map((item) => {
                            return <option value={item} key={item}>{item}</option>
                        })}
                    </select>
                </div>
                <input type="date" id="dat" />
            </div>
            <div className="flex-row">

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="contact"
                    label="Contact"
                    name="contact"
                    placeholder="Enter contact number"
                    value={contact} onChange={e => onContactChange(e)}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    required
                    type="number"
                    id="setCount"
                    label="Seat Count"
                    name="setCount"
                    onChange={(e) => setSeatCount(e.target.value)}
                    placeholder="Enter seat count.(optional)"
                    autoComplete="email"
                />
            </div>
            <DropzoneAreaBase
                type="file"
                name="files"
                fileObjects={files}
                onAdd={handleAdd}
                onDelete={handleDelete}
                dropzoneClass="box"
            />
            <CustomToolbar description={description} setDescription={setDescription} />
            <div className="submit">
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={(e) => submitHandler(e)}
                >
                    Upload
                </Button>
            </div>
        </div>
    );
}
export default Admin
