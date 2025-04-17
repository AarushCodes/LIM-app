import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft } from "lucide-react"

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col p-4 bg-gradient-to-b from-green-50 to-emerald-50">
      <div className="max-w-md w-full mx-auto">
        <div className="flex items-center mb-6">
          <Link href="/">
            <Button variant="ghost" size="icon" className="mr-2">
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <Image
              src="/cool_penguin.webp?height=50&width=50"
              width={50}
              height={50}
              alt="Frosty McFlap"
              className="rounded-full border-4 border-green-400"
            />
            <h1 className="text-3xl font-bold text-green-600">About Us</h1>
          </div>
        </div>

        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            <Image
              src="/cool_penguin.webp?height=200&width=300"
              width={300}
              height={200}
              alt="Frosty McFlap"
              className="rounded-xl shadow-md"
            />
            <div className="absolute -bottom-5 right-5">
              <Image
                src="/cool_bunny.webp?height=60&width=60"
                width={60}
                height={60}
                alt="Hopper"
                className="rounded-full border-4 border-emerald-400"
              />
            </div>
          </div>
        </div>

        <Card className="mb-8 border-2 border-emerald-200">
          <CardContent className="p-6">
            <h2 className="text-3xl font-bold text-center mb-6 text-green-600">About Us</h2>
            
            <div className="mb-6">
              <p className="text-gray-700 mb-4">
                <span className="font-bold">Welcome to Waddle2Wellness! 🎉</span>
              </p>
              <p className="text-gray-700 mb-4">
                Our mission is to make personal growth fun, engaging, and accessible for all ages. Inspired by the 7 Habits of Highly Effective People, we created this interactive platform to help kids, teens, and adults build lifelong positive habits.
              </p>
              <p className="text-gray-700 mb-4">
                🐧 Meet Frosty McFlap! Our adorable penguin mascot will guide you through exciting activities to make habit-building a breeze. Whether you're a student, a busy professional, or just looking to improve, we have age-appropriate challenges tailored for you!
              </p>
              <p className="text-gray-700 mb-4">
                Start your Waddle2Wellness journey today and take small steps toward a better, happier life!
              </p>
            </div>
            
            <div className="mt-8">
              <h3 className="text-2xl font-semibold text-green-600 mb-4">Credits</h3>
              <p className="text-gray-700 mb-4">
                Waddle2Wellness is developed with love and dedication to help people build better habits. Special thanks to:
              </p>
              <ul className="list-disc pl-5 text-gray-700 space-y-2">
                <li>Stephen R. Covey – for inspiring the world with the 7 Habits of Highly Effective People</li>
                <li>Our Developers & Designers – Aarush Khilosia, Atharva Mahajan, Yagni</li>
                <li>Our Content Writers - Purvi Tekriwal, Rishit Chudasama, Varad Chopade</li>
                <li>Frosty McFlap 🐧 – our friendly penguin mascot, guiding you on this journey!</li>
              </ul>
            </div>
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-red-600 mb-2">Disclaimer</h3>
              <p className="text-gray-600 text-sm">
                This is a self-help app MEANT FOR EDUCATIONAL AND PERSONALITY DEVELOPMENT PURPOSES only. This app aims to help you with your journey to success and overcome your hardships in between but does not guarantee it. The balance of emotions taught by this app is not meant to be taken as professional advice and is only a friendly suggestion. Seek Professional Advice if necessary.<br/><br/>
                Any resemblance to real life situations and stories are a mere coincidence until and unless mentioned. The app does not intend to hurt anyone's feelings, or disrespect or defame any caste, race, religion, place, personality, animal, etc. The stories are purely a work of fiction until mentioned under case study section. Case studies are also well-known facts, and effort has been taken to ensure that there is no controversial statement.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Link href="/">
            <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-md">
              Back to Homepage
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}