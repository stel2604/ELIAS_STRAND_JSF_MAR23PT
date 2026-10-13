"use client";

import { useState, useEffect } from "react";
import styles from "./contact.module.css";

export default function ContactPage() {
  const [fullName, setFullName] = useState("");
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);



  const [fullNameTouched, setFullNameTouched] = useState(false);
  const [subjectTouched, setSubjectTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [messageTouched, setMessageTouched] = useState(false);


  const isFullNameValid = fullName.length >= 3;
  const isSubjectValid = subject.length >= 3;
  const isMessageValid = message.length >= 10;
 
  

  const emailParts = email.split("@");

const hasTextBeforeAt = (emailParts[0]?.length ?? 0) > 0;

const domainParts = emailParts[1]?.split(".") ?? [];

const hasTextBetweenAtAndDot = (domainParts[0]?.length ?? 0) > 0;
const hasTextAfterDot = (domainParts[1]?.length ?? 0) > 0;

const isEmailValid =
  emailParts.length === 2 &&
  hasTextBeforeAt &&
  hasTextBetweenAtAndDot &&
  hasTextAfterDot;

  const isFormValid = isFullNameValid && isSubjectValid && isEmailValid && isMessageValid;

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!isFormValid) {
    setFullNameTouched(true);
    setSubjectTouched(true);
    setEmailTouched(true);
    setMessageTouched(true);
    return;
  }

  // 1. Marker at skjemaet er sendt
  setIsSubmitted(true);

  // 2. Tøm alle input-feltene (tilbake til startverdiene)
  setFullName("");
  setSubject("");
  setEmail("");
  setMessage("");

  // 3. Nullstill "touched"-tilstandene
  setFullNameTouched(false);
  setSubjectTouched(false);
  setEmailTouched(false);
  setMessageTouched(false);
};

useEffect(() => {
  // Hvis skjemaet ikke er sendt inn, trenger vi ikke gjøre noe
  if (!isSubmitted) return;

  // Start en timer på 5000 ms (5 sekunder)
  const timer = setTimeout(() => {
    setIsSubmitted(false);
  }, 5000);

  // Rydd opp timeren dersom komponenten fjernes eller isSubmitted endres
  return () => clearTimeout(timer);
}, [isSubmitted]);

  return (
    <main>
      <h1 className={styles.heading}>Kontakt oss</h1>
        <form onSubmit={handleSubmit} className={styles.contactForm} noValidate>
        <label htmlFor="fullName">Full Name:</label>

        <input
            type="text"
            id="fullName"
            name="fullName"
            minLength={3}
            required
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            onBlur={() => setFullNameTouched(true)}
        />
          {!isFullNameValid && fullNameTouched && (
            <p className={styles.varsel}>
              Full Name må være minst 3 tegn.</p>
          )}

        <label htmlFor="subject">Emne:</label>
        <input
            type="text"
            id="subject"
            name="subject"
            minLength={3}
            required
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
            onBlur={() => setSubjectTouched(true)}
        />
        {!isSubjectValid && subjectTouched && (
          <p className={styles.varsel}>Emne må være minst 3 tegn.</p>
        )}


        <label htmlFor="email">E-post:</label>
        <input 
            type="email" 
            id="email"
            name="email"
          
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            onBlur={() => setEmailTouched(true)}
        />
        {!isEmailValid && emailTouched && (
          <p className={styles.varsel}>Ugyldig e-postadresse.</p>
        )}


        <label htmlFor="message">Melding:</label>
        <textarea
            id="message"
            name="message"
            minLength={10}
            required
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            onBlur={() => setMessageTouched(true)}
        />
        {!isMessageValid && messageTouched && (
          <p className={styles.varsel}>Melding må være minst 10 tegn.</p>
        )}

        <button type="submit">Send</button>

      </form>

      
        <p
          className={`${styles.successMessage} ${
            isSubmitted ? styles.visible : styles.hidden
          }`}
        >
          Meldingen er sendt!
        </p>


    </main>
  );
}