import { Button } from "@/components/ui/buttons";
import {
  ArrowRight ,
} from "lucide-react";
import Link from "next/link";
const Footer = () => {
  return (

    
    <section className="py-20 w-full bg-gradient-to-r from-primary to-primary-600 text-white">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
       {`Let's Work Together`} 
      </h2>
      <p className="text-xl text-primary-100 mb-8">
        {`Have a project in mind? I'd love to help bring your ideas to life.`}
      </p>
      <Button
        size="lg"
        variant="secondary"
        className="bg-white text-primary hover:bg-white/90"
        asChild
      >
        <Link href="/contact">
          Get In Touch
          <ArrowRight className="ml-2 w-4 h-4" />
        </Link>
      </Button>
    </div>
  </section>
  )
}

export default Footer