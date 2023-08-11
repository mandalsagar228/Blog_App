const url = "http://localhost:8000";
import Grid from "gridfs-stream";
import mongoose from "mongoose";
let gfs, gridfsBucket;

const conn = mongoose.connection;
conn.once("open", () => {
  gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "fs",
  });
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("fs");
});

export const UploadImage = (request, response) => {
  if (!request.file) {
    return response.status(400).json({ msg: "Sorry,File not found" });
  }
  const imageurl = `${url}/file/${request.file.filename}`;
  return response.status(200).json(imageurl);
};

// for getting Image
export const getImage = async (request, response) => {
  try {
    const file = await gfs.files.findOne({ filename: request.params.filename });
    const readStream = gridfsBucket.openDownloadStream(file._id);
    readStream.pipe(response);
  } catch (error) {
    response.status(500).json({ msg: error.message });
    console.log(error);
  }
};
