import Image from "next/image";
import styles from "./page.module.css";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import ChatWindow from "@/components/chat/ChatWindow.tsx"


export default async function Home() {
  return (
    <ChatWindow />
  );
}
