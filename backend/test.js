import fs from 'fs/promises';
import axios from 'axios';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current directory of the module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const url = 'https://api.themoviedb.org/3/movie/912649/images?include_image_language=en&language=en';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOTE1MWRkYTBmOGRkZjVjYjY3ZGViYTIzNTYyMmU2NSIsIm5iZiI6MTczMDQ5MDk2Mi4wNDczMTUxLCJzdWIiOiI2NzIxYmUwMzBjZDhhMmE1MDNhY2NiYzMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Aho8TDY8GW3X5aOlzoLQmng3-R5CZhYA5pUaepZAo90'
  }
};


try {
  const response = await axios.get(url, options);
  const images = response.data.backdrops; // Access the backdrops array
  const baseUrl = 'https://image.tmdb.org/t/p/w500'; // Base URL for images

  // Ensure the output directory exists
  const outputDir = path.join(__dirname, 'images'); // Change this to your desired output directory
  await fs.mkdir(outputDir, { recursive: true });

  // Loop through each image and save it
  for (const image of images) {
    const imageUrl = baseUrl + image.file_path; // Construct full image URL
    const imageName = path.basename(image.file_path); // Get the file name from the file path

    try {
      // Fetch the image
      const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
      
      // Save the image to the output directory
      await fs.writeFile(path.join(outputDir, imageName), imageResponse.data);
      console.log(`Saved: ${imageName}`);
    } catch (error) {
      console.error(`Error saving image ${imageName}:`, error);
    }
  }
} catch (err) {
  console.error(err);
}
