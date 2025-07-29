"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, MapPin, Phone } from "lucide-react"
import { useInView } from "react-intersection-observer"
import { handleSignUp } from "@/lib/functions"
import { useRouter } from "next/navigation"

export default function ContactPage() {
// Add contact form
  const [form, setForm] = useState({name: '', email: ''})
  const [status, setStatus] = useState("")
  const router = useRouter();

  const { ref: heroRef, inView: heroInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const { ref: formRef, inView: formInView } = useInView({
    triggerOnce: true,
    
    threshold: 0.1,
  })

  const { ref: infoRef, inView: infoInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const handleMailChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }



  // HANDLE FORM SUBMISSION
  const handleMaiSend = async (e: React.FormEvent) => {
      e.preventDefault()
      
      const response = await handleSignUp(e);
      if (!response.ok) {
            alert("Failed to sign up, contact Hieu Nguyen at hieunguyen23@augustana.edu!")
        } else {
            setStatus("Sending...")
            alert("Email submited successfully, our team will talk to you soon!");
            router.push("/")
      }



      // try {
      //   const res = await fetch("http://localhost:8000/send-mail/", {
      //     method: "POST",
      //     headers: {"Content-Type": "application/json"},
      //     body: JSON.stringify({
      //       subject: `Contact from ${form.name} (${form.email})`,
      //     body: form.message,
      //     }),
      //   })

      //    if (res.ok){
      //     setStatus("Message Sent! Thanks for contacting us")
      //     setForm({ name: "", email: "", message: "" })
      //    }
      //    else {
      //     setStatus("Failed to send message. Don't worry this is on us.")
      //    }
      // }
      // catch (err) {
      //   setStatus("Failed to send message. Don't worry this is on us.")
      // }
  }

  




  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div ref={heroRef} className="container mx-auto max-w-6xl text-center">
          <h1 className={`text-4xl md:text-6xl font-bold mb-6 ${heroInView ? "animate-fade-up" : "opacity-0"}`}>
            Get in <span className="text-blue-600">Touch</span>
          </h1>
          <p className={`text-xl text-gray-600 max-w-3xl mx-auto ${heroInView ? "animate-fade-up animate-delay-100" : "opacity-0"}`}>
            Have questions about our events or want to collaborate? We'd love to hear from you.
          </p>
        </div>
        {/* Contact Form and Info */}
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div ref={formRef} className={`bg-white rounded-lg shadow-lg p-8 ${formInView ? "animate-fade-up" : "opacity-0"}`}>
              <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
              <form className="space-y-6" onSubmit={handleMaiSend}>
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <Input id="name"
                         name="name"
                         placeholder="Your name" 
                         value={form.name} 
                         onChange={handleMailChange} 
                         required/>
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input id="email"
                          name="email"
                          placeholder="your.email@example.com"
                          value={form.email}
                          onChange={handleMailChange}
                          required />
                </div>
                {/* <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us something..."
                    className="min-h-[150px]"
                    value={form.message}
                    onChange={handleMailChange}
                    required
                  />
                </div> */}
                <Button className="w-full">Sign up </Button>
                {status && <p className="text-center mt-2">{status}</p>}
              </form>
            </div>

            {/* Contact Information */}
            <div ref={infoRef} className={`space-y-8 ${infoInView ? "animate-fade-up" : "opacity-0"}`}>
              <div>
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <MapPin className="h-6 w-6 text-blue-600 mt-1" />
                    <div>
                      <h3 className="font-medium">Address</h3>
                      <p className="text-gray-600">
                        Augustana College
                        <br />
                        639 38th Street
                        <br />
                        Rock Island, IL 61201
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Mail className="h-6 w-6 text-blue-600 mt-1" />
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <p className="text-gray-600">hieunguyen23@augustana.edu</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Phone className="h-6 w-6 text-blue-600 mt-1" />
                    <div>
                      <h3 className="font-medium">Phone</h3>
                      <p className="text-gray-600">(309) 631-5134</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-6">Follow Us On Instagram</h2>
                <div className="flex space-x-4">
                  <a href="https://www.instagram.com/ac_dsc/" target="_blank_">
                      <Button variant="outline" size="icon" className="rounded-full">
                      <svg
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </Button>
                  </a>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}