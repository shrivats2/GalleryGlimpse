require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Destination folder for storing temporary files
const mongoose = require('mongoose');
const app = express();
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");

// Connect to MongoDB
mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a schema and model for the image
const imageSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageUrl: String,
  views: {
    type: Number,
    default: 0,
  },
});

const Image = mongoose.model('Image', imageSchema);

// Configure Cloudinary
cloudinary.config({
  cloud_name:process.env.CLOUDNAME,
  api_key: process.env.APIKEY,
  api_secret:process.env.APISECRET
});

app.use(express.json());
app.use(cors());


app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Handle the file upload
app.post('/upload', upload.single('image'), (req, res) => {
  const file = req.file;
  const title = req.body.title;
  const description = req.body.description;

  // Upload file to Cloudinary
  cloudinary.uploader.upload(file.path, { 
    public_id: title, 
    context: `title=${title}|description=${description}` 
  }, (error, result) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error uploading file to Cloudinary.' });
    }

    // File uploaded successfully
    const imageUrl = result.secure_url;

    // Save the Cloudinary URL, title, and description to MongoDB
    const image = new Image({
      title: title,
      description: description,
      imageUrl: imageUrl,
    });
    
    image.save()
      .then(() => {
        res.json({ publicUrl: imageUrl });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: 'Error saving image to MongoDB.' });
      });
  });
});

app.put('/images/:id/view', async (req, res) => {
  const imageId = req.params.id;

  try {
    const updatedImage = await Image.findByIdAndUpdate(
      imageId,
      { $inc: { views: 1 } },
      { new: true }
    );

    res.json(updatedImage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating image view count.' });
  }
});

app.get('/images', async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching images from MongoDB.' });
  }
});

const PORT = process.env.PORT || 6001;
// Start the server
app.listen(PORT, () => {
  console.log('Server started on port 3001');
});
