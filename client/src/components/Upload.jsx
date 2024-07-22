import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { 
  BackupRounded, 
  CloseRounded, 
  CloudDoneRounded 
} from '@mui/icons-material';
import { 
  CircularProgress, 
  IconButton, 
  LinearProgress, 
  Modal 
} from "@mui/material";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { openSnackbar } from "../redux/snackbarSlice";
import { createVideo } from '../api';
import { Category } from '../utils/Data';
import { createPost } from '../api';

const Container = styled.div`
width: 100%;
height: 100%;
position: absolute;
top: 0;
left: 0;
background-color: #000000a7;
display: flex;
align-items: top;
justify-content: center;
overflow-y: scroll;
`;

const Wrapper = styled.div`
max-width: 500px;
width: 100%;
border-radius: 16px;
margin: 50px 20px;
height: min-content;
background-color: ${({ theme }) => theme.card};
color: ${({ theme }) => theme.text_primary};
padding: 10px;
display: flex;
flex-direction: column;
position: relative;
`;

const Title = styled.div`
  font-size: 22px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
  margin: 12px 20px;
`;

const TextInput = styled.input`
width: 100%;
border: none;
font-size: 14px;
border-radius: 3px;
background-color: transparent;
outline: none;
color: ${({ theme }) => theme.text_secondary};
`;

const Desc = styled.textarea`
  width: 100%;
  border: none;
  font-size: 14px;
  border-radius: 3px;
  background-color: transparent;
  outline: none;
  padding: 10px 0px;
  color: ${({ theme }) => theme.text_secondary};
`;


const Label = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary + 80};
  margin: 12px 20px 0px 20px;
`;


const OutlinedBox = styled.div`
  min-height: 48px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  color: ${({ theme }) => theme.text_secondary};
  ${({ googleButton, theme }) =>
        googleButton &&
        `
    user-select: none; 
  gap: 16px;`}
  ${({ button, theme }) =>
        button &&
        `
    user-select: none; 
  border: none;
    font-weight: 600;
    font-size: 16px;
    background: ${theme.button};
    color:'${theme.bg}';`}
    ${({ activeButton, theme }) =>
        activeButton &&
        `
    user-select: none; 
  border: none;
    background: ${theme.primary};
    color: white;`}
  margin: 3px 20px;
  font-weight: 600;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 14px;
`;

const Select = styled.select`
    width: 100%;
    border: none;
    font-size: 14px;
    border-radius: 2px;
    background-color: transparent;
    outline: none;
    color: ${({ theme }) => theme.text_secondary};
`;

const Option = styled.option`
    width: 100%;
    border: none;
    font-size: 14px;
    border-radius: 3px;
    background-color: ${({ theme }) => theme.card};
    outline: none;
    color: ${({ theme }) => theme.text_secondary};
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 0px;
  margin: 6px 20px 20px 20px;
  align-items: center;
  gap: 12px;

`;

const FileUpload = styled.label`
    display: flex;
    min-height: 48px;
    align-items: center;
    justify-content: center;
    gap: 12px;
    margin: 16px 20px 3px 20px;
    border: 1px dashed ${({ theme }) => theme.text_secondary};
    border-radius: 8px;
    padding: 10px;
    cursor: pointer;
    color: ${({ theme }) => theme.text_secondary};
    &:hover {
        background-color: ${({ theme }) => theme.text_secondary + 20};
    }
`;

const File = styled.input`
    display: none;
`;

const Uploading = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 12px;
`;



const Upload = ({ setUploadOpen, uploadOpen }) => {
    const [post, setPost] = useState({
      caption: "",
      media: [],
      category: "",
    });
    const [disabled, setDisabled] = useState(true);
    const [loading, setLoading] = useState(false);
  
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user);
    const token = localStorage.getItem("instaxtoken");
  
    useEffect(() => {
      if (post.caption !== "" && post.media.length > 0) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    }, [post]);
  
    const uploadFile = (file) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
  
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          const updatedMedia = [...post.media];
          const index = updatedMedia.findIndex(item => item.file === file);
          updatedMedia[index] = { ...updatedMedia[index], uploadProgress: Math.round(progress) };
          setPost({ ...post, media: updatedMedia });
        },
        (error) => {
          console.error("Upload error:", error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const updatedMedia = [...post.media];
            const index = updatedMedia.findIndex(item => item.file === file);
            updatedMedia[index] = { ...updatedMedia[index], url: downloadURL };
            setPost({ ...post, media: updatedMedia });
          });
        }
      );
    };
  
    const handleFileChange = (e) => {
      const files = Array.from(e.target.files);
      const newMedia = files.map(file => ({
        file,
        type: file.type.startsWith('image/') ? 'image' : 'video',
        uploadProgress: 0,
      }));
      setPost({ ...post, media: [...post.media, ...newMedia] });
      files.forEach(uploadFile);
    };
  
    const createPostHandler = async () => {
      setLoading(true);
      try {
        const mediaUrls = post.media.map(item => item.url);
        const postData = {
          caption: post.caption,
          media: mediaUrls,
          category: post.category,
        };
        
        await createPost(postData);
        setUploadOpen(false);
        dispatch(
          openSnackbar({
            open: true,
            message: "Post created successfully",
            severity: "success",
          })
        );
      } catch (err) {
        console.error(err);
        dispatch(
          openSnackbar({
            open: true,
            message: "Error creating post",
            severity: "error",
          })
        );
      } finally {
        setLoading(false);
      }
    };
    
      return (
        <Modal open={uploadOpen} onClose={() => setUploadOpen(false)}>
          <Container>
            <Wrapper>
              <CloseRounded
                style={{
                  position: "absolute",
                  top: "24px",
                  right: "30px",
                  cursor: "pointer",
                }}
                onClick={() => setUploadOpen(false)}
              />
              <Title>Create Post</Title>
              
              <Label>Post Details:</Label>
            
            <FileUpload htmlFor="fileInput">
              {post.media.length === 0 ? (
                <Uploading>
                  <BackupRounded />
                  Select Images/Videos
                </Uploading>
              ) : (
                <Uploading>
                  {post.media.every(item => item.url) ? (
                    <div style={{ color: 'green', display: 'flex', gap: '6px', alignItems: 'center', justifyContent: 'center' }}>
                      <CloudDoneRounded sx={{ color: 'inherit' }} />
                      {post.media.length} File(s) Uploaded Successfully
                    </div>
                  ) : (
                    <>
                      Uploading {post.media.length} File(s)
                      <LinearProgress
                        sx={{ borderRadius: "10px", height: 3, width: "100%" }}
                        variant="determinate"
                        value={post.media[post.media.length - 1].uploadProgress}
                        color={"success"}
                      />
                    </>
                  )}
                </Uploading>
              )}
            </FileUpload>
            
            <File 
              type="file" 
              id="fileInput"
              accept="image/*, video/*"
              multiple
              onChange={handleFileChange}
            />
  
            <OutlinedBox style={{ marginTop: "12px" }}>
              <Desc
                placeholder="Write a caption..."
                name="caption"
                rows={5}
                value={post.caption}
                onChange={(e) => setPost({ ...post, caption: e.target.value })}
              />
            </OutlinedBox>
  
            <OutlinedBox style={{ marginTop: "6px", width: 'calc(100% - 40px)', margin: '6px 20px 0 20px' }}>
              <Select
                onChange={(e) => setPost({ ...post, category: e.target.value })}
                value={post.category}
                style={{ width: '100%', padding: '10px 0' }}
              >
                <Option value="" disabled hidden>Select Category</Option>
                {Category.map((category) => (
                  <Option key={category.name} value={category.name}>{category.name}</Option>
                ))}
              </Select>
            </OutlinedBox>
  
            <OutlinedBox
              button={true}
              activeButton={!disabled}
              style={{ marginTop: "22px" }}
              onClick={() => {
                !disabled && createPostHandler();
              }}
            >
              {loading ? (
                <CircularProgress color="inherit" size={20} />
              ) : (
                "Create Post"
              )}
            </OutlinedBox>
          </Wrapper>
        </Container>
      </Modal>
    );
  };
  
  export default Upload;