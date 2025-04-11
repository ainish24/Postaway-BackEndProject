import winston from "winston";

const formatTimestamp=()=>{
    const date = new Date().toString()
    return date
}

export const logger = winston.createLogger({
    level:"info",
    format:winston.format.combine(
        winston.format.timestamp({format:formatTimestamp}),
        winston.format.printf(({level,timestamp,message,...metadata})=>{
            return JSON.stringify({level, timestamp, ...metadata, message })
        })
    ),
    transports:[new winston.transports.File({filename:'logger.txt'})]
})

export const loggerMiddleware = (req,res,next)=>{
        if(!(req.originalUrl=="/api/users/signin" || req.originalUrl=="/api/users/signup")){
            logger.info("Incoming Request",{"request URL": req.originalUrl, "body":req.body})
        }else{
            logger.info("Incoming Request",{"request URL": req.originalUrl})
        }
        next()
}