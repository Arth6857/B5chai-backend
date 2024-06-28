/*const asynHandler=(fn)=>async(req,res,next)=>{
    try{
      await fn(req,res,next)
    }catch(error){
        res.status(err.code ||500).json({
            success:false,
            message:err.message
        })
    }
}
export {asynHandler}*/

const asynHandler=(requestHandler)=>{
    (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next))//function execute
        .reject((err)=>next(err))
    }
}

export {asynHandler}