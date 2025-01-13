import React from "react";
import "./WhyUs.css";
import { FaCar, FaCheckCircle, FaMoneyBillWave, FaHeadset } from "react-icons/fa";

const WhyUs = () => {
  const benefits = [
    { icon: <FaCar />, title: "Nowoczesna flota", desc: "Oferujemy szeroki wybór nowych i komfortowych samochodów." },
    { icon: <FaCheckCircle />, title: "Bezproblemowy wynajem", desc: "Minimum formalności i szybki proces rezerwacji." },
    { icon: <FaMoneyBillWave />, title: "Najlepsze ceny", desc: "Atrakcyjne ceny i przejrzyste warunki wynajmu." },
    { icon: <FaHeadset />, title: "24/7 Obsługa klienta", desc: "Zawsze jesteśmy gotowi pomóc Ci w każdej sytuacji." },
  ];

  return (
    <section className="why-us">
      <h2>Dlaczego warto nas wybrać?</h2>
      <div className="benefits-container">
        {benefits.map((benefit, index) => (
          <div key={index} className="benefit-card">
            <div className="benefit-icon">{benefit.icon}</div>
            <h3>{benefit.title}</h3>
            <p>{benefit.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyUs;
