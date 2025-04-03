import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
    {
        title:{
            type: String,
            required: true
        },
        author:{
            type: String,
            required: true
        },
        publishYear:{
            type: Number,
            required: true
        },
        about:{
            type: String,
            required: true
        },
        user:{
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'User'
        }
    },
    {timestamps: true}
)

const Book = mongoose.model('Book',bookSchema);
export default Book;