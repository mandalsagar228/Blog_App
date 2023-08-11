import {
  Box,
  styled,
  FormControl,
  InputBase,
  Button,
  TextareaAutosize,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { dataContext } from "../../Context/dataProvider";
import { API } from "../service/api";

const Container = styled(Box)`
  margin: 50px 100px;
`;

const Image = styled("img")`
  width: 100%;
  height: 50vh;
  object-fit: cover;
  :hover {
    animation: both;
  }
`;
const StyledFormControl = styled(FormControl)`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
`;
const InputTextField = styled(InputBase)`
  flex: 1;
  margin: 0 30px;
  font: 25px;
`;
const TextArea = styled(TextareaAutosize)`
  width: 100%;
  margin-top: 50px;
  font-size: 18px;
  border: none;
  &:focus-visible {
    outline: none;
  }
`;
const initialPost = {
  title: "",
  description: "",
  picture: "",
  username: "",
  category: "",
  createdAt: new Date(),
};

const CreatePost = () => {
  const [file, setFile] = useState("");
  const [post, setPost] = useState(initialPost);
  const location = useLocation();
  const { account } = useContext(dataContext);
  const navigate = useNavigate();
  const URL = post.picture
    ? post.picture
    : "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        const response = await API.uploadFile(data);
        console.log("This is a  response for data", response);
        // post.picture = response.data;
        setPost({ ...post, picture: response.data }); // Update post state with the new picture
      }
    };

    getImage();
    post.category = location.search?.split("=")[1] || "All";
  }, [file]);

  useEffect(() => {
    if (!account) {
      console.log("No data is stored in context api");
    } else {
      post.username = account.username;
      console.log("data is stored in context api");
      console.log(" this is stored data", post.username, account.password);
    }
  }, [account]);

  const savePost = async () => {
    const response = await API.createPost(post);
    if (response.isSuccess) {
      console.log("Data has been save successfully");
      post.picture = "";
      await navigate("/");
    } else {
      console.log("Something went wrong. please try again later.");
    }
  };

  return (
    <>
      <Container>
        <Image src={URL} alt="banner" />

        <StyledFormControl>
          <label htmlFor="fileInput">
            <AddCircleIcon fontSize="large" color="action" />
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
          <InputTextField
            placeholder="Title"
            name="title"
            onChange={(e) => handleChange(e)}
            required
          />

          <Button variant="contained" onClick={() => savePost()}>
            Publish
          </Button>
        </StyledFormControl>

        <TextArea
          minRows={5}
          placeholder="Tell your story..."
          name="description"
          onChange={(e) => handleChange(e)}
        />
      </Container>
    </>
  );
};

export default CreatePost;
