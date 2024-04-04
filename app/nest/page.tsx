import { Metadata } from "next"
import Lazy from "./Lazy"

export const metadata: Metadata = {
  title: "Next.js Enterprise Boilerplate",
  twitter: {
    card: "summary_large_image",
  },
  openGraph: {
    url: "https://next-enterprise.vercel.app/",
    images: [
      {
        width: 1200,
        height: 630,
        url: "https://raw.githubusercontent.com/Blazity/next-enterprise/main/.github/assets/project-logo.png",
      },
    ],
  },
}

export default function Web() {
  return (
    <>
      <p>Some Content that is rendered normally</p>
      <div>div in page</div>
      <Lazy />
      <input type="checkbox" value="100" />
    </>
  )
}
