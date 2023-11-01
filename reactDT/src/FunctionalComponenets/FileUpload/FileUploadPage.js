import React, { useState } from 'react';
import FCCircularStatic from './FCCircularStatic';
import mytext from '../../Elements/EText.json'
import { makeStyles } from '@material-ui/core/styles';
import { BsCloudUpload } from 'react-icons/bs';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
}));

function FileUploadPage() {
    const api = 'https://proj.ruppin.ac.il/bgroup15/prod/uploadpicture';
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [text, setText] = useState("");

    const classes = useStyles();


    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]); setIsFilePicked(true);
        if (event.target.files[0] !== undefined) {
            const formData = new FormData();
            formData.append('File', selectedFile);
            fetch(
                api, {
                method: 'POST',
                body: formData,
            })
                .then((response) => response.json())
                .then((result) => {
                    console.log('Success:', result);
                    localStorage.setItem('url', result);
                    setIsFilePicked(true);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
        else {
            setIsFilePicked(false);
            setText(mytext.tryAgian);
        }

    };

    const handleSubmission = () => {
        const formData = new FormData();
        setIsFilePicked(false);
        formData.append('File', selectedFile);
        fetch(
            api, {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.json())
            .then((result) => {
                console.log('Success:', JSON.stringify(result));
                localStorage.setItem('url', result);
                setText(mytext.imgUploded);
            })
            .catch((error) => {
                console.error('Error:', error);
                setText(mytext.imgUplodFailed);
            });
    };

    return (
        <div className="upload">
            <div class="upload-btn-wrapper">
                <p>{text.uploadFile}</p>
                <BsCloudUpload size={30} />
                <input type="file" name="file" onChange={changeHandler} />
            </div>
            {isFilePicked && selectedFile.name !== "undefined" ? (<div> <FCCircularStatic handleSubmission={handleSubmission} /> </div>) : (<p className="tinyText">{text}</p>)}
        </div>
    )
}

export default withRouter(FileUploadPage);
