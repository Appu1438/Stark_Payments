import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import color from "../../themes/app.colors";
import './payment.css'
import PaymentIcons from "../../components/paymentIcons/PaymentIcons";
export default function PaymentPage() {
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);
    const { id: sessionId } = useParams();
    const [session, setSession] = useState(null);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/session/${sessionId}`)
            .then((res) => setSession(res.data))
            .catch(() => {
                alert("Your payment session has expired. Please try again.");
                window.location.href = `${process.env.REACT_APP_EXPO_APP_URL}/--/wallet-cancelled`;
            });
    }, [sessionId]);

    if (!session) return <p style={{ fontFamily: "TT-Octosquares-Medium", textAlign: "center", marginTop: 50 }}>Loading...</p>;

    const { driverId, name, email, phone_number, token } = session;

    const handlePayment = async () => {
        const amt = Number(amount);

        // ✅ Validation
        if (!amt || amt <= 0) {
            alert("Enter a valid amount");
            return;
        }
        if (amt < 250) {
            alert("Minimum recharge amount is ₹250");
            return;
        }
        if (amt % 50 !== 0) {
            alert("Amount must be in multiples of ₹50");
            return;
        }

        setLoading(true);
        try {
            const { data } = await axios.post(
                `${process.env.REACT_APP_API_URL}/payments/create-order`,
                { amount: Number(amount), driverId },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const options = {
                key: process.env.REACT_APP_RAZORPAY_KEY_ID,
                amount: data.amount * 100,
                currency: "INR",
                name: "Stark Payments",
                description: "Wallet Recharge",
                order_id: data.orderId,
                prefill: { name, email, contact: phone_number },
                theme: { color: color.primary },
                handler: async function (response) {
                    try {
                        await axios.post(`${process.env.REACT_APP_API_URL}/payments/verify-payment`, response, {
                            headers: { Authorization: `Bearer ${token}` }
                        });

                        await axios.delete(`${process.env.REACT_APP_API_URL}/session/${sessionId}`);
                        alert("Wallet recharged successfully!");
                        window.location.href = `${process.env.REACT_APP_EXPO_APP_URL}/--/wallet-success`;
                    } catch (err) {
                        await axios.delete(`${process.env.REACT_APP_API_URL}/session/${sessionId}`);
                        alert("Payment verification failed");
                        window.location.href = `${process.env.REACT_APP_EXPO_APP_URL}/--/wallet-failed`;
                    }
                },
                modal: {
                    ondismiss: async function () {
                        await axios.delete(`${process.env.REACT_APP_API_URL}/session/${sessionId}`);
                        alert("Payment cancelled");
                        window.location.href = `${process.env.REACT_APP_EXPO_APP_URL}/--/wallet-cancelled`;
                    },
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err) {
            console.error(err);
            alert("Something went wrong");
            window.location.href = `${process.env.REACT_APP_EXPO_APP_URL}/--/wallet-failed`;
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="page-wrapper"
            style={{
                "--primary-color": color.primary,
                "--button-bg": color.buttonBg,
            }}
        >
            <div className="payment-card">
                <h1 className="company-title">💸 Stark Payments</h1>
                <h2 className="payment-title">Wallet Recharge</h2>
                <p className="payment-subtext">
                    Add funds securely with your preferred payment method
                </p>

                <input
                    type="number"
                    placeholder="Enter amount (₹)"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="payment-input"
                />

                {/* Quick Select Amounts */}
                <div className="quick-amounts">
                    {[250, 500, 750, 1000].map((amt) => (
                        <button
                            key={amt}
                            onClick={() => setAmount(amt)}
                            className={`quick-amount-btn ${amount == amt ? "active" : ""}`}
                        >
                            ₹{amt}
                        </button>
                    ))}
                </div>

                <button
                    onClick={handlePayment}
                    disabled={loading}
                    className="payment-button"
                >
                    {loading ? "Processing..." : `Pay ₹${amount || 0}`}
                </button>

                {/* Payment Icons */}
                <PaymentIcons />

                <p className="payment-secure">
                    🔒 Your payment is processed securely by razorpay
                </p>
            </div>
        </div>
    );


}


