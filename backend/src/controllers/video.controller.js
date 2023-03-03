const { Video } = require("../models");
const { videoService } = require("../services");



const getAllVideos = async (req, res) =>{
    try{
        const result = await videoService.getAllVideos(req);
        res.status(200).json(result);
    }
    catch(error){
        console.log(error);
        res.status(404).json(error);
    }
}

const getVideoById = async (req, res) =>{
    try{
        const result = await videoService.getVideoById(req.params.videoId);
        res.status(200).json(result);
    }
    catch(error){
        console.log(error);
        res.status(404).json(error);
    }
}
const uploadVideo = async (req,res) =>{
    try{
        const result = await videoService.uploadVideo(req.body);
        res.status(201).json(result);
    }
    catch(error){
        console.log(error);
        res.status(400).json({message:error.message});
    }
}

const updateVoteCount = async (req,res) =>{
    try{
        // validate req object 
        if(req.body.vote !== "upVote" && req.body.vote !== "downVote" ){
            throw new Error('vote type not defined');
        }
        if(req.body.change !== "increase" && req.body.change !== "decrease"){
            throw new Error('vote action not defined');
        }
        const result = await videoService.updateVoteCount(req.params.videoId, req.body);
        res.status(201).json(result);
    }
    catch(error){
        console.log(error);
        res.status(400).json({message:error.message});
    }
}

const updateViewCount = async (req,res) =>{
    try{
        const result = await videoService.updateViewCount(req.params.videoId);
        res.status(201).json(result);
    }
    catch(error){
        console.log(error);
        res.status(400).json({message:error.message});
    }
}


module.exports={
    getAllVideos,
    getVideoById,
    uploadVideo,
    updateVoteCount,
    updateViewCount,
}