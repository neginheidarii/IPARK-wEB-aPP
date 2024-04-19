import { auth } from "@/lib/firebase/firebase-admin";

export default async function handler(req, res) {
  try {
    const sessionCookie = req.cookies.__session;
    const decodedIdToken = await auth.verifySessionCookie(sessionCookie, true);
    const user = await auth.getUser(decodedIdToken.uid);
    
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(401).json({ success: false, error: "Unauthorized" });
  }
}