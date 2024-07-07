"use client";
import { useEffect } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import Login from "./(auth)/login/page";

export default function Home() {
  return (
    <main className={styles.main}>
      <Login />
    </main>
  );
}
