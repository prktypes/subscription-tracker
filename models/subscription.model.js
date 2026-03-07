import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true,'Subscription Name is required!'],
        trim: true,
        minLength: 2
    },
    price:{
        type: String,
        required: [true,'Subscription Price is required!'],
        min: [0,'Price must be greater than 0']
    },
    currency:{
        type: String,
        enum: ['USD','EUR','INR'],
        default: 'INR'
    },
    frequency:{
        type: String,
        enum: ['daily','weekly','monthly','yearly'],
    },
    category:{
        type: String,
        enum:['sports','news','entertainment','lifestyle','technology','finance','politics','others'],
        required: true,
    },
    paymentMethod:{
        type: String,
        required: true,
        trim: true,
    },
    status:{
        type: String,
        enum: ['active','cancelled','expired'],
        default: 'active',
    },
    startDate:{
        type: Date,
        required: true,
        validate: {
            validator: (value) => value <= new Date(),
            message: 'Start date must in the past.'
        }
    },
    renewalDate:{
        type: Date,
        validate: {
            validator: function (value){
                return value > this.startDate
            },
            message: 'Renewal date must be after start date.'
        }
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    }

},{timestamps: true})

//autocalculates the renewal date if missing
subscriptionSchema.pre('save',function(next){
    if(!this.renewalDate){
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365,
        }
        this.renewalDate = new Date(this.startDate.getTime() + renewalPeriods[this.frequency] * 24 * 60 * 60 * 1000)
    }
        //auto update the status to expired if renewal date is in the past
        if(this.renewalDate < new Date()){
            this.status = 'expired'
        }
        next()

})