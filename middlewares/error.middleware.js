const errorMiddleware = (err, req, res, next) => {
    try{
        let error = { ...err };
        error.message = err.message; 
        console.error('Error in errorMiddleware:', error);

        //mongoose bad ObjectId error
        if (err.name === 'CastError') {
            const message = `Resource not found with id of ${err.value}`;
            error = new Error(message);
            res.status(404).json({ message: error.message });
        }
        //mongoose duplicate key error
        if (err.code === 11000) {
            const message = 'Duplicate field value entered';
            error = new Error(message);
            res.status(400).json({ message: error.message });
        }
        //mongoose validation error
        if (err.name === 'ValidationError') {
            const message = Object.values(err.errors).map(val => val.message).join(', ');
            error = new Error(message);
            res.status(400).json({ message: error.message });
        }


    }catch(error){
        console.error('Error in errorMiddleware:', error);
        res.status(500).json({ message: 'An unexpected error occurred.' });
        next(error)
    }
}

export default errorMiddleware;