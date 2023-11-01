import React, { useContext, useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { GridList, Button, GridListTile, GridListTileBar, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { ServiceContext } from '../../Context/ServiceContext';
import FileUploadPage from '../FileUpload/FileUploadPage';
import text from '../../Elements/EText.json';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';

export default function FCServicePicture({ picture, id }) {
  const classes = useStyles();
  const { addPic, removePic, editPic } = useContext(ServiceContext);
  const [isEdit, setIsEdit] = useState(false);
  const [isFull, setIsFull] = useState('');
  const [url, setUrl] = useState('');
  const [imgId, setimgId] = useState('')

  const post = () => {
    if (localStorage.getItem('url') !== "[object Object]" && localStorage.getItem('url') !== undefined && localStorage.getItem('url') !== null) {
      addPic(id);
    }
    else {
      setIsFull(text.waitImg)
    }
  }

  const put = () => {
    if (localStorage.getItem('url') !== "[object Object]" && localStorage.getItem('url') !== undefined && localStorage.getItem('url') !== null) {
      editPic(url, imgId);
      setIsEdit(false);
    }
    else {
      setIsFull(text.waitImg)
    }
  }

  return picture.length ? (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={2.5}>

        {picture.map((picture) => (
          <GridListTile key={picture.ImgPath}>
            <img className="serviceIMG" src={picture.ImgPath} alt={picture.imgId} style={{width:'100%'}}/>

            <GridListTileBar
              title={<IconButton onClick={() => { { removePic(picture.imgId) }; }}> <DeleteOutlineOutlinedIcon className="deleteicon" /> </IconButton>}
              actionIcon={<IconButton onClick={() => { { setUrl(picture.ImgPath); setimgId(picture.imgId); setIsEdit(true) } }}> <EditIcon className="editIcon" /> </IconButton>} />
          </GridListTile>))}
      </GridList>

      <div className='FileUploadPagediv'>
        <p className="textS">{text.addpic}</p>
        <FileUploadPage />
        <Button className="btn" onClick={() => { setIsEdit(false); localStorage.removeItem("url"); setIsFull(''); }}>{text.cancel}</Button>
        <Button className="btn" onClick={() => post()}>{text.ok}</Button>
        <p className="tinyText"> {isFull} </p>
      </div>


      {isEdit ?
        <div>
          <br />
          <FileUploadPage />
          <Button className="btn" onClick={() => put()}>{text.ok}</Button>
          <br />
          <Button className="btn" onClick={() => { setIsEdit(false); localStorage.removeItem("URL"); }}>{text.cancel}</Button>
          <br />
          <p className="text"> {isFull} </p>
        </div>

        : ""}
    </div>

  ) : (
    <div className='FileUploadPagediv'>
    <p> {text.nopic} </p>
    <p className="textS">{text.addpic}</p>
    <FileUploadPage />
    <Button className="btn" onClick={() => { setIsEdit(false); localStorage.removeItem("url"); setIsFull(''); }}>{text.cancel}</Button>
    <Button className="btn" onClick={() => post()}>{text.ok}</Button>
    <p className="tinyText"> {isFull} </p>
  </div>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  gridList: {
    flexWrap: 'nowrap',
  },
}));
