import './paymentIcons.css'


const paymentIcons = [
    { src: "/assets/icons/upi.png", alt: "UPI" },
    { src: "/assets/icons/gpay.jpeg", alt: "Google Pay" },
    { src: "/assets/icons/cred.png", alt: "Cred Pay" },
    { src: "/assets/icons/applepay.png", alt: "Apple Pay" },
    { src: "/assets/icons/razorpay.png", alt: "Razorpay" },
    { src: "/assets/icons/phonepay.png", alt: "Phone Pay" },
    { src: "/assets/icons/paytm.png", alt: "Paytm" },
    { src: "/assets/icons/mastercard.png", alt: "Master Card" },
    { src: "/assets/icons/visa.png", alt: "Visa" },
    { src: "/assets/icons/rupay.png", alt: "Rupay" },
    { src: "/assets/icons/bhim.png", alt: "BHIM" },
    { src: "/assets/icons/mobikwik.png", alt: "Mobikwik" },
    { src: "/assets/icons/supermoney.jpeg", alt: "Super Money" },
    { src: "/assets/icons/amazonpay.png", alt: "Amazon Pay" },
];

export default function PaymentIcons() {
    return (
        <div className="payment-icons-wrapper">
            <div className="payment-icons">
                {[...paymentIcons, ...paymentIcons, ...paymentIcons].map((icon, index) => (
                    <img key={index} src={icon.src} alt={icon.alt} />
                ))}
            </div>
        </div>
    );
}
