const mongoose = require('mongoose');

const videoSchema = mongoose.Schema(
    {
        videoLink: {
            type:String,
            required:true,
            unique:true,
        },
        title: {
            type:String,
            required:true,
        },
        genre: {
            type:String,
            required:true,
        },
        contentRating : {
            type:String,
            require:true,
        },
        releaseDate: {
            type: Date,
            required:true,
        },
        previewImage : {
            type:String,
            required:true,
        },
        votes:{
            upVotes:{
                type:Number,
                default:0,
            },
            downVotes:{
                type:Number,
                default:0,
            }
        },
        viewCount : {
            type:Number,
            default:0,
        }
    }
);

const Video = mongoose.model('Video', videoSchema);

module.exports.Video = Video;