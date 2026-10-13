"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CheckoutSuccessPage() {
  const [timeLeft, setTimeLeft] = useState(15);
  const router = useRouter();

  useEffect(() => {
    // Hvis nedtelleren når 0, send brukeren til forsiden
    if (timeLeft === 0) {
      router.push("/");
      return;
    }

    // Sett opp en timer som trekker fra 1 sekund hvert sekund
    const timer = setTimeout(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    // Rydd opp timeren dersom komponenten avmonteres
    return () => clearTimeout(timer);
  }, [timeLeft, router]);

  return (
    <main style={{ textAlign: "center", padding: "3rem 1rem" }}>
      <h1>Takk for din bestilling! 🎉</h1>
      <p style={{ fontSize: "1.2rem", margin: "1rem 0" }}>
        Ordren din er mottatt og behandles nå.
      </p>

      <div style={{ marginTop: "2rem", color: "#6b7280" }}>
        <p>
          Du blir automatisk sendt tilbake til forsiden om{" "}
          <strong>{timeLeft}</strong> {timeLeft === 1 ? "sekund" : "sekunder"}.
        </p>
        <p style={{ marginTop: "0.5rem" }}>
          Skjer det ingenting?{" "}
          <Link href="/" style={{ color: "#2563eb", textDecoration: "underline" }}>
            Klikk her for å gå til forsiden nå
          </Link>
        </p>
      </div>
    </main>
  );
}