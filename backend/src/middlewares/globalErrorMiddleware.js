export const globalErrorMiddleware=(error,req,res,next)=>{

    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'Error from global middleware';
    return res.status(error.statusCode).json({message:error.status})
}