import mongoose from "mongoose";

const genreSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    }
});

const Genre = mongoose.model("Genre", genreSchema);

const movieSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    genre_id: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Genre"
        }
    ],
    overview: {
        type: String
    },
    orginal_language: {
        type: String,
        required: true
    },
    popularity: {
        type: Number,
        required: true
    },
    adult: {
        type: Boolean
    },
    release_date: {
        type: Date,
        required: true
    },
    vote_average: {
        type: Number
    },
    vote_count: {
        type: Number,
        required: true
    }
});

const Movie = mongoose.model("Movie", movieSchema);

export { Movie, Genre };
