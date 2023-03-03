const { Video } = require("../models");

const getAllVideos = async (req, res) =>{
    try{
        let result;
        //  sort by viewCount or releaseDate
        const sortBy = req.query.sortBy;
        const genres = req.query.genres;
        const contentRating = req.query.contentRating;
        const title = req.query.title;

        if(title){
            result = await Video.find({ "title" : { $regex: title, $options: 'i' }});
            
        }
        if(genres && !contentRating){
            genreArray=genres.split(",");
            if(!genreArray.includes('All')){
                result = await Video.find({genre: genreArray});
            }
            else{
                result = await Video.find();
            }
        }
        if(contentRating && !genres){
            if(contentRating==="18+" || contentRating==="Anyone"){
                result = await Video.find({contentRating: contentRating});
            }
            else if(contentRating==="16+"){
                result = await Video.find({contentRating: { $ne: "18+" }});
            }
            else if(contentRating==="12+"){
                result = await Video.find({contentRating: { "$nin": ['18+', '16+'] }});
            }
            else if(contentRating==="7+"){
                console.log(genreArray);
                result = await Video.find({contentRating: { "$nin": ['18+', '16+','12+'] }});
            }
            else{
                result = await Video.find({});
            }
            
        }
        if(contentRating && genres){
            genreArray=genres.split(",");
            if(genreArray.includes('All')){
                genreArray=["Education", "Sports", "Comedy", "Lifestyle"];
            }
            if(contentRating==="18+" || contentRating==="Anyone"){
                result = await Video.find({contentRating: contentRating,genre: genreArray});
            }
            else if(contentRating==="16+"){
                result = await Video.find({contentRating: { $ne: "18+" },genre: genreArray});
            }
            else if(contentRating==="12+"){
                console.log("areeee");
                result = await Video.find({contentRating: { "$nin": ['18+', '16+'] },genre: genreArray});
            }
            else if(contentRating==="7+"){
                result = await Video.find({contentRating: { "$nin": ['18+', '16+','12+'] },genre: genreArray});
            }
            else{
                result = await Video.find({});
            }
        }
        if(sortBy){
            if(sortBy==="viewCount"){
                result.sort((a,b) => parseFloat(b.viewCount) - parseFloat(a.viewCount));
            }
            if(sortBy==="releaseDate"){
                result.sort((a,b) => (b.releaseDate) - (a.releaseDate));
            }
        }
        // else if(sortBy==="releaseDate"){
        //     result = await Video.find({}).sort({releaseDate: -1}).exec();
        //     return result;
        // }
        // if(!genres && !sortBy &&!contentRating){
        //     result = await Video.find();
        //     result.sort((a,b) => (b.releaseDate) - (a.releaseDate));
        // }
        return result;
    }
    catch(error){
        throw error;
    }
}


const getVideoById = async (id) =>{
    try{
        const result = await Video.findById(id);
        return result;
    }
    catch(error){
        throw error;
    }
}

const uploadVideo = async (videoDetails) =>{
    try{
        const result = await Video.create(videoDetails);
        return result;
    }
    catch(error){
        throw error;
    }
}

const updateVoteCount = async (videoId, voteDetails) =>{
    try{
        const videoDetail = await getVideoById(videoId);
        if(voteDetails.vote==="downVote" && voteDetails.change==="increase"){
            videoDetail.votes.downVotes = videoDetail.votes.downVotes + 1;
        }
        else if(voteDetails.vote==="downVote" && voteDetails.change==="decrease"){
            videoDetail.votes.downVotes = videoDetail.votes.downVotes - 1;
        }
        else if(voteDetails.vote==="upVote" && voteDetails.change==="increase"){
            videoDetail.votes.upVotes = videoDetail.votes.upVotes + 1;
        }
        else if(voteDetails.vote==="upVote" && voteDetails.change==="decrease"){
            videoDetail.votes.upVotes = videoDetail.votes.upVotes - 1;
        }
        else{
            throw new Error(`Error: ${error.message}`);
        }
        videoDetail.save();
        return videoDetail;
    }
    catch(error){
        throw error;
    }
}


const updateViewCount = async (videoId) =>{
    try{
        const videoDetail = await getVideoById(videoId);
        if(!videoDetail){
            throw new Error("No video found with matching id");
        }
        videoDetail.viewCount=videoDetail.viewCount+1;
        videoDetail.save();
        return videoDetail;
    }
    catch(error){
        throw error;
    }
}


module.exports={
    getAllVideos,
    getVideoById,
    uploadVideo,
    updateVoteCount,
    updateViewCount,
}