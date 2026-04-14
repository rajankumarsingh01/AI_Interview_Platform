import Razorpay from "razorpay";
import Payment from "../models/payment.model.js";
import Crypto from "crypto";
import razorpay from "../services/razorpay.service.js";
import User from "../models/user.model.js";

export const createOrder = async (req, res) => {
    try {
        const { planId, amount, credits } = req.body;

        if (!amount || !credits) {
            return res.status(400).json({ error: "Invalid plan data" });
        }

        const options = {
            amount: amount * 100,
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);

        await Payment.create({
            userId: req.userId,
            planId,
            amount,
            credits,
            razorpayOrderId: order.id,
            status: "created"
        });

        return res.json(order);

    } catch (error) {
        console.log("Create Order Error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const verifyPayment = async (req, res) => {
    try {
        const { razorpayPaymentId, razorpayOrderId, razorpaySignature } = req.body;

        const body = razorpayOrderId + "|" + razorpayPaymentId;

        const expectedSignature = Crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body)
            .digest("hex");

        if (expectedSignature !== razorpaySignature) {
            return res.status(400).json({ message: "invalid payment signature" });
        }

        const payment = await Payment.findOne({ razorpayOrderId });

        if (!payment) {
            return res.status(404).json({ message: "payment not found" });
        }

        // update payment record
        payment.status = "paid";
        payment.razorpayPaymentId = razorpayPaymentId;
        await payment.save();

        // add credits to user
        const updatedUser = await User.findByIdAndUpdate(
            payment.userId,
            { $inc: { credits: payment.credits } },
            { new: true }
        );

        return res.json({
            success: true,
            message: "Payment verified and credits added",
            credits: updatedUser.credits,
        });

    } catch (error) {
        console.log("Verify Payment Error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};