import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 bg-gradient-to-b from-blue-50 to-purple-50">
      <div className="max-w-md w-full mx-auto flex flex-col items-center justify-center gap-8 py-8">
        <div className="flex items-center justify-center gap-4">
          <Image
            src="/cool_penguin.webp?height=80&width=80"
            width={80}
            height={80}
            alt="Frosty McFlap"
            className="rounded-full border-4 border-blue-400"
          />
          <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Waddle2Wellness
          </h1>
          <Image
            src="/cool_bunny.webp?height=80&width=80"
            width={80}
            height={80}
            alt="Hopper"
            className="rounded-full border-4 border-purple-400"
          />
        </div>

        <p className="text-center text-gray-600 max-w-xs">
          Learn and practice the 7 Habits of Highly Effective People for your age group
        </p>
        
        <div className="grid grid-cols-1 gap-6 w-full">
          <Link href="/kids" className="w-full">
            <Button className="w-full h-24 text-xl rounded-2xl bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500 shadow-lg">
              <div className="flex flex-col">
                <span className="text-2xl font-bold">Kids</span>
                <span className="text-sm font-normal">Ages 7-12</span>
              </div>
            </Button>
          </Link>

          <Link href="/teens" className="w-full">
            <Button className="w-full h-24 text-xl rounded-2xl bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500 shadow-lg">
              <div className="flex flex-col">
                <span className="text-2xl font-bold">Teens</span>
                <span className="text-sm font-normal">Ages 13-18</span>
              </div>
            </Button>
          </Link>

          <Link href="/adults" className="w-full">
            <Button className="w-full h-24 text-xl rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-400 hover:from-purple-600 hover:to-indigo-500 shadow-lg">
              <div className="flex flex-col">
                <span className="text-2xl font-bold">Adults</span>
                <span className="text-sm font-normal">Ages 18+</span>
              </div>
            </Button>
          </Link>
          
          <Link href="#about" className="w-full">
            <Button className="w-full h-24 text-xl rounded-2xl bg-gradient-to-r from-green-500 to-emerald-400 hover:from-green-600 hover:to-emerald-500 shadow-lg">
              <div className="flex flex-col">
                <span className="text-2xl font-bold">About</span>
                <span className="text-sm font-normal">Our Mission & Team</span>
              </div>
            </Button>
          </Link>
        </div>
        
        <div id="about" className="mt-12 mb-8 p-6 bg-white rounded-xl shadow-md w-full">
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
        </div>
      </div>
    </main>
  )
}

