import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Link } from "react-router-dom"
import companies from "../data/companies.json"
import faq from "../data/faq.json"
import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion } from "@radix-ui/react-accordion"
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const LandingPage = () => {
  return (
    <main className="flex flex-col gap-10 sm:gap-20 py-10 sm:py-20">
      <section className="text-center ">
        <h1 className="flex flex-col gradient-title text-4xl sm:text-6xl lg:text-8xl tracking-tighter py-4 font-extrabold">Find Your Dream Job <span>and get <img src="/logo.png" alt="Hirrd logo" className=" inline h-14 sm:h-24 md:h-32" /></span> </h1>
        <p className="text-xs text-gray-300 sm:mt-4 sm:text-xl">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Excepturi quo illo assumenda? Illo fuga aliquam esse dolore quaerat natus, doloribus, quas doloremque magnam reprehenderit voluptates! Est dolorum ex ad quia?
        </p>
      </section>
      <div className=" flex gap-6 justify-center font-extrabold">
        <Link to={'/job-listings'}><Button variant="blue" size="xl">Find a Job</Button></Link>
        <Link to={'/post-job'}><Button size="xl">Post a Job</Button></Link>
      </div>
      {/* Carousel */}
      <div className="w-full flex">
        <Carousel className="w-full"
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
        >
          <CarouselContent className="flex gap-5 sm:gap-20 items-center">
            {
              companies.map(({ name, id, path }) => (<CarouselItem key={id} className="basis-1/3 lg:basis-1/6">
                <img src={path} alt={name} className=" h-9 sm:h-14 object-contain" />
              </CarouselItem>))
            }
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      {/* Banner image */}
      <img src="/banner.jpeg" className=" w-full" alt="" />
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>For Job Seekers</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>Search and apply for jobs, and more</CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>For Recruiters</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>Post jobs, manage applications and find bestm matches</CardDescription>
          </CardContent>
        </Card>
      </section>
      <section>
        <Accordion collapsible>
          {
            faq.map(({ question, answer }, i) => (
              <AccordionItem value={`item-${i}`} key={i}>
                <AccordionTrigger>{question}</AccordionTrigger>
                <AccordionContent>{answer}</AccordionContent>
              </AccordionItem>
            ))
          }
        </Accordion>
      </section>
    </main>
  )
}

export default LandingPage