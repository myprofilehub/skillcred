import { redirect } from 'next/navigation';

export async function GET() {
  const phoneNumber = "918870314954";
  const message = "Greetings, I'd like to book a call for the 17 Aug RAG session.";
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  
  redirect(url);
}
