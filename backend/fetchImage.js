import "dotenv/config";
import fs from "fs/promises";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";

const API_TOKEN = process.env.TMDB_API_TOKEN;
const BASE_URL = "https://api.themoviedb.org/3/movie";

if (!API_TOKEN) {
    console.error(
        "API token not set. Please set TMDB_API_TOKEN in environment variables."
    );
    process.exit(1);
}

const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_TOKEN}`,
    },
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const downloadPoster = async (id, name) => {
    const url = `${BASE_URL}/${id}/images?include_image_language=en&language=en`;
    try {
        const response = await axios.get(url, options);
        const image = response.data.posters[0];
        const baseUrl = "https://image.tmdb.org/t/p/w500";

        const outputDir = path.join(__dirname, "images");
        await fs.mkdir(outputDir, { recursive: true });

        const imageUrl = baseUrl + image.file_path;
        const imageName = `${name}.jpg`;

        try {
            const imageResponse = await axios.get(imageUrl, {
                responseType: "arraybuffer",
            });

            await fs.writeFile(
                path.join(outputDir, imageName),
                imageResponse.data
            );
            console.log(`Saved: ${imageName}`);
        } catch (error) {
            console.error(`Error saving image ${imageName}:`, error);
        }
    } catch (err) {
        console.error("Error fetching image data:", err);
    }
};

export default downloadPoster;
